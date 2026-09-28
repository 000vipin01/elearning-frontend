import { Routes, Route, Navigate } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout.jsx'
import ProtectedRoute from './ProtectedRoute.jsx'
import StudentDashboardPage from '../pages/StudentDashboardPage.jsx'
import LoginPage from '../pages/LoginPage.jsx'
import SignupPage from '../pages/SignupPage.jsx'
import CoursesPage from '../pages/CoursesPage.jsx'
import CourseDetailPage from '../pages/CourseDetailPage.jsx'
import LessonPlayerPage from '../pages/LessonPlayerPage.jsx'
import QuizPage from '../pages/QuizPage.jsx'
import ProfilePage from '../pages/ProfilePage.jsx'
import InstructorDashboardPage from '../pages/InstructorDashboardPage.jsx'
import AdminDashboardPage from '../pages/AdminDashboardPage.jsx'
import AdminLoginPage from '../pages/AdminLoginPage.jsx'

export function AppRoutes() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/admin-login" element={<AdminLoginPage />} />
      <Route path="/signup" element={<SignupPage />} />

      {/* Protected routes — any authenticated user */}
      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          {/* Course routes — accessible by all authenticated users */}
          <Route path="courses" element={<CoursesPage />} />
          <Route path="courses/:courseId" element={<CourseDetailPage />} />
          <Route path="courses/:courseId/lessons/:lessonId" element={<LessonPlayerPage />} />
          <Route path="courses/:courseId/quizzes/:quizId" element={<QuizPage />} />

          {/* Student dashboard — also accessible by Admin */}
          <Route element={<ProtectedRoute allowedRoles={['STUDENT', 'ADMIN']} />}>
            <Route index element={<StudentDashboardPage />} />
          </Route>

          {/* Instructor routes (also accessible by Admin) */}
          <Route element={<ProtectedRoute allowedRoles={['INSTRUCTOR', 'ADMIN']} />}>
            <Route path="instructor" element={<InstructorDashboardPage />} />
          </Route>

          {/* Admin routes */}
          <Route element={<ProtectedRoute allowedRoles={['ADMIN']} />}>
            <Route path="admin" element={<AdminDashboardPage />} />
          </Route>

          {/* Shared routes — any authenticated user */}
          <Route path="profile" element={<ProfilePage />} />

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Route>
    </Routes>
  )
}
