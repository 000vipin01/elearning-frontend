import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import {
  GraduationCap,
  LogOut,
  User,
  LayoutDashboard,
  Sparkles,
  ChevronDown,
  Menu,
  Shield,
  Layers,
  BookOpen
} from 'lucide-react';
import { Avatar } from '../ui/Avatar';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { ConfirmDialog } from '../ui/ConfirmDialog';

export function Navbar({ onToggleSidebar, isSidebarOpen }) {
  const { user, role, logout, login } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();

  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isDemoMenuOpen, setIsDemoMenuOpen] = useState(false);
  const [isLogoutConfirmOpen, setIsLogoutConfirmOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    await logout();
    setIsLoggingOut(false);
    setIsLogoutConfirmOpen(false);
    toast.info('You have been logged out.');
    navigate('/');
  };

  const handleSwitchDemo = async (roleName, email, password) => {
    try {
      await login(email, password);
      setIsDemoMenuOpen(false);
      toast.success(`Switched session to ${roleName}`);
      if (roleName === 'Admin') navigate('/admin/dashboard');
      else if (roleName === 'Instructor') navigate('/instructor/dashboard');
      else navigate('/student/dashboard');
    } catch (err) {
      toast.error(err.message || 'Failed to switch demo account');
    }
  };

  const getDashboardPath = () => {
    if (role === 'ADMIN') return '/admin/dashboard';
    if (role === 'INSTRUCTOR') return '/instructor/dashboard';
    return '/student/dashboard';
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-slate-950/90 backdrop-blur-md border-b border-surface-border/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Left: Brand & Mobile Sidebar Toggle */}
          <div className="flex items-center gap-3">
            {user && (
              <button
                type="button"
                onClick={onToggleSidebar}
                className="lg:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none"
                aria-label="Toggle Navigation"
              >
                <Menu className="w-5 h-5" />
              </button>
            )}

            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-amber-400 flex items-center justify-center text-slate-950 font-bold shadow-lg shadow-brand-500/20 group-hover:scale-105 transition-transform">
                <GraduationCap className="w-6 h-6 stroke-[2.5]" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-lg tracking-tight text-white group-hover:text-brand-400 transition-colors">
                    Nexus<span className="text-brand-500">LMS</span>
                  </span>
                  <span className="hidden sm:inline-block px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-brand-500/10 text-brand-400 border border-brand-500/20">
                    Academic
                  </span>
                </div>
              </div>
            </Link>
          </div>

          {/* Center: Global Navigation for Public or quick access */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
            <Link to="/courses" className="hover:text-brand-400 transition-colors flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-slate-400" />
              <span>Course Catalog</span>
            </Link>
            <Link to="/about" className="hover:text-brand-400 transition-colors">
              Platform Overview
            </Link>
          </nav>

          {/* Right: Quick Demo Switcher & User Profile */}
          <div className="flex items-center gap-3">
            {/* Quick Demo Switcher Dropdown (Essential for live presentations) */}
            <div className="relative">
              <button
                onClick={() => setIsDemoMenuOpen(!isDemoMenuOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-surface-subtle hover:bg-slate-800 border border-surface-border text-xs font-semibold text-brand-400 transition-all shadow-sm"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Demo Switcher</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {isDemoMenuOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setIsDemoMenuOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-slate-900 border border-surface-border shadow-2xl p-2 z-50 animate-in fade-in-50 zoom-in-95">
                    <div className="px-3 py-2 border-b border-surface-border/60">
                      <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                        1-Click Presentation Accounts
                      </p>
                      <p className="text-[11px] text-slate-500 mt-0.5">Switch role instantly for testing</p>
                    </div>
                    <div className="mt-1 space-y-1">
                      <button
                        onClick={() => handleSwitchDemo('Admin', 'admin@elearn.com', 'admin123')}
                        className="w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between hover:bg-slate-800 transition-colors text-slate-200"
                      >
                        <div>
                          <div className="font-semibold text-rose-400">Admin Console</div>
                          <div className="text-[11px] text-slate-500">admin@elearn.com</div>
                        </div>
                        <Badge variant="rose" size="sm">Admin</Badge>
                      </button>
                      <button
                        onClick={() => handleSwitchDemo('Instructor', 'instructor@elearn.com', 'instructor123')}
                        className="w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between hover:bg-slate-800 transition-colors text-slate-200"
                      >
                        <div>
                          <div className="font-semibold text-amber-400">Instructor Studio</div>
                          <div className="text-[11px] text-slate-500">instructor@elearn.com</div>
                        </div>
                        <Badge variant="amber" size="sm">Instructor</Badge>
                      </button>
                      <button
                        onClick={() => handleSwitchDemo('Student', 'student@elearn.com', 'student123')}
                        className="w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between hover:bg-slate-800 transition-colors text-slate-200"
                      >
                        <div>
                          <div className="font-semibold text-sky-400">Student Portal</div>
                          <div className="text-[11px] text-slate-500">student@elearn.com</div>
                        </div>
                        <Badge variant="sky" size="sm">Student</Badge>
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Authenticated User Menu or Sign In */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                  className="flex items-center gap-2.5 p-1 rounded-xl hover:bg-slate-800/80 transition-colors focus:outline-none"
                >
                  <Avatar
                    src={user.avatar}
                    fallbackText={user.name}
                    size="sm"
                    status="online"
                  />
                  <div className="hidden xl:flex flex-col text-left">
                    <span className="text-xs font-bold text-slate-100 leading-tight">
                      {user.name}
                    </span>
                    <span className="text-[10px] text-slate-400 leading-tight uppercase font-semibold">
                      {role}
                    </span>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden xl:block" />
                </button>

                {isProfileMenuOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setIsProfileMenuOpen(false)}
                    />
                    <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-slate-900 border border-surface-border shadow-2xl p-2 z-50 animate-in fade-in-50 zoom-in-95">
                      <div className="p-3 border-b border-surface-border/60">
                        <p className="text-sm font-bold text-slate-100">{user.name}</p>
                        <p className="text-xs text-slate-400 truncate">{user.email}</p>
                        <div className="mt-2">
                          <Badge
                            variant={
                              role === 'ADMIN'
                                ? 'rose'
                                : role === 'INSTRUCTOR'
                                ? 'amber'
                                : 'sky'
                            }
                            size="sm"
                          >
                            {role}
                          </Badge>
                        </div>
                      </div>

                      <div className="py-1">
                        <Link
                          to={getDashboardPath()}
                          onClick={() => setIsProfileMenuOpen(false)}
                          className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800 rounded-xl transition-colors"
                        >
                          <LayoutDashboard className="w-4 h-4 text-brand-400" />
                          <span>Role Dashboard</span>
                        </Link>
                        <Link
                          to={role === 'STUDENT' ? '/student/profile' : role === 'INSTRUCTOR' ? '/instructor/profile' : '/admin/settings'}
                          onClick={() => setIsProfileMenuOpen(false)}
                          className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800 rounded-xl transition-colors"
                        >
                          <User className="w-4 h-4 text-slate-400" />
                          <span>My Profile</span>
                        </Link>
                      </div>

                      <div className="pt-1 border-t border-surface-border/60">
                        <button
                          onClick={() => {
                            setIsProfileMenuOpen(false);
                            setIsLogoutConfirmOpen(true);
                          }}
                          className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-rose-400 hover:bg-rose-500/10 rounded-xl transition-colors"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login">
                  <Button variant="ghost" size="sm">
                    Sign In
                  </Button>
                </Link>
                <Link to="/register">
                  <Button variant="primary" size="sm">
                    Register
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Logout Confirmation Dialog */}
      <ConfirmDialog
        isOpen={isLogoutConfirmOpen}
        title="Sign Out Confirmation"
        message="Are you sure you want to log out of your current session?"
        confirmText="Sign Out"
        cancelText="Stay Signed In"
        isDanger={true}
        isLoading={isLoggingOut}
        onConfirm={handleLogout}
        onCancel={() => setIsLogoutConfirmOpen(false)}
      />
    </>
  );
}
