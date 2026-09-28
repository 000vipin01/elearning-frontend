const BASE_URL = '/api/v1'

async function request(path, options = {}) {
  const url = `${BASE_URL}${path}`
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  }

  const response = await fetch(url, config)

  if (!response.ok) {
    const error = await response.json().catch(() => ({}))
    throw new Error(error.message || `Request failed: ${response.status}`)
  }

  return response.json()
}

export const api = {
  // Auth
  login: (email, password) =>
    request('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) }),
  signup: (name, email, password) =>
    request('/auth/signup', { method: 'POST', body: JSON.stringify({ name, email, password }) }),
  logout: () => request('/auth/logout', { method: 'POST' }),

  // Courses
  getCourses: () => request('/courses'),
  getCourse: (id) => request(`/courses/${id}`),
  createCourse: (data) => request('/courses', { method: 'POST', body: JSON.stringify(data) }),
  updateCourse: (id, data) => request(`/courses/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteCourse: (id) => request(`/courses/${id}`, { method: 'DELETE' }),

  // Enrollments
  enroll: (courseId) => request(`/courses/${courseId}/enroll`, { method: 'POST' }),
  getEnrollments: () => request('/enrollments'),

  // Lessons
  getLessons: (courseId) => request(`/courses/${courseId}/lessons`),
  getLesson: (courseId, lessonId) => request(`/courses/${courseId}/lessons/${lessonId}`),
  markLessonComplete: (courseId, lessonId) =>
    request(`/courses/${courseId}/lessons/${lessonId}/complete`, { method: 'POST' }),

  // Quizzes
  getQuizzes: (courseId) => request(`/courses/${courseId}/quizzes`),
  getQuiz: (courseId, quizId) => request(`/courses/${courseId}/quizzes/${quizId}`),
  submitQuiz: (courseId, quizId, answers) =>
    request(`/courses/${courseId}/quizzes/${quizId}/submit`, { method: 'POST', body: JSON.stringify({ answers }) }),

  // Users
  getUsers: () => request('/users'),
  getUser: (id) => request(`/users/${id}`),
  updateUser: (id, data) => request(`/users/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteUser: (id) => request(`/users/${id}`, { method: 'DELETE' }),

  // Analytics
  getAnalytics: (range) => request(`/analytics?range=${range}`),
  getPlatformStats: () => request('/analytics/platform'),
}
