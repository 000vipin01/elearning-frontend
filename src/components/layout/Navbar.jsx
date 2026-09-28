import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Menu, X, GraduationCap, User, LogOut } from 'lucide-react'
import { useAuth } from '../../context/AuthContext.jsx'
import { Button } from '../ui/index.js'

function getHomeForRole(role) {
  switch (role) {
    case 'ADMIN': return '/admin'
    case 'INSTRUCTOR': return '/instructor'
    default: return '/'
  }
}

export default function Navbar({ onMenuToggle, isSidebarOpen }) {
  const { isAuthenticated, user, logout } = useAuth()
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    setIsProfileOpen(false)
    navigate('/login')
  }

  return (
    <header className="sticky top-0 z-30 border-b border-mist bg-white">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          <button
            type="button"
            className="rounded-md p-2 text-ink/60 hover:bg-mist hover:text-ink lg:hidden"
            onClick={onMenuToggle}
            aria-label="Toggle sidebar"
          >
            {isSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
          <Link to={getHomeForRole(user?.role)} className="flex items-center gap-2">
            <GraduationCap className="h-8 w-8 text-plum" />
            <span className="text-lg font-bold text-ink">E-Learning</span>
          </Link>
        </div>

        <div className="flex items-center gap-2">
          {isAuthenticated ? (
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
                  <div className="border-b border-mist px-4 py-2">
                    <p className="text-sm font-medium text-ink">{user?.name}</p>
                    <p className="text-xs text-ink/60">{user?.email}</p>
                  </div>
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm text-ink hover:bg-cream"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    Profile
                  </Link>
                  <hr className="my-1" />
                  <button
                    type="button"
                    className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-tangerine hover:bg-cream"
                    onClick={handleLogout}
                  >
                    <LogOut className="h-4 w-4" />
                    Sign out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="secondary" size="sm" to="/login">
                Sign in
              </Button>
              <Button variant="primary" size="sm" to="/signup">
                Sign up
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
