import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { storageService } from '../../services/storageService';
import {
  LayoutDashboard,
  BookOpen,
  FolderGit2,
  TrendingUp,
  User,
  PlusCircle,
  Users,
  BarChart3,
  ShieldCheck,
  UserCheck,
  FolderTree,
  Settings,
  Activity,
  RotateCcw,
  LogOut,
  X,
  FileCheck
} from 'lucide-react';
import { ConfirmDialog } from '../ui/ConfirmDialog';
import { Badge } from '../ui/Badge';

export function Sidebar({ isOpen, onClose }) {
  const { user, role, logout } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();

  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [isLogoutConfirmOpen, setIsLogoutConfirmOpen] = useState(false);

  const handleResetDemoData = async () => {
    setIsResetting(true);
    storageService.resetAllDemoData();
    setIsResetting(false);
    setIsResetConfirmOpen(false);
    toast.success('Platform state has been reset to original demo data!');
    window.location.reload();
  };

  const handleLogout = async () => {
    await logout();
    setIsLogoutConfirmOpen(false);
    toast.info('Signed out successfully');
    navigate('/');
  };

  const studentLinks = [
    { label: 'Dashboard', to: '/student/dashboard', icon: LayoutDashboard },
    { label: 'Explore Courses', to: '/courses', icon: BookOpen },
    { label: 'My Enrolled Courses', to: '/student/my-courses', icon: FolderGit2 },
    { label: 'Learning Progress', to: '/student/progress', icon: TrendingUp },
    { label: 'Student Profile', to: '/student/profile', icon: User }
  ];

  const instructorLinks = [
    { label: 'Instructor Studio', to: '/instructor/dashboard', icon: LayoutDashboard },
    { label: 'My Courses', to: '/instructor/courses', icon: BookOpen },
    { label: 'Create New Course', to: '/instructor/courses/create', icon: PlusCircle },
    { label: 'Student Enrollments', to: '/instructor/students', icon: Users },
    { label: 'Studio Analytics', to: '/instructor/analytics', icon: BarChart3 },
    { label: 'Instructor Profile', to: '/instructor/profile', icon: User }
  ];

  const adminLinks = [
    { label: 'Admin Command', to: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'User Directory', to: '/admin/users', icon: Users },
    { label: 'Instructor Roster', to: '/admin/instructors', icon: UserCheck },
    { label: 'Course Directory', to: '/admin/courses', icon: BookOpen },
    { label: 'Course Moderation', to: '/admin/moderation', icon: FileCheck },
    { label: 'Academic Categories', to: '/admin/categories', icon: FolderTree },
    { label: 'Activity Audit Logs', to: '/admin/activity', icon: Activity },
    { label: 'Platform Settings', to: '/admin/settings', icon: Settings }
  ];

  const links = role === 'ADMIN' ? adminLinks : role === 'INSTRUCTOR' ? instructorLinks : studentLinks;

  const roleLabel = role === 'ADMIN' ? 'Platform Admin' : role === 'INSTRUCTOR' ? 'Faculty Instructor' : 'Enrolled Student';
  const roleBadgeVariant = role === 'ADMIN' ? 'rose' : role === 'INSTRUCTOR' ? 'amber' : 'sky';

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-16 bottom-0 left-0 z-40 w-64 bg-slate-950/95 border-r border-surface-border flex flex-col justify-between transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex-1 overflow-y-auto px-4 py-5 space-y-6">
          {/* Mobile Header with close button */}
          <div className="flex items-center justify-between lg:hidden pb-3 border-b border-surface-border/50">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Navigation</span>
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Current Role Banner */}
          <div className="p-3.5 rounded-2xl bg-surface-subtle/80 border border-surface-border">
            <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Signed in as</p>
            <div className="flex items-center justify-between mt-1">
              <span className="text-sm font-bold text-slate-200">{roleLabel}</span>
              <Badge variant={roleBadgeVariant} size="sm">
                {role}
              </Badge>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="space-y-1">
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500 px-3 pb-2">
              Menu
            </p>
            {links.map((link) => {
              const Icon = link.icon;
              return (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={() => onClose && onClose()}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                      isActive
                        ? 'bg-brand-500 text-slate-950 shadow-md shadow-brand-500/15 font-bold'
                        : 'text-slate-300 hover:text-white hover:bg-surface-subtle'
                    }`
                  }
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{link.label}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer with Reset & Logout */}
        <div className="p-4 border-t border-surface-border/80 bg-slate-900/40 space-y-2">
          {/* Admin-only Reset Demo Data Button */}
          {role === 'ADMIN' && (
            <button
              onClick={() => setIsResetConfirmOpen(true)}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-amber-400 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/20 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Demo State</span>
            </button>
          )}

          <button
            onClick={() => setIsLogoutConfirmOpen(true)}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Reset Demo Data Confirmation Dialog */}
      <ConfirmDialog
        isOpen={isResetConfirmOpen}
        title="Reset All Demo Data?"
        message="This will immediately restore all original sample courses, mock users, enrollments, and activity logs to their fresh initial state. Ideal for starting a fresh demonstration."
        confirmText="Reset Entire Database"
        cancelText="Cancel"
        isDanger={true}
        isLoading={isResetting}
        onConfirm={handleResetDemoData}
        onCancel={() => setIsResetConfirmOpen(false)}
      />

      {/* Logout Confirmation */}
      <ConfirmDialog
        isOpen={isLogoutConfirmOpen}
        title="Sign Out Confirmation"
        message="Are you sure you want to end your current session?"
        confirmText="Sign Out"
        cancelText="Stay Signed In"
        isDanger={true}
        onConfirm={handleLogout}
        onCancel={() => setIsLogoutConfirmOpen(false)}
      />
    </>
  );
}
