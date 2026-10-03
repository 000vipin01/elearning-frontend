import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { enrollmentService } from '../../services/enrollmentService';
import { progressService } from '../../services/progressService';
import { courseService } from '../../services/courseService';
import {
  PlayCircle,
  Clock,
  BookOpen,
  ArrowRight,
  TrendingUp,
  Award,
  Compass
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { ProgressBar } from '../../components/ui/ProgressBar';
import { CourseCard } from '../../components/ui/CourseCard';
import { LoadingSkeleton } from '../../components/ui/LoadingSkeleton';
import { EmptyState } from '../../components/ui/EmptyState';

export function StudentDashboardPage() {
  const { user } = useAuth();

  const [enrollments, setEnrollments] = useState([]);
  const [stats, setStats] = useState(null);
  const [recommendedCourses, setRecommendedCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboard() {
      if (!user) return;
      setLoading(true);
      try {
        const [enrs, studentStats, allCourses] = await Promise.all([
          enrollmentService.getStudentEnrollments(user.id),
          progressService.getStudentStats(user.id),
          courseService.getCourses({ publishedOnly: true })
        ]);
        setEnrollments(enrs);
        setStats(studentStats);

        // Filter out courses student is already enrolled in
        const enrolledIds = new Set(enrs.map(e => e.courseId));
        const unEnrolled = allCourses.filter(c => !enrolledIds.has(c.id));
        setRecommendedCourses(unEnrolled.slice(0, 3));
      } catch (err) {
        console.error('Error loading student dashboard:', err);
      } finally {
        setLoading(false);
      }
    }
    loadDashboard();
  }, [user]);

  if (loading) {
    return <LoadingSkeleton variant="card" count={3} />;
  }

  // Find most recent course with < 100% progress
  const continueLearningEnr = enrollments.find(e => (e.progressPercentage || 0) < 100) || enrollments[0];

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-surface-card via-slate-900 to-surface-card border border-surface-border p-6 sm:p-8">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Badge variant="sky" size="sm">Academic Session Spring 2026</Badge>
              <Badge variant="amber" size="sm">{user?.major || 'Computer Science'}</Badge>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Welcome back, {user?.name}! 👋
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
              Track your coursework milestones, resume unfinished modules, and work toward your software engineering accreditations.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link to="/courses">
              <Button variant="primary" size="md" rightIcon={<Compass className="w-4 h-4" />}>
                Browse Catalog
              </Button>
            </Link>
            <Link to="/student/progress">
              <Button variant="secondary" size="md">
                My Transcripts
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-surface-card border border-surface-border space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Enrolled Courses</span>
            <BookOpen className="w-4 h-4 text-sky-400" />
          </div>
          <div className="text-2xl font-black text-white">{stats?.totalEnrolled || 0}</div>
          <div className="text-[11px] text-slate-400">{stats?.inProgress || 0} in active progress</div>
        </div>

        <div className="p-5 rounded-2xl bg-surface-card border border-surface-border space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Completed Tracks</span>
            <Award className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-emerald-400">{stats?.completedCourses || 0}</div>
          <div className="text-[11px] text-slate-400">Verified credentials earned</div>
        </div>

        <div className="p-5 rounded-2xl bg-surface-card border border-surface-border space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Hours Learned</span>
            <Clock className="w-4 h-4 text-brand-400" />
          </div>
          <div className="text-2xl font-black text-brand-400">{stats?.hoursSpent || 0}h</div>
          <div className="text-[11px] text-slate-400">{stats?.totalLessonsFinished || 0} lessons completed</div>
        </div>

        <div className="p-5 rounded-2xl bg-surface-card border border-surface-border space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Average Progress</span>
            <TrendingUp className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-black text-amber-400">{stats?.averageProgress || 0}%</div>
          <div className="text-[11px] text-slate-400">Across enrolled curriculum</div>
        </div>
      </div>

      {/* Continue Learning Featured Box */}
      {continueLearningEnr && (
        <div className="p-6 rounded-3xl bg-surface-card border border-brand-500/30 glow-amber relative">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
              <div className="w-28 h-20 rounded-2xl overflow-hidden bg-slate-900 shrink-0">
                <img
                  src={continueLearningEnr.course.thumbnail}
                  alt={continueLearningEnr.course.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Badge variant="amber" size="sm">Resume Learning</Badge>
                  <span className="text-xs text-slate-400">{continueLearningEnr.course.category}</span>
                </div>
                <h3 className="text-lg font-bold text-white">
                  {continueLearningEnr.course.title}
                </h3>
                <p className="text-xs text-slate-400">
                  {continueLearningEnr.completedCount} of {continueLearningEnr.totalLessons} lessons completed
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 lg:w-80">
              <div className="w-full">
                <ProgressBar progress={continueLearningEnr.progressPercentage} variant="amber" />
              </div>
              <Link to={`/learn/${continueLearningEnr.courseId}`} className="w-full sm:w-auto shrink-0">
                <Button variant="primary" size="md" leftIcon={<PlayCircle className="w-4 h-4" />}>
                  Resume
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Active Enrolled Courses */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              My Enrolled Courses
            </h2>
            <p className="text-xs text-slate-400">Curricula currently active in your study plan</p>
          </div>
          <Link to="/student/my-courses" className="text-xs font-semibold text-brand-400 hover:underline flex items-center gap-1">
            <span>View All ({enrollments.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {enrollments.length === 0 ? (
          <EmptyState
            icon={<BookOpen className="w-8 h-8" />}
            title="No Courses Enrolled Yet"
            description="Explore our academic courses and enroll in computer science and software engineering masterclasses."
            actionLabel="Browse Courses"
            onAction={() => window.location.href = '/courses'}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {enrollments.slice(0, 3).map(enr => (
              <CourseCard
                key={enr.id}
                course={enr.course}
                enrollment={enr}
              />
            ))}
          </div>
        )}
      </div>

      {/* Recommended Courses */}
      {recommendedCourses.length > 0 && (
        <div className="space-y-4 pt-4 border-t border-surface-border/60">
          <div>
            <Badge variant="sky" size="sm" className="mb-1">Recommended Tracks</Badge>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Suggested for Your Engineering Pathway
            </h2>
            <p className="text-xs text-slate-400">Expand your core skill matrix with complementary courses</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendedCourses.map(course => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
