import { Outlet, Link, useLocation } from 'react-router-dom'
import { LayoutDashboard, BookOpen, Users, DollarSign, Tag, Bell, LogOut, Settings } from 'lucide-react'
import { useAuth } from '../../shared/auth/AuthContext.jsx'

export default function InstructorShell() {
  const { user, logout } = useAuth()
  const location = useLocation()

  const navItems = [
    { to: '/instructor', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/instructor/courses', label: 'Courses', icon: BookOpen },
    { to: '/instructor/students', label: 'Students', icon: Users },
    { to: '/instructor/earnings', label: 'Earnings', icon: DollarSign },
    { to: '/instructor/offers', label: 'Offers', icon: Tag },
    { to: '/instructor/settings', label: 'Settings', icon: Settings },
  ]

  return (
    <div className="shell-instructor flex min-h-screen bg-[var(--bg)]">
      {/* Left sidebar */}
      <aside className="fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-[var(--sidebar)] text-white">
        <div className="flex h-16 items-center gap-2 border-b border-white/10 px-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--primary)] font-bold">
            CW
          </div>
          <span className="font-display text-lg font-bold">Creator Workbench</span>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto p-3">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                location.pathname === item.to
                  ? 'bg-[var(--primary)] text-white'
                  : 'text-gray-300 hover:bg-white/10 hover:text-white'
              }`}
            >
              <item.icon size={18} />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="border-t border-white/10 p-3">
          <div className="flex items-center gap-3 rounded-lg px-3 py-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--primary)] text-sm font-bold">
              {user?.name?.[0]?.toUpperCase()}
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="truncate text-sm font-medium">{user?.name}</p>
              <p className="truncate text-xs text-gray-400">{user?.email}</p>
            </div>
            <button onClick={logout} className="text-gray-400 hover:text-white">
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="ml-64 flex-1 p-6">
        <Outlet />
      </main>
    </div>
  )
}
