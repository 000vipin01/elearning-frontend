import { storageService } from './storageService.js';
import { delay, ApiError } from './api.js';

export const progressService = {
  async getProgress(userId, courseId) {
    await delay(60);
    const enrollments = storageService.getEnrollments();
    const enrollment = enrollments.find(e => e.userId === userId && e.courseId === courseId);
    if (!enrollment) {
      return null;
    }
    return enrollment;
  },

  async toggleLessonCompletion(userId, courseId, lessonId) {
    await delay(90);
    const enrollments = storageService.getEnrollments();
    const index = enrollments.findIndex(e => e.userId === userId && e.courseId === courseId);
    if (index === -1) {
      throw new ApiError('Student is not enrolled in this course', 400);
    }

    const enr = enrollments[index];
    const completedList = [...(enr.completedLessons || [])];
    const alreadyCompleted = completedList.includes(lessonId);

    let updatedCompleted;
    if (alreadyCompleted) {
      updatedCompleted = completedList.filter(id => id !== lessonId);
    } else {
      updatedCompleted = [...completedList, lessonId];
    }

    // Calculate total lessons in this course
    const course = storageService.getCourses().find(c => c.id === courseId);
    let totalLessons = 0;
    course?.modules?.forEach(m => {
      totalLessons += (m.lessons || []).length;
    });

    const newPercentage = totalLessons > 0 ? Math.round((updatedCompleted.length / totalLessons) * 100) : 0;
    const isNowCompleted = newPercentage >= 100;

    const updatedEnr = {
      ...enr,
      completedLessons: updatedCompleted,
      progressPercentage: Math.min(100, newPercentage),
      lastAccessedLessonId: lessonId,
      lastAccessedAt: new Date().toISOString(),
      status: isNowCompleted ? 'completed' : 'active',
      completedAt: isNowCompleted ? (enr.completedAt || new Date().toISOString()) : null
    };

    enrollments[index] = updatedEnr;
    storageService.setEnrollments(enrollments);

    const user = storageService.getUsers().find(u => u.id === userId);
    if (user && !alreadyCompleted) {
      storageService.addActivity({
        user: user.name,
        role: user.role,
        action: isNowCompleted ? 'Completed Course!' : 'Lesson Finished',
        details: isNowCompleted
          ? `Graduated from "${course?.title || 'course'}" with 100% completion`
          : `Finished lesson in "${course?.title || 'course'}"`,
        type: isNowCompleted ? 'success' : 'info'
      });
    }

    return updatedEnr;
  },

  async updateLastAccessed(userId, courseId, lessonId) {
    const enrollments = storageService.getEnrollments();
    const index = enrollments.findIndex(e => e.userId === userId && e.courseId === courseId);
    if (index !== -1) {
      enrollments[index] = {
        ...enrollments[index],
        lastAccessedLessonId: lessonId,
        lastAccessedAt: new Date().toISOString()
      };
      storageService.setEnrollments(enrollments);
    }
  },

  async getStudentStats(userId) {
    await delay(70);
    const enrollments = storageService.getEnrollments().filter(e => e.userId === userId);
    const courses = storageService.getCourses();

    const totalEnrolled = enrollments.length;
    const completedCourses = enrollments.filter(e => e.progressPercentage >= 100 || e.status === 'completed').length;
    const inProgress = totalEnrolled - completedCourses;

    let totalLessonsFinished = 0;
    enrollments.forEach(e => {
      totalLessonsFinished += (e.completedLessons?.length || 0);
    });

    // Approximate hours (average 25 min per lesson)
    const hoursSpent = ((totalLessonsFinished * 25) / 60).toFixed(1);

    const averageProgress = totalEnrolled > 0
      ? Math.round(enrollments.reduce((acc, curr) => acc + (curr.progressPercentage || 0), 0) / totalEnrolled)
      : 0;

    return {
      totalEnrolled,
      completedCourses,
      inProgress,
      totalLessonsFinished,
      hoursSpent,
      averageProgress
    };
  }
};
