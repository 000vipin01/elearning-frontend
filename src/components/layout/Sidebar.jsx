import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  BookOpen,
  Users,
  Settings,
  BarChart3,
  Shield,
  PlusCircle,
  X,
} from 'lucide-react'
import { useAuth } from '../../context/AuthContext.jsx'

const studentNav = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Courses', href: '/courses', icon: BookOpen },
  { name: 'Profile', href: '/profile', icon: Users },
  { name: 'Settings', href: '/settings', icon: Settings },
]

const instructorNav = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'My Courses', href: '/instructor', icon: BookOpen },
  { name: 'Create Course', href: '/instructor?tab=create', icon: PlusCircle },
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
  { name: 'Profile', href: '/profile', icon: Users },
  { name: 'Settings', href: '/settings', icon: Settings },
]

const adminNav = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Admin Panel', href: '/admin', icon: Shield },
  { name: 'Courses', href: '/courses', icon: BookOpen },
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
  { name: 'Profile', href: '/profile', icon: Users },
  { name: 'Settings', href: '/settings', icon: Settings },
]

export default function Sidebar({ isOpen, onClose }) {
  const { user } = useAuth()

  const navigation =
    user?.role === 'admin'
      ? adminNav
      : user?.role === 'instructor'
        ? instructorNav
        : studentNav

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-ink/50 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-mist bg-white transition-transform duration-200 ease-in-out lg:static lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Mobile close button */}
        <div className="flex h-16 items-center justify-between border-b border-mist px-4 lg:hidden">
          <span className="text-lg font-semibold text-ink">Menu</span>
          <button
            type="button"
            className="rounded-md p-2 text-ink/60 hover:bg-mist"
            onClick={onClose}
            aria-label="Close sidebar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 overflow-y-auto p-4">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-plum/10 text-plum'
                    : 'text-ink/70 hover:bg-cream hover:text-ink'
                }`
              }
            >
              <item.icon className="h-5 w-5 shrink-0" />
              {item.name}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  )
}
