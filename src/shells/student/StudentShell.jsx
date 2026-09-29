import { Outlet, Link, useLocation } from 'react-router-dom'
import { BookOpen, Bell, Search, User, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { useAuth } from '../../shared/auth/AuthContext.jsx'

export default function StudentShell() {
  const { user, logout } = useAuth()
  const location = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navItems = [
    { to: '/student', label: 'Home', icon: BookOpen },
    { to: '/student/courses', label: 'Courses', icon: Search },
    { to: '/student/my-learning', label: 'My Learning', icon: BookOpen },
    { to: '/student/certificates', label: 'Certificates', icon: User },
  ]

  return (
    <div className="shell-student min-h-screen bg-[var(--bg)]">
      {/* Top navigation */}
      <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--surface)]/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
          <Link to="/student" className="font-display text-xl font-bold text-[var(--primary)]">
            Learning Studio
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  location.pathname === item.to
                    ? 'bg-[var(--primary)]/10 text-[var(--primary)]'
                    : 'text-[var(--text-muted)] hover:bg-[var(--border)] hover:text-[var(--text)]'
                }`}
              >
                <item.icon size={18} />
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button className="relative rounded-lg p-2 text-[var(--text-muted)] hover:bg-[var(--border)]">
              <Bell size={20} />
              <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-[var(--accent)]" />
            </button>
            <div className="hidden items-center gap-2 md:flex">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--primary)] text-sm font-bold text-white">
                {user?.name?.[0]?.toUpperCase()}
              </div>
              <button onClick={logout} className="text-sm text-[var(--text-muted)] hover:text-[var(--text)]">
                Logout
              </button>
            </div>
            <button
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        {mobileMenuOpen && (
          <nav className="border-t border-[var(--border)] bg-[var(--surface)] px-4 py-2 md:hidden">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-[var(--text-muted)] hover:bg-[var(--border)]"
                onClick={() => setMobileMenuOpen(false)}
              >
                <item.icon size={18} />
                {item.label}
              </Link>
            ))}
          </nav>
        )}
      </header>

      {/* Main content */}
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
        <Outlet />
      </main>
    </div>
  )
}
