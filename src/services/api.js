const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api/v1'

async function request(path, options = {}) {
  const token = localStorage.getItem('token')

  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  }

  const response = await fetch(`${API_URL}${path}`, { ...options, headers })

  if (!response.ok) {
    const error = await response.json().catch(() => ({}))
    throw new Error(error.error || `Request failed: ${response.status}`)
  }

  return response.json()
}

export const api = {
  // Auth
  login: (email, password) =>
    request('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) }),
  signup: (name, email, password) =>
    request('/auth/signup', { method: 'POST', body: JSON.stringify({ name, email, password }) }),

  // Courses
  getCourses: (search) => request(`/courses${search ? `?search=${search}` : ''}`),
  getCourse: (id) => request(`/courses/${id}`),
  createCourse: (data) => request('/courses', { method: 'POST', body: JSON.stringify(data) }),
  updateCourse: (id, data) => request(`/courses/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteCourse: (id) => request(`/courses/${id}`, { method: 'DELETE' }),
  getInstructorCourses: (instructorId) => request(`/courses/instructor/${instructorId}`),

  // Enrollments
  enroll: (courseId) => request(`/enrollments/${courseId}`, { method: 'POST' }),
  getMyEnrollments: () => request('/enrollments/my'),
  getEnrollmentDetails: (courseId) => request(`/enrollments/${courseId}`),
  updateProgress: (courseId, progress) =>
    request(`/enrollments/${courseId}/progress`, { method: 'PUT', body: JSON.stringify({ progress }) }),

  // Lessons
  getLessons: (courseId) => request(`/courses/${courseId}/lessons`),
  getLesson: (courseId, lessonId) => request(`/courses/${courseId}/lessons/${lessonId}`),
  createLesson: (courseId, data) =>
    request(`/courses/${courseId}/lessons`, { method: 'POST', body: JSON.stringify(data) }),
  deleteLesson: (courseId, lessonId) =>
    request(`/courses/${courseId}/lessons/${lessonId}`, { method: 'DELETE' }),

  // Dashboard
  getStudentDashboard: () => request('/dashboard/student'),
  getInstructorDashboard: () => request('/dashboard/instructor'),
}
