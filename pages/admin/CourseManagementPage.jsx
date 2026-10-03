import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { courseService } from '../../services/courseService';
import { userService } from '../../services/userService';
import {
  BookOpen,
  Search,
  PlusCircle,
  Edit2,
  Trash2,
  Eye,
  UserCheck,
  CheckCircle2,
  XCircle,
  Layers,
  ArrowRight
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Input, Select } from '../../components/ui/Input';
import { Modal } from '../../components/ui/Modal';
import { ConfirmDialog } from '../../components/ui/ConfirmDialog';
import { Table } from '../../components/ui/EmptyState';
import { LoadingSkeleton } from '../../components/ui/LoadingSkeleton';

export function CourseManagementPage() {
  const { user: currentAdmin } = useAuth();
  const toast = useToast();

  const [courses, setCourses] = useState([]);
  const [instructors, setInstructors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  // Assign Instructor Modal
  const [reassignCourse, setReassignCourse] = useState(null);
  const [newInstructorId, setNewInstructorId] = useState('');

  // Delete Confirm
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [cList, insts] = await Promise.all([
        courseService.getCourses(),
        userService.getInstructors()
      ]);
      setCourses(cList);
      setInstructors(insts);
    } catch (err) {
      toast.error('Failed to load courses');
    } finally {
      setLoading(false);
    }
  };

  const handleTogglePublish = async (course) => {
    try {
      const updated = await courseService.togglePublish(course.id, currentAdmin);
      toast.success(`Course "${course.title}" is now ${updated.published ? 'Published' : 'Draft'}`);
      loadData();
    } catch (err) {
      toast.error('Failed to update status');
    }
  };

  const handleOpenReassign = (course) => {
    setReassignCourse(course);
    setNewInstructorId(course.instructorId || instructors[0]?.id || '');
  };

  const handleSaveReassign = async (e) => {
    e.preventDefault();
    if (!newInstructorId || !reassignCourse) return;

    const chosenInst = instructors.find(i => i.id === newInstructorId);
    if (!chosenInst) return;

    try {
      await courseService.updateCourse(reassignCourse.id, {
        instructorId: chosenInst.id,
        instructorName: chosenInst.name,
        instructorTitle: chosenInst.title,
        instructorAvatar: chosenInst.avatar
      }, currentAdmin);
      toast.success(`Assigned course to ${chosenInst.name}`);
      setReassignCourse(null);
      loadData();
    } catch (err) {
      toast.error('Failed to reassign instructor');
    }
  };

  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      await courseService.deleteCourse(deleteTarget.id, currentAdmin);
      toast.success(`Course "${deleteTarget.title}" deleted.`);
      setDeleteTarget(null);
      loadData();
    } catch (err) {
      toast.error('Failed to delete course');
    } finally {
      setIsDeleting(false);
    }
  };

  const filtered = courses.filter(c => {
    const matchesCat = selectedCategory === 'ALL' || c.category === selectedCategory;
    const matchesSearch =
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.instructorName.toLowerCase().includes(search.toLowerCase()) ||
      c.category.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-surface-border/60 pb-6">
        <div>
          <Badge variant="rose" size="sm" className="mb-2">Curriculum Governance</Badge>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Platform Course Directory
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Global management of all university and enterprise courses across departments
          </p>
        </div>
        <Link to="/instructor/courses/create">
          <Button variant="primary" size="md" leftIcon={<PlusCircle className="w-4 h-4" />}>
            Create Platform Course
          </Button>
        </Link>
      </div>

      {/* Filter Toolbar */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
        <div className="sm:col-span-8">
          <Input
            placeholder="Search courses by title or faculty instructor..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            icon={<Search className="w-4 h-4" />}
          />
        </div>
        <div className="sm:col-span-4">
          <Select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            options={[
              { label: 'All Categories', value: 'ALL' },
              { label: 'Software Engineering', value: 'Software Engineering' },
              { label: 'Computer Science', value: 'Computer Science' },
              { label: 'Web Development', value: 'Web Development' },
              { label: 'Data Science & AI', value: 'Data Science & AI' },
              { label: 'Cloud & DevOps', value: 'Cloud & DevOps' },
              { label: 'Cybersecurity', value: 'Cybersecurity' },
              { label: 'Databases & Systems', value: 'Databases & Systems' }
            ]}
          />
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <LoadingSkeleton variant="table" count={6} />
      ) : filtered.length === 0 ? (
        <div className="p-12 text-center rounded-2xl border border-dashed border-surface-border text-xs text-slate-400">
          No courses match current filter criteria.
        </div>
      ) : (
        <Table headers={['Curriculum Details', 'Assigned Faculty', 'Category & Level', 'Status', 'Actions']}>
          {filtered.map(c => (
            <tr key={c.id} className="hover:bg-slate-900/40 transition-colors">
              <td className="py-4 px-4">
                <div className="flex items-center gap-3">
                  <div className="w-16 h-10 rounded-lg overflow-hidden bg-slate-900 shrink-0">
                    <img src={c.thumbnail} alt={c.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-bold text-slate-200 text-xs sm:text-sm truncate max-w-xs sm:max-w-md">
                      {c.title}
                    </div>
                    <div className="text-[11px] text-slate-400">
                      {c.modules?.length || 0} modules • {c.studentsCount || 0} enrolled learners
                    </div>
                  </div>
                </div>
              </td>

              <td className="py-4 px-4 text-xs">
                <div className="font-semibold text-slate-200">{c.instructorName}</div>
                <button
                  onClick={() => handleOpenReassign(c)}
                  className="text-[11px] text-brand-400 hover:underline flex items-center gap-1 mt-0.5"
                >
                  <UserCheck className="w-3 h-3" />
                  <span>Reassign Faculty</span>
                </button>
              </td>

              <td className="py-4 px-4 text-xs text-slate-300">
                <div className="font-medium text-slate-200">{c.category}</div>
                <span className="text-[11px] text-slate-500">{c.difficulty}</span>
              </td>

              <td className="py-4 px-4">
                <button
                  onClick={() => handleTogglePublish(c)}
                  title="Click to toggle publish status"
                  className="focus:outline-none"
                >
                  <Badge variant={c.published ? 'emerald' : 'default'} size="sm">
                    {c.published ? 'Published' : 'Draft'}
                  </Badge>
                </button>
              </td>

              <td className="py-4 px-4 text-right">
                <div className="flex items-center justify-end gap-1.5">
                  <Link to={`/instructor/courses/${c.id}/builder`}>
                    <Button variant="ghost" size="sm" title="Curriculum Builder">
                      <Layers className="w-4 h-4 text-brand-400" />
                    </Button>
                  </Link>
                  <Link to={`/courses/${c.id}`}>
                    <Button variant="ghost" size="sm" title="Preview Syllabus">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </Link>
                  <button
                    onClick={() => setDeleteTarget(c)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                    title="Delete Course"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </Table>
      )}

      {/* Reassign Faculty Modal */}
      {reassignCourse && (
        <Modal
          isOpen={Boolean(reassignCourse)}
          onClose={() => setReassignCourse(null)}
          title={`Reassign Faculty: ${reassignCourse.title}`}
          size="sm"
        >
          <form onSubmit={handleSaveReassign} className="space-y-4">
            <Select
              label="Select Faculty Member"
              value={newInstructorId}
              onChange={(e) => setNewInstructorId(e.target.value)}
              options={instructors.map(i => ({ label: `${i.name} (${i.title})`, value: i.id }))}
            />
            <div className="flex justify-end gap-2 pt-2">
              <Button variant="secondary" onClick={() => setReassignCourse(null)}>
                Cancel
              </Button>
              <Button type="submit" variant="primary">
                Save Assignment
              </Button>
            </div>
          </form>
        </Modal>
      )}

      {/* Delete Course Confirm */}
      <ConfirmDialog
        isOpen={Boolean(deleteTarget)}
        title="Permanently Delete Course?"
        message={`Are you sure you want to permanently delete "${deleteTarget?.title}"? All student progress records and enrollments will be wiped.`}
        confirmText="Delete Course"
        cancelText="Cancel"
        isDanger={true}
        isLoading={isDeleting}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
