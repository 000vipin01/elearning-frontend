import { Outlet, Link, useLocation } from 'react-router-dom'
import { LayoutDashboard, Users, BookOpen, CreditCard, Tag, Megaphone, Shield, LogOut, Search } from 'lucide-react'
import { useState } from 'react'
import { useAuth } from '../../shared/auth/AuthContext.jsx'

export default function AdminShell() {
  const { user, logout } = useAuth()
  const location = useLocation()
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false)

  const navItems = [
    { to: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/admin/users', label: 'Users', icon: Users },
    { to: '/admin/courses', label: 'Courses', icon: BookOpen },
    { to: '/admin/payments', label: 'Payments', icon: CreditCard },
    { to: '/admin/coupons', label: 'Coupons', icon: Tag },
    { to: '/admin/announcements', label: 'Announcements', icon: Megaphone },
    { to: '/admin/audit', label: 'Audit Log', icon: Shield },
  ]

  return (
    <div className="shell-admin flex min-h-screen bg-[var(--bg)]">
      {/* Left sidebar */}
      <aside className="fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-[var(--sidebar)] text-white">
        <div className="flex h-16 items-center gap-2 border-b border-white/10 px-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--primary)] font-bold">
            CR
          </div>
          <span className="font-display text-lg font-bold">Control Room</span>
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
              <p className="truncate text-xs text-gray-400">Admin</p>
            </div>
            <button onClick={logout} className="text-gray-400 hover:text-white">
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="ml-64 flex-1 p-6">
        {/* Command palette trigger */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="font-display text-2xl font-bold text-[var(--text)]">Control Room</h1>
            <p className="text-sm text-[var(--text-muted)]">Platform operations and analytics</p>
          </div>
          <button
            onClick={() => setCommandPaletteOpen(true)}
            className="flex items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm text-[var(--text-muted)] hover:border-[var(--primary)]"
          >
            <Search size={16} />
            <span>Command Palette</span>
            <kbd className="rounded bg-[var(--border)] px-1.5 py-0.5 text-xs">Ctrl+K</kbd>
          </button>
        </div>

        <Outlet />
      </main>

      {/* Command palette modal */}
      {commandPaletteOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 pt-20" onClick={() => setCommandPaletteOpen(false)}>
          <div className="w-full max-w-lg rounded-xl bg-[var(--surface)] p-4 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center gap-2 border-b border-[var(--border)] pb-3">
              <Search size={20} className="text-[var(--text-muted)]" />
              <input
                type="text"
                placeholder="Type a command..."
                className="flex-1 bg-transparent text-lg outline-none"
                autoFocus
              />
            </div>
            <div className="mt-2 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm hover:bg-[var(--border)]"
                  onClick={() => setCommandPaletteOpen(false)}
                >
                  <item.icon size={18} className="text-[var(--text-muted)]" />
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
