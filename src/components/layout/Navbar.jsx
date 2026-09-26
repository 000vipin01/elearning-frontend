import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X, GraduationCap, Bell, User } from 'lucide-react'

export default function Navbar({ onMenuToggle, isSidebarOpen }) {
  const [isProfileOpen, setIsProfileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-30 border-b border-gray-200 bg-white">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left: mobile menu toggle + logo */}
        <div className="flex items-center gap-4">
          <button
            type="button"
            className="rounded-md p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 lg:hidden"
            onClick={onMenuToggle}
            aria-label="Toggle sidebar"
          >
            {isSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
          <Link to="/" className="flex items-center gap-2">
            <GraduationCap className="h-8 w-8 text-indigo-600" />
            <span className="text-lg font-bold text-gray-900">E-Learning</span>
          </Link>
        </div>

        {/* Right: actions */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="rounded-full p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" />
          </button>

          <div className="relative">
            <button
              type="button"
              className="flex items-center gap-2 rounded-full p-1.5 hover:bg-gray-100"
              onClick={() => setIsProfileOpen(!isProfileOpen)}
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100">
                <User className="h-4 w-4 text-indigo-600" />
              </div>
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-48 rounded-lg border border-gray-200 bg-white py-1 shadow-lg">
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  onClick={() => setIsProfileOpen(false)}
                >
                  Profile
                </Link>
                <Link
                  to="/settings"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  onClick={() => setIsProfileOpen(false)}
                >
                  Settings
                </Link>
                <hr className="my-1" />
                <button
                  type="button"
                  className="block w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-50"
                  onClick={() => setIsProfileOpen(false)}
                >
                  Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
