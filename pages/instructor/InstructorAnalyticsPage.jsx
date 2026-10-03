import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { courseService } from '../../services/courseService';
import { activityService } from '../../services/activityService';
import { storageService } from '../../services/storageService';
import {
  BarChart3,
  TrendingUp,
  Users,
  Award,
  BookOpen,
  CheckCircle,
  Clock,
  Sparkles
} from 'lucide-react';
import { Badge } from '../../components/ui/Badge';
import { ProgressBar } from '../../components/ui/ProgressBar';
import { LoadingSkeleton } from '../../components/ui/LoadingSkeleton';

export function InstructorAnalyticsPage() {
  const { user } = useAuth();

  const [courses, setCourses] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAnalytics() {
      if (!user) return;
      setLoading(true);
      try {
        const [cList, iStats] = await Promise.all([
          courseService.getCourses({ instructorId: user.id }),
          activityService.getInstructorStats(user.id)
        ]);
        setCourses(cList);
        setStats(iStats);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadAnalytics();
  }, [user]);

  if (loading) {
    return <LoadingSkeleton variant="card" count={3} />;
  }

  // Calculate highest enrollment for scaling bar charts
  const maxEnrollment = Math.max(...courses.map(c => c.studentsCount || 0), 10);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-surface-border/60 pb-6">
        <div>
          <Badge variant="amber" size="sm" className="mb-2">Faculty Intelligence</Badge>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Curriculum Analytics & Metrics
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Performance diagnostics, course popularity indices, and cohort retention metrics
          </p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-surface-card border border-surface-border space-y-1">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Total Enrolled Learners</span>
          <div className="text-2xl font-black text-white">{stats?.totalEnrollments || 0}</div>
          <span className="text-[11px] text-slate-500">Across {courses.length} courses</span>
        </div>

        <div className="p-5 rounded-2xl bg-surface-card border border-surface-border space-y-1">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Unique Learners</span>
          <div className="text-2xl font-black text-brand-400">{stats?.uniqueStudents || 0}</div>
          <span className="text-[11px] text-slate-500">Individual student accounts</span>
        </div>

        <div className="p-5 rounded-2xl bg-surface-card border border-surface-border space-y-1">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Average Completion Rate</span>
          <div className="text-2xl font-black text-emerald-400">{stats?.avgProgress || 0}%</div>
          <span className="text-[11px] text-slate-500">Course material consumed</span>
        </div>

        <div className="p-5 rounded-2xl bg-surface-card border border-surface-border space-y-1">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Conferred Graduations</span>
          <div className="text-2xl font-black text-sky-400">{stats?.completedStudents || 0}</div>
          <span className="text-[11px] text-slate-500">Certificates issued</span>
        </div>
      </div>

      {/* Course Popularity Visual Chart */}
      <div className="p-6 sm:p-8 rounded-3xl bg-surface-card border border-surface-border space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-white tracking-tight">
              Course Enrollment Breakdown
            </h2>
            <p className="text-xs text-slate-400">Comparative student enrollment distribution</p>
          </div>
          <Badge variant="amber" size="sm">Audited Cohorts</Badge>
        </div>

        <div className="space-y-5">
          {courses.map(course => {
            const count = course.studentsCount || 0;
            const barWidth = Math.round((count / maxEnrollment) * 100);

            return (
              <div key={course.id} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-200 truncate max-w-md">
                    {course.title}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400">{course.category}</span>
                    <span className="font-bold text-amber-400">{count} students</span>
                  </div>
                </div>

                <div className="w-full bg-slate-900 rounded-full h-3 p-0.5 border border-surface-border overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-amber-500 to-yellow-400 transition-all duration-700"
                    style={{ width: `${Math.max(5, barWidth)}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Student Engagement & Activity Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-surface-card border border-surface-border space-y-4">
          <h3 className="text-base font-bold text-white">Retention by Course Difficulty</h3>
          <div className="space-y-3 pt-2">
            <div>
              <div className="flex justify-between text-xs text-slate-300 mb-1">
                <span>Beginner Curricula</span>
                <span className="font-bold text-emerald-400">88% Completion</span>
              </div>
              <ProgressBar progress={88} showLabel={false} variant="emerald" />
            </div>
            <div>
              <div className="flex justify-between text-xs text-slate-300 mb-1">
                <span>Intermediate Curricula</span>
                <span className="font-bold text-sky-400">76% Completion</span>
              </div>
              <ProgressBar progress={76} showLabel={false} variant="sky" />
            </div>
            <div>
              <div className="flex justify-between text-xs text-slate-300 mb-1">
                <span>Advanced Systems Tracks</span>
                <span className="font-bold text-amber-400">64% Completion</span>
              </div>
              <ProgressBar progress={64} showLabel={false} variant="amber" />
            </div>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-surface-card border border-surface-border space-y-4">
          <h3 className="text-base font-bold text-white">Faculty Accreditation Standing</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Your curricula comply with the university’s rigorous distributed systems guidelines. All modules meet required minimum video streaming and code recitation standards.
          </p>
          <div className="p-4 rounded-xl bg-slate-900 border border-surface-border text-xs space-y-2">
            <div className="flex items-center justify-between text-slate-300">
              <span>Overall Instructor Rating:</span>
              <strong className="text-amber-400">4.92 / 5.0</strong>
            </div>
            <div className="flex items-center justify-between text-slate-300">
              <span>Peer Review Moderation:</span>
              <span className="text-emerald-400 font-semibold">100% Approved</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
