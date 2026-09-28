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
import SettingsPage from '../pages/SettingsPage.jsx'
import InstructorDashboardPage from '../pages/InstructorDashboardPage.jsx'
import AdminDashboardPage from '../pages/AdminDashboardPage.jsx'
import AnalyticsPage from '../pages/AnalyticsPage.jsx'

export function AppRoutes() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />

      {/* Protected routes — any authenticated user */}
      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          {/* Student-only routes */}
          <Route element={<ProtectedRoute allowedRoles={['student']} />}>
            <Route index element={<StudentDashboardPage />} />
            <Route path="courses" element={<CoursesPage />} />
            <Route path="courses/:courseId" element={<CourseDetailPage />} />
            <Route path="courses/:courseId/lessons/:lessonId" element={<LessonPlayerPage />} />
            <Route path="courses/:courseId/quizzes/:quizId" element={<QuizPage />} />
          </Route>

          {/* Instructor-only routes */}
          <Route element={<ProtectedRoute allowedRoles={['instructor']} />}>
            <Route path="instructor" element={<InstructorDashboardPage />} />
          </Route>

          {/* Admin-only routes */}
          <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
            <Route path="admin" element={<AdminDashboardPage />} />
          </Route>

          {/* Analytics — instructor + admin only */}
          <Route element={<ProtectedRoute allowedRoles={['instructor', 'admin']} />}>
            <Route path="analytics" element={<AnalyticsPage />} />
          </Route>

          {/* Shared routes — any authenticated user */}
          <Route path="profile" element={<ProfilePage />} />
          <Route path="settings" element={<SettingsPage />} />

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>

      </Route>
    </Routes>
  )
}
