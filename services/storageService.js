// Storage Service: manages persistence of mock database in localStorage
import {
  INITIAL_USERS,
  INITIAL_COURSES,
  INITIAL_CATEGORIES,
  INITIAL_ENROLLMENTS,
  INITIAL_ACTIVITY_LOGS,
  INITIAL_PLATFORM_SETTINGS
} from '../data/mockData.js';

const STORAGE_KEYS = {
  USERS: 'nexus_users',
  COURSES: 'nexus_courses',
  CATEGORIES: 'nexus_categories',
  ENROLLMENTS: 'nexus_enrollments',
  ACTIVITIES: 'nexus_activities',
  SETTINGS: 'nexus_settings',
  AUTH: 'nexus_auth_session'
};

export const storageService = {
  initStorage() {
    if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(INITIAL_USERS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.COURSES)) {
      localStorage.setItem(STORAGE_KEYS.COURSES, JSON.stringify(INITIAL_COURSES));
    }
    if (!localStorage.getItem(STORAGE_KEYS.CATEGORIES)) {
      localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(INITIAL_CATEGORIES));
    }
    if (!localStorage.getItem(STORAGE_KEYS.ENROLLMENTS)) {
      localStorage.setItem(STORAGE_KEYS.ENROLLMENTS, JSON.stringify(INITIAL_ENROLLMENTS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.ACTIVITIES)) {
      localStorage.setItem(STORAGE_KEYS.ACTIVITIES, JSON.stringify(INITIAL_ACTIVITY_LOGS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.SETTINGS)) {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(INITIAL_PLATFORM_SETTINGS));
    }
  },

  getItem(key, fallback = []) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : fallback;
    } catch (e) {
      console.error(`Error reading ${key} from storage:`, e);
      return fallback;
    }
  },

  setItem(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error(`Error saving ${key} to storage:`, e);
    }
  },

  getUsers() {
    this.initStorage();
    return this.getItem(STORAGE_KEYS.USERS, INITIAL_USERS);
  },

  setUsers(users) {
    this.setItem(STORAGE_KEYS.USERS, users);
  },

  getCourses() {
    this.initStorage();
    return this.getItem(STORAGE_KEYS.COURSES, INITIAL_COURSES);
  },

  setCourses(courses) {
    this.setItem(STORAGE_KEYS.COURSES, courses);
  },

  getCategories() {
    this.initStorage();
    return this.getItem(STORAGE_KEYS.CATEGORIES, INITIAL_CATEGORIES);
  },

  setCategories(categories) {
    this.setItem(STORAGE_KEYS.CATEGORIES, categories);
  },

  getEnrollments() {
    this.initStorage();
    return this.getItem(STORAGE_KEYS.ENROLLMENTS, INITIAL_ENROLLMENTS);
  },

  setEnrollments(enrollments) {
    this.setItem(STORAGE_KEYS.ENROLLMENTS, enrollments);
  },

  getActivities() {
    this.initStorage();
    return this.getItem(STORAGE_KEYS.ACTIVITIES, INITIAL_ACTIVITY_LOGS);
  },

  setActivities(activities) {
    this.setItem(STORAGE_KEYS.ACTIVITIES, activities);
  },

  addActivity(activity) {
    const list = this.getActivities();
    const newAct = {
      id: 'act-' + Date.now(),
      timestamp: new Date().toISOString(),
      type: 'info',
      ...activity
    };
    this.setItem(STORAGE_KEYS.ACTIVITIES, [newAct, ...list]);
    return newAct;
  },

  getSettings() {
    this.initStorage();
    return this.getItem(STORAGE_KEYS.SETTINGS, INITIAL_PLATFORM_SETTINGS);
  },

  setSettings(settings) {
    this.setItem(STORAGE_KEYS.SETTINGS, settings);
  },

  getAuthSession() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.AUTH);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      return null;
    }
  },

  setAuthSession(user) {
    if (user) {
      localStorage.setItem(STORAGE_KEYS.AUTH, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEYS.AUTH);
    }
  },

  // Reset entire system to fresh demo data
  resetAllDemoData() {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(INITIAL_USERS));
    localStorage.setItem(STORAGE_KEYS.COURSES, JSON.stringify(INITIAL_COURSES));
    localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(INITIAL_CATEGORIES));
    localStorage.setItem(STORAGE_KEYS.ENROLLMENTS, JSON.stringify(INITIAL_ENROLLMENTS));
    localStorage.setItem(STORAGE_KEYS.ACTIVITIES, JSON.stringify(INITIAL_ACTIVITY_LOGS));
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(INITIAL_PLATFORM_SETTINGS));
    return true;
  }
};
