import { storageService } from './storageService.js';
import { delay, ApiError } from './api.js';

export const courseService = {
  async getCourses(filters = {}) {
    await delay(100);
    let list = storageService.getCourses();

    if (filters.instructorId) {
      list = list.filter(c => c.instructorId === filters.instructorId);
    }

    if (filters.category && filters.category !== 'All') {
      list = list.filter(c => c.category.toLowerCase() === filters.category.toLowerCase());
    }

    if (filters.difficulty && filters.difficulty !== 'All') {
      list = list.filter(c => c.difficulty.toLowerCase() === filters.difficulty.toLowerCase());
    }

    if (filters.status && filters.status !== 'All') {
      list = list.filter(c => c.status === filters.status);
    }

    if (filters.publishedOnly) {
      list = list.filter(c => c.published && c.moderationStatus === 'approved');
    }

    if (filters.search) {
      const q = filters.search.toLowerCase().trim();
      list = list.filter(c =>
        c.title.toLowerCase().includes(q) ||
        c.subtitle?.toLowerCase().includes(q) ||
        c.instructorName.toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q) ||
        (c.tags && c.tags.some(t => t.toLowerCase().includes(q)))
      );
    }

    if (filters.sortBy) {
      switch (filters.sortBy) {
        case 'popular':
          list.sort((a, b) => (b.studentsCount || 0) - (a.studentsCount || 0));
          break;
        case 'newest':
          list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          break;
        case 'rating':
          list.sort((a, b) => (b.rating || 0) - (a.rating || 0));
          break;
        case 'title-asc':
          list.sort((a, b) => a.title.localeCompare(b.title));
          break;
        case 'title-desc':
          list.sort((a, b) => b.title.localeCompare(a.title));
          break;
        default:
          break;
      }
    }

    return list;
  },

  async getCourseById(id) {
    await delay(80);
    const list = storageService.getCourses();
    const course = list.find(c => c.id === id);
    if (!course) {
      throw new ApiError('Course not found', 404);
    }
    return course;
  },

  async createCourse(courseData, currentUser) {
    await delay(120);
    const list = storageService.getCourses();

    const newCourse = {
      id: `course-${Date.now()}`,
      title: courseData.title || 'Untitled Course',
      subtitle: courseData.subtitle || '',
      category: courseData.category || 'Software Engineering',
      difficulty: courseData.difficulty || 'Beginner',
      duration: courseData.duration || '10 hours',
      rating: 5.0,
      reviewsCount: 0,
      studentsCount: 0,
      instructorId: currentUser.id,
      instructorName: currentUser.name,
      instructorTitle: currentUser.title || 'Course Instructor',
      instructorAvatar: currentUser.avatar,
      thumbnail: courseData.thumbnail || 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=80',
      published: courseData.published || false,
      status: courseData.published ? 'published' : 'draft',
      moderationStatus: 'approved', // automatic or pending depending on settings
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
      tags: courseData.tags || [],
      description: courseData.description || '',
      whatYouWillLearn: courseData.whatYouWillLearn || ['Comprehensive understanding of topic fundamentals'],
      requirements: courseData.requirements || ['Curiosity and willingness to learn'],
      modules: courseData.modules || []
    };

    const updated = [newCourse, ...list];
    storageService.setCourses(updated);

    storageService.addActivity({
      user: currentUser.name,
      role: currentUser.role,
      action: 'Course Created',
      details: `Created new course "${newCourse.title}"`,
      type: 'success'
    });

    return newCourse;
  },

  async updateCourse(id, updates, currentUser) {
    await delay(100);
    const list = storageService.getCourses();
    const index = list.findIndex(c => c.id === id);
    if (index === -1) {
      throw new ApiError('Course not found', 404);
    }

    const currentCourse = list[index];

    // Check ownership if instructor
    if (currentUser && currentUser.role === 'INSTRUCTOR' && currentCourse.instructorId !== currentUser.id) {
      throw new ApiError('You do not have permission to edit courses created by other instructors.', 403);
    }

    const updatedCourse = {
      ...currentCourse,
      ...updates,
      updatedAt: new Date().toISOString().split('T')[0]
    };

    // If published changed, update status accordingly
    if (updates.published !== undefined) {
      updatedCourse.status = updates.published ? 'published' : 'draft';
    }

    list[index] = updatedCourse;
    storageService.setCourses(list);

    if (currentUser) {
      storageService.addActivity({
        user: currentUser.name,
        role: currentUser.role,
        action: 'Course Modified',
        details: `Updated details for "${updatedCourse.title}"`,
        type: 'info'
      });
    }

    return updatedCourse;
  },

  async deleteCourse(id, currentUser) {
    await delay(100);
    const list = storageService.getCourses();
    const course = list.find(c => c.id === id);
    if (!course) {
      throw new ApiError('Course not found', 404);
    }

    if (currentUser && currentUser.role === 'INSTRUCTOR' && course.instructorId !== currentUser.id) {
      throw new ApiError('You can only delete your own courses.', 403);
    }

    const filtered = list.filter(c => c.id !== id);
    storageService.setCourses(filtered);

    // Also remove associated enrollments
    const enrollments = storageService.getEnrollments().filter(e => e.courseId !== id);
    storageService.setEnrollments(enrollments);

    if (currentUser) {
      storageService.addActivity({
        user: currentUser.name,
        role: currentUser.role,
        action: 'Course Deleted',
        details: `Deleted course "${course.title}"`,
        type: 'warning'
      });
    }

    return true;
  },

  async togglePublish(id, currentUser) {
    const course = await this.getCourseById(id);
    const newPublished = !course.published;
    return this.updateCourse(id, { published: newPublished }, currentUser);
  },

  // Module and Lesson Management
  async addModule(courseId, moduleTitle, currentUser) {
    const course = await this.getCourseById(courseId);
    const newModule = {
      id: `mod-${Date.now()}`,
      title: moduleTitle,
      order: (course.modules?.length || 0) + 1,
      duration: '45 min',
      lessons: []
    };
    const modules = [...(course.modules || []), newModule];
    return this.updateCourse(courseId, { modules }, currentUser);
  },

  async updateModule(courseId, moduleId, updates, currentUser) {
    const course = await this.getCourseById(courseId);
    const modules = (course.modules || []).map(m => {
      if (m.id === moduleId) {
        return { ...m, ...updates };
      }
      return m;
    });
    return this.updateCourse(courseId, { modules }, currentUser);
  },

  async deleteModule(courseId, moduleId, currentUser) {
    const course = await this.getCourseById(courseId);
    const modules = (course.modules || []).filter(m => m.id !== moduleId);
    return this.updateCourse(courseId, { modules }, currentUser);
  },

  async reorderModules(courseId, newModules, currentUser) {
    return this.updateCourse(courseId, { modules: newModules }, currentUser);
  },

  async addLesson(courseId, moduleId, lessonData, currentUser) {
    const course = await this.getCourseById(courseId);
    const modules = (course.modules || []).map(m => {
      if (m.id === moduleId) {
        const newLesson = {
          id: `les-${Date.now()}`,
          title: lessonData.title || 'New Lesson',
          duration: lessonData.duration || '15 min',
          type: lessonData.type || 'text',
          isPreview: Boolean(lessonData.isPreview),
          videoUrl: lessonData.videoUrl || '',
          summary: lessonData.summary || '',
          content: lessonData.content || 'Write rich lecture notes and code blocks here.'
        };
        return {
          ...m,
          lessons: [...(m.lessons || []), newLesson]
        };
      }
      return m;
    });
    return this.updateCourse(courseId, { modules }, currentUser);
  },

  async updateLesson(courseId, moduleId, lessonId, updates, currentUser) {
    const course = await this.getCourseById(courseId);
    const modules = (course.modules || []).map(m => {
      if (m.id === moduleId) {
        const lessons = (m.lessons || []).map(l => {
          if (l.id === lessonId) {
            return { ...l, ...updates };
          }
          return l;
        });
        return { ...m, lessons };
      }
      return m;
    });
    return this.updateCourse(courseId, { modules }, currentUser);
  },

  async deleteLesson(courseId, moduleId, lessonId, currentUser) {
    const course = await this.getCourseById(courseId);
    const modules = (course.modules || []).map(m => {
      if (m.id === moduleId) {
        const lessons = (m.lessons || []).filter(l => l.id !== lessonId);
        return { ...m, lessons };
      }
      return m;
    });
    return this.updateCourse(courseId, { modules }, currentUser);
  },

  async moderateCourse(courseId, status, currentUser) {
    const course = await this.getCourseById(courseId);
    const updated = await this.updateCourse(courseId, { moderationStatus: status }, currentUser);
    storageService.addActivity({
      user: currentUser.name,
      role: 'ADMIN',
      action: 'Course Moderated',
      details: `Changed moderation status of "${course.title}" to ${status}`,
      type: status === 'approved' ? 'success' : 'warning'
    });
    return updated;
  }
};
