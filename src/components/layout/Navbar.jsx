import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X, GraduationCap, Bell, User } from 'lucide-react'

export default function Navbar({ onMenuToggle, isSidebarOpen }) {
  const [isProfileOpen, setIsProfileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-30 border-b border-mist bg-white">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left: mobile menu toggle + logo */}
        <div className="flex items-center gap-4">
          <button
            type="button"
            className="rounded-md p-2 text-ink/60 hover:bg-mist hover:text-ink lg:hidden"
            onClick={onMenuToggle}
            aria-label="Toggle sidebar"
          >
            {isSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
          <Link to="/" className="flex items-center gap-2">
            <GraduationCap className="h-8 w-8 text-plum" />
            <span className="text-lg font-bold text-ink">E-Learning</span>
          </Link>
        </div>

        {/* Right: actions */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="rounded-full p-2 text-ink/60 hover:bg-mist hover:text-ink"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" />
          </button>

          <div className="relative">
            <button
              type="button"
              className="flex items-center gap-2 rounded-full p-1.5 hover:bg-mist"
              onClick={() => setIsProfileOpen(!isProfileOpen)}
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-plum/10">
                <User className="h-4 w-4 text-plum" />
              </div>
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-48 rounded-lg border border-mist bg-white py-1 shadow-lg">
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-sm text-ink hover:bg-cream"
                  onClick={() => setIsProfileOpen(false)}
                >
                  Profile
                </Link>
                <Link
                  to="/settings"
                  className="block px-4 py-2 text-sm text-ink hover:bg-cream"
                  onClick={() => setIsProfileOpen(false)}
                >
                  Settings
                </Link>
                <hr className="my-1" />
                <button
                  type="button"
                  className="block w-full px-4 py-2 text-left text-sm text-tangerine hover:bg-cream"
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
