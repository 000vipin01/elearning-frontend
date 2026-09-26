import { Routes, Route } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout.jsx'
import StudentDashboardPage from '../pages/StudentDashboardPage.jsx'
import PlaceholderPage from '../pages/PlaceholderPage.jsx'

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<StudentDashboardPage />} />
        <Route
          path="courses"
          element={
            <PlaceholderPage
              title="Courses"
              description="Browse and manage available courses"
            />
          }
        />
        <Route
          path="students"
          element={
            <PlaceholderPage
              title="Students"
              description="Manage student enrollments and progress"
            />
          }
        />
        <Route
          path="instructors"
          element={
            <PlaceholderPage
              title="Instructors"
              description="Manage instructor accounts and content"
            />
          }
        />
        <Route
          path="analytics"
          element={
            <PlaceholderPage
              title="Analytics"
              description="View platform metrics and reports"
            />
          }
        />
        <Route
          path="settings"
          element={
            <PlaceholderPage
              title="Settings"
              description="Configure application preferences"
            />
          }
        />
        <Route
          path="profile"
          element={
            <PlaceholderPage
              title="Profile"
              description="View and edit your profile"
            />
          }
        />
        <Route path="*" element={<StudentDashboardPage />} />
      </Route>
    </Routes>
  )
}
