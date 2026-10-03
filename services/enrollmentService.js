import { storageService } from './storageService.js';
import { delay, ApiError } from './api.js';

export const enrollmentService = {
  async getEnrollments() {
    await delay(60);
    return storageService.getEnrollments();
  },

  async getStudentEnrollments(userId) {
    await delay(80);
    const enrollments = storageService.getEnrollments().filter(e => e.userId === userId);
    const courses = storageService.getCourses();

    // Enrich each enrollment with course details
    return enrollments.map(enr => {
      const course = courses.find(c => c.id === enr.courseId) || {
        id: enr.courseId,
        title: 'Archived Course',
        thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=80',
        modules: []
      };

      // Calculate total lessons in course
      let totalLessons = 0;
      course.modules?.forEach(m => {
        totalLessons += (m.lessons || []).length;
      });

      const completedCount = enr.completedLessons?.length || 0;
      const progress = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : enr.progressPercentage || 0;

      return {
        ...enr,
        progressPercentage: Math.min(100, Math.max(progress, enr.progressPercentage || 0)),
        totalLessons,
        completedCount,
        course
      };
    });
  },

  async getCourseEnrollments(courseId) {
    await delay(80);
    const enrollments = storageService.getEnrollments().filter(e => e.courseId === courseId);
    const users = storageService.getUsers();

    return enrollments.map(enr => {
      const user = users.find(u => u.id === enr.userId) || {
        id: enr.userId,
        name: 'Learner',
        email: 'learner@example.com',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80'
      };
      return {
        ...enr,
        student: user
      };
    });
  },

  async isEnrolled(userId, courseId) {
    const list = storageService.getEnrollments();
    return list.some(e => e.userId === userId && e.courseId === courseId);
  },

  async enroll(userId, courseId) {
    await delay(120);
    const enrollments = storageService.getEnrollments();
    const existing = enrollments.find(e => e.userId === userId && e.courseId === courseId);
    if (existing) {
      return existing;
    }

    const courses = storageService.getCourses();
    const courseIndex = courses.findIndex(c => c.id === courseId);
    if (courseIndex === -1) {
      throw new ApiError('Course not found', 404);
    }

    const course = courses[courseIndex];
    const users = storageService.getUsers();
    const user = users.find(u => u.id === userId);

    // Pick first lesson of first module if available
    const firstLessonId = course.modules?.[0]?.lessons?.[0]?.id || '';

    const newEnrollment = {
      id: `enr-${Date.now()}`,
      userId,
      courseId,
      enrolledAt: new Date().toISOString(),
      status: 'active',
      progressPercentage: 0,
      completedLessons: [],
      lastAccessedLessonId: firstLessonId,
      lastAccessedAt: new Date().toISOString()
    };

    storageService.setEnrollments([newEnrollment, ...enrollments]);

    // Increment studentsCount on course
    courses[courseIndex] = {
      ...course,
      studentsCount: (course.studentsCount || 0) + 1
    };
    storageService.setCourses(courses);

    if (user) {
      storageService.addActivity({
        user: user.name,
        role: user.role,
        action: 'Enrolled in Course',
        details: `Successfully enrolled in "${course.title}"`,
        type: 'success'
      });
    }

    return newEnrollment;
  },

  async unenroll(userId, courseId) {
    await delay(100);
    const enrollments = storageService.getEnrollments();
    const filtered = enrollments.filter(e => !(e.userId === userId && e.courseId === courseId));
    storageService.setEnrollments(filtered);

    const courses = storageService.getCourses();
    const courseIndex = courses.findIndex(c => c.id === courseId);
    if (courseIndex !== -1) {
      const course = courses[courseIndex];
      courses[courseIndex] = {
        ...course,
        studentsCount: Math.max(0, (course.studentsCount || 1) - 1)
      };
      storageService.setCourses(courses);
    }

    const user = storageService.getUsers().find(u => u.id === userId);
    if (user) {
      storageService.addActivity({
        user: user.name,
        role: user.role,
        action: 'Unenrolled from Course',
        details: `Left course enrollment`,
        type: 'warning'
      });
    }

    return true;
  }
};
