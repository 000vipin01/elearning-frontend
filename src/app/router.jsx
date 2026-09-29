import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import { AuthProvider } from '../shared/auth/AuthContext.jsx'
import RequireAuth from '../shared/auth/RequireAuth.jsx'
import LoginPage from '../features/auth/LoginPage.jsx'
import SignupPage from '../features/auth/SignupPage.jsx'
import StudentShell from '../shells/student/StudentShell.jsx'
import InstructorShell from '../shells/instructor/InstructorShell.jsx'
import AdminShell from '../shells/admin/AdminShell.jsx'

const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/signup',
    element: <SignupPage />,
  },
  {
    path: '/student',
    element: <RequireAuth allowedRoles={['STUDENT']}><StudentShell /></RequireAuth>,
    children: [
      { index: true, element: <div className="p-6"><h1 className="font-display text-2xl font-bold">Welcome to Learning Studio</h1><p className="mt-2 text-[var(--text-muted)]">Continue your learning journey</p></div> },
      { path: 'courses', element: <div className="p-6"><h1 className="font-display text-2xl font-bold">Courses</h1></div> },
      { path: 'my-learning', element: <div className="p-6"><h1 className="font-display text-2xl font-bold">My Learning</h1></div> },
      { path: 'certificates', element: <div className="p-6"><h1 className="font-display text-2xl font-bold">Certificates</h1></div> },
    ],
  },
  {
    path: '/instructor',
    element: <RequireAuth allowedRoles={['INSTRUCTOR']}><InstructorShell /></RequireAuth>,
    children: [
      { index: true, element: <div className="p-6"><h1 className="font-display text-2xl font-bold">Creator Workbench</h1><p className="mt-2 text-[var(--text-muted)]">Manage your courses and students</p></div> },
      { path: 'courses', element: <div className="p-6"><h1 className="font-display text-2xl font-bold">My Courses</h1></div> },
      { path: 'students', element: <div className="p-6"><h1 className="font-display text-2xl font-bold">Students</h1></div> },
      { path: 'earnings', element: <div className="p-6"><h1 className="font-display text-2xl font-bold">Earnings</h1></div> },
      { path: 'offers', element: <div className="p-6"><h1 className="font-display text-2xl font-bold">Offers</h1></div> },
      { path: 'settings', element: <div className="p-6"><h1 className="font-display text-2xl font-bold">Settings</h1></div> },
    ],
  },
  {
    path: '/admin',
    element: <RequireAuth allowedRoles={['ADMIN']}><AdminShell /></RequireAuth>,
    children: [
      { index: true, element: <div className="p-6"><h1 className="font-display text-2xl font-bold">Control Room</h1><p className="mt-2 text-[var(--text-muted)]">Platform operations and analytics</p></div> },
      { path: 'users', element: <div className="p-6"><h1 className="font-display text-2xl font-bold">User Management</h1></div> },
      { path: 'courses', element: <div className="p-6"><h1 className="font-display text-2xl font-bold">Course Management</h1></div> },
      { path: 'payments', element: <div className="p-6"><h1 className="font-display text-2xl font-bold">Payments</h1></div> },
      { path: 'coupons', element: <div className="p-6"><h1 className="font-display text-2xl font-bold">Coupons</h1></div> },
      { path: 'announcements', element: <div className="p-6"><h1 className="font-display text-2xl font-bold">Announcements</h1></div> },
      { path: 'audit', element: <div className="p-6"><h1 className="font-display text-2xl font-bold">Audit Log</h1></div> },
    ],
  },
  {
    path: '/',
    element: <Navigate to="/login" replace />,
  },
  {
    path: '*',
    element: <Navigate to="/login" replace />,
  },
])

export default function AppRouter() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  )
}
