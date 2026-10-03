import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { enrollmentService } from '../../services/enrollmentService';
import {
  BookOpen,
  Search,
  PlayCircle,
  Trash2,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { ProgressBar } from '../../components/ui/ProgressBar';
import { EmptyState } from '../../components/ui/EmptyState';
import { ConfirmDialog } from '../../components/ui/ConfirmDialog';
import { LoadingSkeleton } from '../../components/ui/LoadingSkeleton';

export function MyCoursesPage() {
  const { user } = useAuth();
  const toast = useToast();

  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterTab, setFilterTab] = useState('all'); // 'all' | 'in-progress' | 'completed'
  const [search, setSearch] = useState('');

  // Unenroll dialog state
  const [unenrollTarget, setUnenrollTarget] = useState(null);
  const [isUnenrolling, setIsUnenrolling] = useState(false);

  useEffect(() => {
    loadEnrollments();
  }, [user]);

  const loadEnrollments = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const list = await enrollmentService.getStudentEnrollments(user.id);
      setEnrollments(list);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmUnenroll = async () => {
    if (!unenrollTarget) return;
    setIsUnenrolling(true);
    try {
      await enrollmentService.unenroll(user.id, unenrollTarget.courseId);
      toast.success(`Unenrolled from "${unenrollTarget.course.title}"`);
      setUnenrollTarget(null);
      await loadEnrollments();
    } catch (err) {
      toast.error('Failed to unenroll from course');
    } finally {
      setIsUnenrolling(false);
    }
  };

  const filtered = enrollments.filter(enr => {
    const matchesSearch =
      enr.course.title.toLowerCase().includes(search.toLowerCase()) ||
      enr.course.category?.toLowerCase().includes(search.toLowerCase());

    const isCompleted = enr.progressPercentage >= 100 || enr.status === 'completed';

    if (filterTab === 'in-progress') return matchesSearch && !isCompleted;
    if (filterTab === 'completed') return matchesSearch && isCompleted;
    return matchesSearch;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-surface-border/60 pb-6">
        <div>
          <Badge variant="amber" size="sm" className="mb-2">Student Enrollee Portal</Badge>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            My Courses
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Access active coursework, track completions, and manage course enrollments
          </p>
        </div>
        <Link to="/courses">
          <Button variant="primary" size="sm" rightIcon={<ArrowRight className="w-4 h-4" />}>
            Explore More Courses
          </Button>
        </Link>
      </div>

      {/* Tabs and Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Filter Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-surface-card border border-surface-border rounded-xl w-full sm:w-auto">
          <button
            onClick={() => setFilterTab('all')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              filterTab === 'all'
                ? 'bg-brand-500 text-slate-950 shadow-md shadow-brand-500/15'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            All Courses ({enrollments.length})
          </button>
          <button
            onClick={() => setFilterTab('in-progress')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              filterTab === 'in-progress'
                ? 'bg-brand-500 text-slate-950 shadow-md shadow-brand-500/15'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            In Progress ({enrollments.filter(e => (e.progressPercentage || 0) < 100).length})
          </button>
          <button
            onClick={() => setFilterTab('completed')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              filterTab === 'completed'
                ? 'bg-brand-500 text-slate-950 shadow-md shadow-brand-500/15'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Completed ({enrollments.filter(e => (e.progressPercentage || 0) >= 100).length})
          </button>
        </div>

        {/* Search Filter */}
        <div className="w-full sm:w-72">
          <Input
            placeholder="Filter my courses..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            icon={<Search className="w-4 h-4" />}
          />
        </div>
      </div>

      {/* Enrollments Grid */}
      {loading ? (
        <LoadingSkeleton variant="card" count={3} />
      ) : filtered.length === 0 ? (
        <EmptyState
          icon={<BookOpen className="w-8 h-8" />}
          title="No Enrolled Courses Found"
          description={
            search
              ? 'No courses match your active search keyword.'
              : filterTab === 'completed'
              ? 'You have not completed any courses yet. Keep learning to graduate!'
              : 'You are not enrolled in any courses right now.'
          }
          actionLabel={search ? 'Clear Search' : 'Browse Courses Catalog'}
          onAction={() => (search ? setSearch('') : window.location.href = '/courses')}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(enr => {
            const isCompleted = enr.progressPercentage >= 100;

            return (
              <div
                key={enr.id}
                className="flex flex-col bg-surface-card border border-surface-border rounded-2xl overflow-hidden hover:border-slate-600 transition-all duration-300 shadow-xl"
              >
                {/* Thumbnail Header */}
                <div className="relative aspect-video bg-slate-900 overflow-hidden">
                  <img
                    src={enr.course.thumbnail}
                    alt={enr.course.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <Badge variant="amber" size="sm">
                      {enr.course.category}
                    </Badge>
                    {isCompleted && (
                      <Badge variant="emerald" size="sm" icon={<CheckCircle2 className="w-3.5 h-3.5" />}>
                        Graduated
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-bold text-base text-white line-clamp-2 leading-snug">
                      {enr.course.title}
                    </h3>
                    <p className="text-xs text-slate-400">
                      Instructor: <span className="text-slate-300 font-semibold">{enr.course.instructorName}</span>
                    </p>
                  </div>

                  {/* Progress Info */}
                  <div className="space-y-1.5 pt-2 border-t border-surface-border/60">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400">Course Progress</span>
                      <span className="font-bold text-slate-200">{enr.progressPercentage}%</span>
                    </div>
                    <ProgressBar
                      progress={enr.progressPercentage}
                      showLabel={false}
                      variant={isCompleted ? 'emerald' : 'amber'}
                    />
                    <div className="text-[11px] text-slate-400 pt-1 flex items-center justify-between">
                      <span>{enr.completedCount} of {enr.totalLessons} lessons completed</span>
                      <span>{enr.course.duration}</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-3 border-t border-surface-border/60 flex items-center gap-2">
                    <Link to={`/learn/${enr.courseId}`} className="flex-1">
                      <Button
                        variant={isCompleted ? 'emerald' : 'primary'}
                        size="md"
                        className="w-full font-bold"
                        leftIcon={<PlayCircle className="w-4 h-4" />}
                      >
                        {isCompleted ? 'Review Course' : 'Continue Learning'}
                      </Button>
                    </Link>
                    <button
                      type="button"
                      onClick={() => setUnenrollTarget(enr)}
                      title="Unenroll from this course"
                      className="p-2.5 rounded-xl border border-surface-border bg-slate-900 hover:bg-rose-500/15 hover:text-rose-400 text-slate-400 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Unenroll Confirm Dialog */}
      <ConfirmDialog
        isOpen={Boolean(unenrollTarget)}
        title="Unenroll from Course?"
        message={`Are you sure you want to unenroll from "${unenrollTarget?.course?.title}"? Your recorded progress will be removed.`}
        confirmText="Confirm Unenroll"
        cancelText="Cancel"
        isDanger={true}
        isLoading={isUnenrolling}
        onConfirm={handleConfirmUnenroll}
        onCancel={() => setUnenrollTarget(null)}
      />
    </div>
  );
}
