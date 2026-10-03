import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { courseService } from '../../services/courseService';
import { activityService } from '../../services/activityService';
import { storageService } from '../../services/storageService';
import {
  BookOpen,
  Users,
  CheckCircle,
  PlusCircle,
  TrendingUp,
  BarChart3,
  Layers,
  ArrowRight,
  Eye,
  Edit,
  Clock,
  Sparkles
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { ProgressBar } from '../../components/ui/ProgressBar';
import { LoadingSkeleton } from '../../components/ui/LoadingSkeleton';

export function InstructorDashboardPage() {
  const { user } = useAuth();

  const [courses, setCourses] = useState([]);
  const [stats, setStats] = useState(null);
  const [recentActivities, setRecentActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      if (!user) return;
      setLoading(true);
      try {
        const [cList, iStats, acts] = await Promise.all([
          courseService.getCourses({ instructorId: user.id }),
          activityService.getInstructorStats(user.id),
          activityService.getActivities(6)
        ]);
        setCourses(cList);
        setStats(iStats);
        setRecentActivities(acts);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [user]);

  if (loading) {
    return <LoadingSkeleton variant="card" count={3} />;
  }

  return (
    <div className="space-y-8">
      {/* Studio Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-surface-card via-slate-900 to-surface-card border border-surface-border flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Badge variant="amber" size="sm">Faculty Studio</Badge>
            <Badge variant="default" size="sm">{user?.institution || 'Department of Computer Science'}</Badge>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Instructor Console — {user?.name}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
            Manage your academic courses, design curriculum modules, and monitor student cohort mastery in real time.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Link to="/instructor/courses/create">
            <Button variant="primary" size="md" leftIcon={<PlusCircle className="w-4 h-4" />}>
              Create Course
            </Button>
          </Link>
          <Link to="/instructor/analytics">
            <Button variant="secondary" size="md" leftIcon={<BarChart3 className="w-4 h-4" />}>
              Analytics
            </Button>
          </Link>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-surface-card border border-surface-border space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Total Courses</span>
            <BookOpen className="w-4 h-4 text-brand-400" />
          </div>
          <div className="text-2xl font-black text-white">{stats?.totalCourses || courses.length}</div>
          <div className="text-[11px] text-slate-400">
            {stats?.publishedCourses || 0} published • {stats?.draftCourses || 0} drafts
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-surface-card border border-surface-border space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Total Students</span>
            <Users className="w-4 h-4 text-sky-400" />
          </div>
          <div className="text-2xl font-black text-sky-400">{stats?.totalEnrollments || 0}</div>
          <div className="text-[11px] text-slate-400">Active learners across courses</div>
        </div>

        <div className="p-5 rounded-2xl bg-surface-card border border-surface-border space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Avg. Completion</span>
            <TrendingUp className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-emerald-400">{stats?.avgProgress || 0}%</div>
          <div className="text-[11px] text-slate-400">Cohort retention rate</div>
        </div>

        <div className="p-5 rounded-2xl bg-surface-card border border-surface-border space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Course Graduations</span>
            <CheckCircle className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-black text-amber-400">{stats?.completedStudents || 0}</div>
          <div className="text-[11px] text-slate-400">Certificates conferred</div>
        </div>
      </div>

      {/* Courses Performance Overview */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              My Authored Courses
            </h2>
            <p className="text-xs text-slate-400">Curricula authored and administered by your faculty profile</p>
          </div>
          <Link to="/instructor/courses" className="text-xs font-bold text-brand-400 hover:underline flex items-center gap-1">
            <span>Manage All ({courses.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map(course => (
            <div
              key={course.id}
              className="bg-surface-card border border-surface-border rounded-2xl overflow-hidden hover:border-slate-600 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-video bg-slate-900">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3">
                    <Badge variant={course.published ? 'emerald' : 'default'} size="sm">
                      {course.published ? 'Published' : 'Draft'}
                    </Badge>
                  </div>
                </div>

                <div className="p-5 space-y-2">
                  <h3 className="font-bold text-sm text-white line-clamp-2 leading-snug">
                    {course.title}
                  </h3>
                  <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
                    <span>{course.modules?.length || 0} modules</span>
                    <span>{course.studentsCount || 0} students</span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-slate-900/60 border-t border-surface-border/60 flex items-center gap-2">
                <Link to={`/instructor/courses/${course.id}/builder`} className="flex-1">
                  <Button variant="secondary" size="sm" className="w-full" leftIcon={<Layers className="w-3.5 h-3.5" />}>
                    Curriculum Builder
                  </Button>
                </Link>
                <Link to={`/instructor/courses/edit/${course.id}`}>
                  <Button variant="ghost" size="sm" title="Edit course metadata">
                    <Edit className="w-3.5 h-3.5" />
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Student Activity Feed */}
      <div className="bg-surface-card border border-surface-border rounded-2xl p-6 space-y-4">
        <h3 className="text-base font-bold text-white">Recent Learning Interactions</h3>
        <div className="divide-y divide-surface-border/50 text-xs">
          {recentActivities.map(act => (
            <div key={act.id} className="py-3 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-brand-500" />
                <span className="font-semibold text-slate-200">{act.user}</span>
                <span className="text-slate-400">{act.details}</span>
              </div>
              <span className="text-slate-500 text-[11px] shrink-0">
                {new Date(act.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
