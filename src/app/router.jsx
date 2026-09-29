import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import { AuthProvider } from '../shared/auth/AuthContext.jsx'
import RequireAuth from '../shared/auth/RequireAuth.jsx'
import LoginPage from '../features/auth/LoginPage.jsx'
import SignupPage from '../features/auth/SignupPage.jsx'
import StudentShell from '../shells/student/StudentShell.jsx'
import InstructorShell from '../shells/instructor/InstructorShell.jsx'
import AdminShell from '../shells/admin/AdminShell.jsx'
import StudentDashboard from '../features/student/StudentDashboard.jsx'
import CourseCatalog from '../features/student/CourseCatalog.jsx'
import CourseDetail from '../features/student/CourseDetail.jsx'
import LessonPlayer from '../features/student/LessonPlayer.jsx'
import QuizPage from '../features/student/QuizPage.jsx'
import CartCheckout from '../features/student/CartCheckout.jsx'
import NotificationTray from '../features/student/NotificationTray.jsx'
import InstructorDashboard from '../features/instructor/InstructorDashboard.jsx'
import CourseManagement from '../features/instructor/CourseManagement.jsx'
import EarningsView from '../features/instructor/EarningsView.jsx'
import AdminDashboard from '../features/admin/AdminDashboard.jsx'
import UserManagement from '../features/admin/UserManagement.jsx'
import PaymentsLedger from '../features/admin/PaymentsLedger.jsx'

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
      { index: true, element: <StudentDashboard /> },
      { path: 'courses', element: <CourseCatalog /> },
      { path: 'courses/:courseId', element: <CourseDetail /> },
      { path: 'courses/:courseId/lessons/:lessonId', element: <LessonPlayer /> },
      { path: 'courses/:courseId/quizzes/:quizId', element: <QuizPage /> },
      { path: 'cart', element: <CartCheckout /> },
      { path: 'my-learning', element: <div className="p-6"><h1 className="font-display text-2xl font-bold">My Learning</h1></div> },
      { path: 'certificates', element: <div className="p-6"><h1 className="font-display text-2xl font-bold">Certificates</h1></div> },
      { path: 'notifications', element: <NotificationTray /> },
    ],
  },
  {
    path: '/instructor',
    element: <RequireAuth allowedRoles={['INSTRUCTOR']}><InstructorShell /></RequireAuth>,
    children: [
      { index: true, element: <InstructorDashboard /> },
      { path: 'courses', element: <CourseManagement /> },
      { path: 'students', element: <div className="p-6"><h1 className="font-display text-2xl font-bold">Students</h1></div> },
      { path: 'earnings', element: <EarningsView /> },
      { path: 'offers', element: <div className="p-6"><h1 className="font-display text-2xl font-bold">Offers</h1></div> },
      { path: 'settings', element: <div className="p-6"><h1 className="font-display text-2xl font-bold">Settings</h1></div> },
    ],
  },
  {
    path: '/admin',
    element: <RequireAuth allowedRoles={['ADMIN']}><AdminShell /></RequireAuth>,
    children: [
      { index: true, element: <AdminDashboard /> },
      { path: 'users', element: <UserManagement /> },
      { path: 'courses', element: <div className="p-6"><h1 className="font-display text-2xl font-bold">Course Management</h1></div> },
      { path: 'payments', element: <PaymentsLedger /> },
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
