import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { courseService } from '../../services/courseService';
import {
  PlusCircle,
  BookOpen,
  Edit,
  Trash2,
  Eye,
  Layers,
  Search,
  CheckCircle2,
  Clock,
  Users
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Input } from '../../components/ui/Input';
import { EmptyState } from '../../components/ui/EmptyState';
import { ConfirmDialog } from '../../components/ui/ConfirmDialog';
import { LoadingSkeleton } from '../../components/ui/LoadingSkeleton';

export function InstructorCoursesPage() {
  const { user } = useAuth();
  const toast = useToast();

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    loadCourses();
  }, [user]);

  const loadCourses = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const list = await courseService.getCourses({ instructorId: user.id });
      setCourses(list);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleTogglePublish = async (course) => {
    try {
      const updated = await courseService.togglePublish(course.id, user);
      toast.success(`Course "${course.title}" is now ${updated.published ? 'published' : 'saved as draft'}`);
      loadCourses();
    } catch (err) {
      toast.error('Failed to change publish status');
    }
  };

  const handleDeleteCourse = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      await courseService.deleteCourse(deleteTarget.id, user);
      toast.success(`Deleted course "${deleteTarget.title}"`);
      setDeleteTarget(null);
      loadCourses();
    } catch (err) {
      toast.error('Failed to delete course');
    } finally {
      setIsDeleting(false);
    }
  };

  const filtered = courses.filter(c =>
    c.title.toLowerCase().includes(search.toLowerCase()) ||
    c.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-surface-border/60 pb-6">
        <div>
          <Badge variant="amber" size="sm" className="mb-2">Course Management</Badge>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            My Authored Courses
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Author new curriculums, organize modules, and control publication status
          </p>
        </div>
        <Link to="/instructor/courses/create">
          <Button variant="primary" size="md" leftIcon={<PlusCircle className="w-4 h-4" />}>
            Create New Course
          </Button>
        </Link>
      </div>

      {/* Filter Bar */}
      <div className="flex items-center justify-between gap-4">
        <div className="w-full sm:w-80">
          <Input
            placeholder="Search my courses..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            icon={<Search className="w-4 h-4" />}
          />
        </div>
        <span className="text-xs text-slate-400">
          {filtered.length} courses total
        </span>
      </div>

      {/* Course List */}
      {loading ? (
        <LoadingSkeleton variant="table" count={4} />
      ) : filtered.length === 0 ? (
        <EmptyState
          icon={<BookOpen className="w-8 h-8" />}
          title="No Courses Found"
          description="You haven't authored any courses matching your criteria yet."
          actionLabel="Create Your First Course"
          onAction={() => window.location.href = '/instructor/courses/create'}
        />
      ) : (
        <div className="space-y-4">
          {filtered.map(course => (
            <div
              key={course.id}
              className="p-5 rounded-2xl bg-surface-card border border-surface-border flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 hover:border-slate-600 transition-all"
            >
              <div className="flex items-center gap-4 min-w-0">
                <div className="w-24 h-16 rounded-xl overflow-hidden bg-slate-900 shrink-0">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="space-y-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant={course.published ? 'emerald' : 'default'} size="sm">
                      {course.published ? 'Published' : 'Draft'}
                    </Badge>
                    <Badge variant="amber" size="sm">{course.category}</Badge>
                    <span className="text-[11px] text-slate-400">{course.difficulty}</span>
                  </div>
                  <h3 className="font-bold text-base text-white truncate max-w-lg">
                    {course.title}
                  </h3>
                  <div className="flex items-center gap-4 text-xs text-slate-400">
                    <span>{course.modules?.length || 0} modules</span>
                    <span>{course.studentsCount || 0} enrolled learners</span>
                    <span>Updated {course.updatedAt}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-2.5 w-full lg:w-auto justify-end pt-3 lg:pt-0 border-t lg:border-t-0 border-surface-border/60">
                {/* Publish Toggle Button */}
                <Button
                  variant={course.published ? 'secondary' : 'emerald'}
                  size="sm"
                  onClick={() => handleTogglePublish(course)}
                >
                  {course.published ? 'Unpublish' : 'Publish Course'}
                </Button>

                {/* Content Builder Button */}
                <Link to={`/instructor/courses/${course.id}/builder`}>
                  <Button variant="primary" size="sm" leftIcon={<Layers className="w-3.5 h-3.5" />}>
                    Curriculum Builder
                  </Button>
                </Link>

                {/* Edit Button */}
                <Link to={`/instructor/courses/edit/${course.id}`}>
                  <Button variant="ghost" size="sm" title="Edit course settings">
                    <Edit className="w-4 h-4" />
                  </Button>
                </Link>

                {/* View Course */}
                <Link to={`/courses/${course.id}`}>
                  <Button variant="ghost" size="sm" title="Preview public view">
                    <Eye className="w-4 h-4" />
                  </Button>
                </Link>

                {/* Delete Button */}
                <button
                  type="button"
                  onClick={() => setDeleteTarget(course)}
                  className="p-2 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                  title="Delete Course"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={Boolean(deleteTarget)}
        title="Delete Course Permanently?"
        message={`Are you sure you want to permanently delete "${deleteTarget?.title}"? All enrolled student records for this course will be purged.`}
        confirmText="Delete Course"
        cancelText="Cancel"
        isDanger={true}
        isLoading={isDeleting}
        onConfirm={handleDeleteCourse}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
