import { storageService } from './storageService.js';
import { delay } from './api.js';

export const activityService = {
  async getActivities(limit = 50) {
    await delay(60);
    const logs = storageService.getActivities();
    return logs.slice(0, limit);
  },

  async getPlatformStats() {
    await delay(80);
    const users = storageService.getUsers();
    const courses = storageService.getCourses();
    const enrollments = storageService.getEnrollments();
    const categories = storageService.getCategories();

    const students = users.filter(u => u.role === 'STUDENT');
    const instructors = users.filter(u => u.role === 'INSTRUCTOR');
    const admins = users.filter(u => u.role === 'ADMIN');

    const publishedCourses = courses.filter(c => c.published && c.moderationStatus === 'approved');
    const draftCourses = courses.filter(c => !c.published || c.status === 'draft');
    const pendingCourses = courses.filter(c => c.moderationStatus === 'pending');

    const completedEnrollments = enrollments.filter(e => e.progressPercentage >= 100 || e.status === 'completed');
    const completionRate = enrollments.length > 0 ? Math.round((completedEnrollments.length / enrollments.length) * 100) : 0;

    return {
      totalUsers: users.length,
      totalStudents: students.length,
      totalInstructors: instructors.length,
      totalAdmins: admins.length,
      totalCourses: courses.length,
      publishedCourses: publishedCourses.length,
      draftCourses: draftCourses.length,
      pendingCourses: pendingCourses.length,
      totalEnrollments: enrollments.length,
      completedEnrollments: completedEnrollments.length,
      completionRate,
      totalCategories: categories.length
    };
  },

  async getInstructorStats(instructorId) {
    await delay(80);
    const courses = storageService.getCourses().filter(c => c.instructorId === instructorId);
    const courseIds = courses.map(c => c.id);
    const allEnrollments = storageService.getEnrollments();
    const enrollments = allEnrollments.filter(e => courseIds.includes(e.courseId));

    const publishedCount = courses.filter(c => c.published).length;
    const draftCount = courses.filter(c => !c.published).length;

    const completed = enrollments.filter(e => e.progressPercentage >= 100);
    const avgProgress = enrollments.length > 0
      ? Math.round(enrollments.reduce((acc, curr) => acc + (curr.progressPercentage || 0), 0) / enrollments.length)
      : 0;

    const uniqueStudents = new Set(enrollments.map(e => e.userId)).size;

    return {
      totalCourses: courses.length,
      publishedCourses: publishedCount,
      draftCourses: draftCount,
      totalEnrollments: enrollments.length,
      uniqueStudents,
      avgProgress,
      completedStudents: completed.length
    };
  }
};
