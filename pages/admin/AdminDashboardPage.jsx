import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { activityService } from '../../services/activityService';
import { storageService } from '../../services/storageService';
import {
  ShieldAlert,
  Users,
  GraduationCap,
  BookOpen,
  Award,
  TrendingUp,
  Activity,
  Layers,
  ArrowRight,
  UserCheck,
  RotateCcw,
  Sparkles,
  FileCheck
} from 'lucide-react';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { ProgressBar } from '../../components/ui/ProgressBar';
import { ConfirmDialog } from '../../components/ui/ConfirmDialog';
import { LoadingSkeleton } from '../../components/ui/LoadingSkeleton';

export function AdminDashboardPage() {
  const { user } = useAuth();

  const [stats, setStats] = useState(null);
  const [activities, setActivities] = useState([]);
  const [recentUsers, setRecentUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Demo reset state
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const [pStats, acts] = await Promise.all([
          activityService.getPlatformStats(),
          activityService.getActivities(8)
        ]);
        setStats(pStats);
        setActivities(acts);

        const users = storageService.getUsers();
        setRecentUsers(users.slice(0, 5));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleResetData = () => {
    setIsResetting(true);
    storageService.resetAllDemoData();
    setIsResetting(false);
    setIsResetConfirmOpen(false);
    window.location.reload();
  };

  if (loading) {
    return <LoadingSkeleton variant="card" count={4} />;
  }

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-surface-card via-slate-900 to-surface-card border border-rose-500/30 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-2xl">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Badge variant="rose" size="sm">System Administration Command</Badge>
            <Badge variant="emerald" size="sm">All Services Operational</Badge>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Administrator Console — {user?.name}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
            Global authority over academic cohorts, faculty appointment credentials, course accreditation, and institutional audit trails.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Button
            variant="danger"
            size="md"
            onClick={() => setIsResetConfirmOpen(true)}
            leftIcon={<RotateCcw className="w-4 h-4" />}
          >
            Reset Demo Data
          </Button>
          <Link to="/admin/users">
            <Button variant="secondary" size="md">
              User Directory
            </Button>
          </Link>
        </div>
      </div>

      {/* Global Statistics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-surface-card border border-surface-border space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Total Users</span>
            <Users className="w-4 h-4 text-sky-400" />
          </div>
          <div className="text-2xl font-black text-white">{stats?.totalUsers || 0}</div>
          <div className="text-[11px] text-slate-400">
            {stats?.totalStudents || 0} students • {stats?.totalInstructors || 0} faculty
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-surface-card border border-surface-border space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Total Courses</span>
            <BookOpen className="w-4 h-4 text-brand-400" />
          </div>
          <div className="text-2xl font-black text-brand-400">{stats?.totalCourses || 0}</div>
          <div className="text-[11px] text-slate-400">
            {stats?.publishedCourses || 0} published • {stats?.draftCourses || 0} drafts
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-surface-card border border-surface-border space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Total Enrollments</span>
            <GraduationCap className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-emerald-400">{stats?.totalEnrollments || 0}</div>
          <div className="text-[11px] text-slate-400">{stats?.completedEnrollments || 0} graduates</div>
        </div>

        <div className="p-5 rounded-2xl bg-surface-card border border-surface-border space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Completion Rate</span>
            <TrendingUp className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-black text-amber-400">{stats?.completionRate || 0}%</div>
          <div className="text-[11px] text-slate-400">Platform-wide benchmark</div>
        </div>
      </div>

      {/* Course Moderation & Platform Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-surface-card border border-surface-border space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white">Course Moderation</h3>
            <Badge variant="amber" size="sm">{stats?.pendingCourses || 0} Pending</Badge>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Faculty submissions awaiting academic review and compliance checks before catalog indexing.
          </p>
          <Link to="/admin/moderation">
            <Button variant="primary" size="sm" className="w-full" rightIcon={<ArrowRight className="w-4 h-4" />}>
              Review Course Queue
            </Button>
          </Link>
        </div>

        <div className="p-6 rounded-2xl bg-surface-card border border-surface-border space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white">Faculty Credentials</h3>
            <Badge variant="sky" size="sm">{stats?.totalInstructors || 0} Active</Badge>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Oversee department appointments, verify curriculum rigor, and audit faculty performance scores.
          </p>
          <Link to="/admin/instructors">
            <Button variant="secondary" size="sm" className="w-full" rightIcon={<ArrowRight className="w-4 h-4" />}>
              Manage Instructors
            </Button>
          </Link>
        </div>

        <div className="p-6 rounded-2xl bg-surface-card border border-surface-border space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white">Academic Taxonomies</h3>
            <Badge variant="emerald" size="sm">{stats?.totalCategories || 0} Disciplines</Badge>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Configure learning tracks, computer science categories, and cross-disciplinary tags.
          </p>
          <Link to="/admin/categories">
            <Button variant="secondary" size="sm" className="w-full" rightIcon={<ArrowRight className="w-4 h-4" />}>
              Configure Taxonomies
            </Button>
          </Link>
        </div>
      </div>

      {/* Real-time Activity Logs & Recent Registrations */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left 7 cols: Audit Log */}
        <div className="lg:col-span-7 bg-surface-card border border-surface-border rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white">Real-Time Platform Audit Log</h3>
              <p className="text-xs text-slate-400">Audited events across accounts and course actions</p>
            </div>
            <Link to="/admin/activity" className="text-xs font-bold text-brand-400 hover:underline">
              View All
            </Link>
          </div>

          <div className="divide-y divide-surface-border/50 text-xs">
            {activities.map(act => (
              <div key={act.id} className="py-3 flex items-start justify-between gap-4">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-200">{act.user}</span>
                    <Badge
                      variant={
                        act.role === 'ADMIN' ? 'rose' : act.role === 'INSTRUCTOR' ? 'amber' : 'sky'
                      }
                      size="sm"
                    >
                      {act.role}
                    </Badge>
                  </div>
                  <p className="text-slate-400">{act.details}</p>
                </div>
                <span className="text-[11px] text-slate-500 whitespace-nowrap">
                  {new Date(act.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right 5 cols: Recent User Directory */}
        <div className="lg:col-span-5 bg-surface-card border border-surface-border rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white">Recent Accounts</h3>
              <p className="text-xs text-slate-400">Newly registered members</p>
            </div>
            <Link to="/admin/users" className="text-xs font-bold text-brand-400 hover:underline">
              Directory
            </Link>
          </div>

          <div className="space-y-3">
            {recentUsers.map(u => (
              <div key={u.id} className="p-3 rounded-xl bg-slate-900 border border-surface-border flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <div className="font-bold text-xs text-white truncate">{u.name}</div>
                  <div className="text-[11px] text-slate-400 truncate">{u.email}</div>
                </div>
                <Badge
                  variant={
                    u.role === 'ADMIN' ? 'rose' : u.role === 'INSTRUCTOR' ? 'amber' : 'sky'
                  }
                  size="sm"
                >
                  {u.role}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Reset Confirmation Dialog */}
      <ConfirmDialog
        isOpen={isResetConfirmOpen}
        title="Reset Entire Platform State?"
        message="This restores all initial mock courses, faculty instructors, enrolled students, modules, and platform settings to their original factory demo state. Ideal for college project evaluators."
        confirmText="Reset Entire Database"
        cancelText="Cancel"
        isDanger={true}
        isLoading={isResetting}
        onConfirm={handleResetData}
        onCancel={() => setIsResetConfirmOpen(false)}
      />
    </div>
  );
}
