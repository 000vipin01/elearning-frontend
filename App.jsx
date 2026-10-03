import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';

// Layouts
import { AppLayout, PublicLayout } from './components/layout/AppLayout';
import { ProtectedRoute } from './components/auth/ProtectedRoute';

// Public Pages
import { LandingPage } from './pages/public/LandingPage';
import { LoginPage } from './pages/public/LoginPage';
import { RegisterPage } from './pages/public/RegisterPage';
import { AboutPage } from './pages/public/AboutPage';
import { CourseCatalogPage } from './pages/public/CourseCatalogPage';
import { CourseDetailsPage } from './pages/public/CourseDetailsPage';

// Student Pages
import { StudentDashboardPage } from './pages/student/StudentDashboardPage';
import { MyCoursesPage } from './pages/student/MyCoursesPage';
import { LearningLessonPage } from './pages/student/LearningLessonPage';
import { StudentProgressPage } from './pages/student/StudentProgressPage';
import { StudentProfilePage } from './pages/student/StudentProfilePage';

// Instructor Pages
import { InstructorDashboardPage } from './pages/instructor/InstructorDashboardPage';
import { InstructorCoursesPage } from './pages/instructor/InstructorCoursesPage';
import { CourseFormPage } from './pages/instructor/CourseFormPage';
import { CourseBuilderPage } from './pages/instructor/CourseBuilderPage';
import { InstructorStudentsPage } from './pages/instructor/InstructorStudentsPage';
import { InstructorAnalyticsPage } from './pages/instructor/InstructorAnalyticsPage';
import { InstructorProfilePage } from './pages/instructor/InstructorProfilePage';

// Admin Pages
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';
import { UserManagementPage } from './pages/admin/UserManagementPage';
import { InstructorManagementPage } from './pages/admin/InstructorManagementPage';
import { CourseManagementPage } from './pages/admin/CourseManagementPage';
import { CourseModerationPage } from './pages/admin/CourseModerationPage';
import { CategoriesPage } from './pages/admin/CategoriesPage';
import { PlatformSettingsPage } from './pages/admin/PlatformSettingsPage';
import { ActivityLogsPage } from './pages/admin/ActivityLogsPage';

// System Pages
import { NotFoundPage } from './pages/system/NotFoundPage';
import { UnauthorizedPage } from './pages/system/UnauthorizedPage';

export default function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <AuthProvider>
          <Routes>
            {/* Public Layout Routes */}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/courses" element={<CourseCatalogPage />} />
              <Route path="/courses/:id" element={<CourseDetailsPage />} />
              <Route path="/unauthorized" element={<UnauthorizedPage />} />
              <Route path="/404" element={<NotFoundPage />} />
            </Route>

            {/* Direct Learning Classroom view (full width, custom layout) */}
            <Route
              path="/learn/:courseId"
              element={
                <ProtectedRoute allowedRoles={['STUDENT', 'INSTRUCTOR', 'ADMIN']}>
                  <LearningLessonPage />
                </ProtectedRoute>
              }
            />

            {/* Student Protected Portal */}
            <Route
              path="/student"
              element={
                <ProtectedRoute allowedRoles={['STUDENT', 'ADMIN']}>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate to="/student/dashboard" replace />} />
              <Route path="dashboard" element={<StudentDashboardPage />} />
              <Route path="my-courses" element={<MyCoursesPage />} />
              <Route path="progress" element={<StudentProgressPage />} />
              <Route path="profile" element={<StudentProfilePage />} />
            </Route>

            {/* Instructor Protected Studio */}
            <Route
              path="/instructor"
              element={
                <ProtectedRoute allowedRoles={['INSTRUCTOR', 'ADMIN']}>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate to="/instructor/dashboard" replace />} />
              <Route path="dashboard" element={<InstructorDashboardPage />} />
              <Route path="courses" element={<InstructorCoursesPage />} />
              <Route path="courses/create" element={<CourseFormPage />} />
              <Route path="courses/edit/:id" element={<CourseFormPage />} />
              <Route path="courses/:id/builder" element={<CourseBuilderPage />} />
              <Route path="students" element={<InstructorStudentsPage />} />
              <Route path="analytics" element={<InstructorAnalyticsPage />} />
              <Route path="profile" element={<InstructorProfilePage />} />
            </Route>

            {/* Admin Protected Console */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute allowedRoles={['ADMIN']}>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate to="/admin/dashboard" replace />} />
              <Route path="dashboard" element={<AdminDashboardPage />} />
              <Route path="users" element={<UserManagementPage />} />
              <Route path="instructors" element={<InstructorManagementPage />} />
              <Route path="courses" element={<CourseManagementPage />} />
              <Route path="moderation" element={<CourseModerationPage />} />
              <Route path="categories" element={<CategoriesPage />} />
              <Route path="settings" element={<PlatformSettingsPage />} />
              <Route path="activity" element={<ActivityLogsPage />} />
            </Route>

            {/* 404 Catch All */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </AuthProvider>
      </ToastProvider>
    </BrowserRouter>
  );
}
