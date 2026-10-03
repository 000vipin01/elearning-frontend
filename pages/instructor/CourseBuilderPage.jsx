import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { courseService } from '../../services/courseService';
import {
  ArrowLeft,
  PlusCircle,
  Layers,
  Edit2,
  Trash2,
  ChevronUp,
  ChevronDown,
  PlayCircle,
  FileText,
  Eye,
  CheckCircle2,
  Video,
  Save,
  Clock
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Input, Select, TextArea } from '../../components/ui/Input';
import { Modal } from '../../components/ui/Modal';
import { ConfirmDialog } from '../../components/ui/ConfirmDialog';
import { LoadingSkeleton } from '../../components/ui/LoadingSkeleton';

export function CourseBuilderPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  // Module modal state
  const [isModuleModalOpen, setIsModuleModalOpen] = useState(false);
  const [editingModule, setEditingModule] = useState(null);
  const [moduleTitle, setModuleTitle] = useState('');

  // Lesson modal state
  const [isLessonModalOpen, setIsLessonModalOpen] = useState(false);
  const [targetModuleId, setTargetModuleId] = useState(null);
  const [editingLesson, setEditingLesson] = useState(null);
  const [lessonForm, setLessonForm] = useState({
    title: '',
    duration: '20 min',
    type: 'text',
    videoUrl: '',
    summary: '',
    content: '',
    isPreview: false
  });

  // Delete confirmations
  const [deleteModuleTarget, setDeleteModuleTarget] = useState(null);
  const [deleteLessonTarget, setDeleteLessonTarget] = useState(null);

  useEffect(() => {
    loadCourseData();
  }, [id, user]);

  const loadCourseData = async () => {
    setLoading(true);
    try {
      const found = await courseService.getCourseById(id);
      // Verify ownership
      if (user.role === 'INSTRUCTOR' && found.instructorId !== user.id) {
        toast.error('You are only authorized to manage content for your own courses.');
        navigate('/instructor/courses');
        return;
      }
      setCourse(found);
    } catch (err) {
      toast.error('Course not found');
      navigate('/instructor/courses');
    } finally {
      setLoading(false);
    }
  };

  // --- MODULE ACTIONS ---
  const handleOpenAddModule = () => {
    setEditingModule(null);
    setModuleTitle('');
    setIsModuleModalOpen(true);
  };

  const handleOpenEditModule = (mod) => {
    setEditingModule(mod);
    setModuleTitle(mod.title);
    setIsModuleModalOpen(true);
  };

  const handleSaveModule = async (e) => {
    e.preventDefault();
    if (!moduleTitle.trim()) return;

    try {
      if (editingModule) {
        await courseService.updateModule(course.id, editingModule.id, { title: moduleTitle.trim() }, user);
        toast.success('Module title updated');
      } else {
        await courseService.addModule(course.id, moduleTitle.trim(), user);
        toast.success('New module added to curriculum');
      }
      setIsModuleModalOpen(false);
      loadCourseData();
    } catch (err) {
      toast.error('Failed to save module');
    }
  };

  const handleConfirmDeleteModule = async () => {
    if (!deleteModuleTarget) return;
    try {
      await courseService.deleteModule(course.id, deleteModuleTarget.id, user);
      toast.success('Module deleted');
      setDeleteModuleTarget(null);
      loadCourseData();
    } catch (err) {
      toast.error('Failed to delete module');
    }
  };

  const handleMoveModule = async (index, direction) => {
    const modules = [...(course.modules || [])];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= modules.length) return;

    const temp = modules[index];
    modules[index] = modules[targetIndex];
    modules[targetIndex] = temp;

    // Update order values
    const reordered = modules.map((m, i) => ({ ...m, order: i + 1 }));
    try {
      await courseService.reorderModules(course.id, reordered, user);
      loadCourseData();
    } catch (err) {
      toast.error('Failed to reorder modules');
    }
  };

  // --- LESSON ACTIONS ---
  const handleOpenAddLesson = (moduleId) => {
    setTargetModuleId(moduleId);
    setEditingLesson(null);
    setLessonForm({
      title: '',
      duration: '20 min',
      type: 'text',
      videoUrl: '',
      summary: '',
      content: '### Lecture Notes\n\nEnter code snippets, theoretical background, and explanations here.\n\n```python\n# Sample Code Block\ndef solve():\n    pass\n```',
      isPreview: false
    });
    setIsLessonModalOpen(true);
  };

  const handleOpenEditLesson = (moduleId, lesson) => {
    setTargetModuleId(moduleId);
    setEditingLesson(lesson);
    setLessonForm({
      title: lesson.title || '',
      duration: lesson.duration || '20 min',
      type: lesson.type || 'text',
      videoUrl: lesson.videoUrl || '',
      summary: lesson.summary || '',
      content: lesson.content || '',
      isPreview: Boolean(lesson.isPreview)
    });
    setIsLessonModalOpen(true);
  };

  const handleSaveLesson = async (e) => {
    e.preventDefault();
    if (!lessonForm.title.trim()) return;

    try {
      if (editingLesson) {
        await courseService.updateLesson(course.id, targetModuleId, editingLesson.id, lessonForm, user);
        toast.success('Lesson updated successfully');
      } else {
        await courseService.addLesson(course.id, targetModuleId, lessonForm, user);
        toast.success('New lesson added to module');
      }
      setIsLessonModalOpen(false);
      loadCourseData();
    } catch (err) {
      toast.error('Failed to save lesson');
    }
  };

  const handleConfirmDeleteLesson = async () => {
    if (!deleteLessonTarget) return;
    try {
      await courseService.deleteLesson(course.id, deleteLessonTarget.moduleId, deleteLessonTarget.lessonId, user);
      toast.success('Lesson removed');
      setDeleteLessonTarget(null);
      loadCourseData();
    } catch (err) {
      toast.error('Failed to delete lesson');
    }
  };

  const handleMoveLesson = async (moduleId, lessonIndex, direction) => {
    const mod = course.modules.find(m => m.id === moduleId);
    if (!mod) return;

    const lessons = [...(mod.lessons || [])];
    const targetIdx = direction === 'up' ? lessonIndex - 1 : lessonIndex + 1;
    if (targetIdx < 0 || targetIdx >= lessons.length) return;

    const temp = lessons[lessonIndex];
    lessons[lessonIndex] = lessons[targetIdx];
    lessons[targetIdx] = temp;

    try {
      await courseService.updateModule(course.id, moduleId, { lessons }, user);
      loadCourseData();
    } catch (err) {
      toast.error('Failed to reorder lessons');
    }
  };

  if (loading || !course) {
    return (
      <div className="max-w-5xl mx-auto p-8 animate-pulse space-y-4">
        <div className="h-8 bg-slate-800 rounded w-1/3" />
        <div className="h-64 bg-slate-800/60 rounded-2xl" />
      </div>
    );
  }

  let totalLessons = 0;
  course.modules?.forEach(m => {
    totalLessons += (m.lessons || []).length;
  });

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-surface-border/60 pb-6">
        <div className="flex items-center gap-3">
          <Link
            to="/instructor/courses"
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <Badge variant="amber" size="sm">Content Builder Studio</Badge>
              <Badge variant={course.published ? 'emerald' : 'default'} size="sm">
                {course.published ? 'Published' : 'Draft'}
              </Badge>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
              {course.title}
            </h1>
            <p className="text-xs text-slate-400">
              {course.modules?.length || 0} Modules • {totalLessons} Lessons Total
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link to={`/courses/${course.id}`} target="_blank">
            <Button variant="secondary" size="sm" leftIcon={<Eye className="w-4 h-4" />}>
              Preview Student View
            </Button>
          </Link>
          <Button
            variant="primary"
            size="sm"
            onClick={handleOpenAddModule}
            leftIcon={<PlusCircle className="w-4 h-4" />}
          >
            Add Module
          </Button>
        </div>
      </div>

      {/* Modules List */}
      <div className="space-y-6">
        {course.modules?.length === 0 ? (
          <div className="p-12 text-center rounded-3xl border border-dashed border-surface-border bg-surface-card/40 space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-brand-500/10 text-brand-400 flex items-center justify-center mx-auto">
              <Layers className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold text-white">No Curriculum Modules Yet</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Begin structuring your course by adding your first academic module.
            </p>
            <Button variant="primary" size="md" onClick={handleOpenAddModule}>
              Create First Module
            </Button>
          </div>
        ) : (
          course.modules?.map((mod, modIdx) => (
            <div
              key={mod.id}
              className="bg-surface-card border border-surface-border rounded-2xl overflow-hidden shadow-xl"
            >
              {/* Module Header Bar */}
              <div className="p-4 sm:p-5 bg-slate-900/80 border-b border-surface-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex flex-col gap-0.5">
                    <button
                      onClick={() => handleMoveModule(modIdx, 'up')}
                      disabled={modIdx === 0}
                      className="p-1 text-slate-400 hover:text-white disabled:opacity-30 disabled:hover:text-slate-400"
                      title="Move Module Up"
                    >
                      <ChevronUp className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleMoveModule(modIdx, 'down')}
                      disabled={modIdx === (course.modules?.length || 1) - 1}
                      className="p-1 text-slate-400 hover:text-white disabled:opacity-30 disabled:hover:text-slate-400"
                      title="Move Module Down"
                    >
                      <ChevronDown className="w-4 h-4" />
                    </button>
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-brand-400">
                        Module {modIdx + 1}
                      </span>
                      <span className="text-xs text-slate-400">• {(mod.lessons || []).length} lessons</span>
                    </div>
                    <h3 className="font-bold text-base text-white">{mod.title}</h3>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-auto">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => handleOpenAddLesson(mod.id)}
                    leftIcon={<PlusCircle className="w-3.5 h-3.5 text-brand-400" />}
                  >
                    Add Lesson
                  </Button>
                  <button
                    onClick={() => handleOpenEditModule(mod)}
                    className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                    title="Edit Module Title"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setDeleteModuleTarget(mod)}
                    className="p-2 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                    title="Delete Module"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Lessons Inside Module */}
              <div className="divide-y divide-surface-border/50">
                {(mod.lessons || []).length === 0 ? (
                  <div className="p-6 text-center text-xs text-slate-400">
                    No lessons in this module. Click "Add Lesson" above to attach lecture notes or videos.
                  </div>
                ) : (
                  mod.lessons?.map((lesson, lesIdx) => (
                    <div
                      key={lesson.id}
                      className="p-4 sm:px-6 flex items-center justify-between gap-4 hover:bg-slate-900/30 transition-colors"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="flex flex-col gap-0.5 shrink-0">
                          <button
                            onClick={() => handleMoveLesson(mod.id, lesIdx, 'up')}
                            disabled={lesIdx === 0}
                            className="p-0.5 text-slate-500 hover:text-white disabled:opacity-20"
                          >
                            <ChevronUp className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleMoveLesson(mod.id, lesIdx, 'down')}
                            disabled={lesIdx === (mod.lessons?.length || 1) - 1}
                            className="p-0.5 text-slate-500 hover:text-white disabled:opacity-20"
                          >
                            <ChevronDown className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="p-2 rounded-lg bg-slate-900 border border-surface-border text-slate-300 shrink-0">
                          {lesson.type === 'video' ? (
                            <Video className="w-4 h-4 text-brand-400" />
                          ) : (
                            <FileText className="w-4 h-4 text-sky-400" />
                          )}
                        </div>

                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-white truncate">
                              {lesson.title}
                            </span>
                            {lesson.isPreview && (
                              <Badge variant="emerald" size="sm">Free Preview</Badge>
                            )}
                          </div>
                          <span className="text-[11px] text-slate-400">
                            {lesson.duration} • {lesson.type === 'video' ? 'Video Lecture' : 'Text & Code'}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => handleOpenEditLesson(mod.id, lesson)}
                          className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                          title="Edit Lesson"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeleteLessonTarget({ moduleId: mod.id, lessonId: lesson.id, title: lesson.title })}
                          className="p-2 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                          title="Delete Lesson"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Module Add/Edit Modal */}
      <Modal
        isOpen={isModuleModalOpen}
        onClose={() => setIsModuleModalOpen(false)}
        title={editingModule ? 'Edit Module Title' : 'Add New Module'}
        size="sm"
      >
        <form onSubmit={handleSaveModule} className="space-y-4">
          <Input
            label="Module Title"
            value={moduleTitle}
            onChange={(e) => setModuleTitle(e.target.value)}
            placeholder="e.g. Module 3: Advanced Memory Management"
            required
            autoFocus
          />
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="secondary" onClick={() => setIsModuleModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Save Module
            </Button>
          </div>
        </form>
      </Modal>

      {/* Lesson Add/Edit Modal */}
      <Modal
        isOpen={isLessonModalOpen}
        onClose={() => setIsLessonModalOpen(false)}
        title={editingLesson ? 'Edit Lesson Content' : 'Add Lesson to Module'}
        size="lg"
      >
        <form onSubmit={handleSaveLesson} className="space-y-4">
          <Input
            label="Lesson Title"
            value={lessonForm.title}
            onChange={(e) => setLessonForm({ ...lessonForm, title: e.target.value })}
            placeholder="e.g. 1.2 Virtual Memory & Cache Coherence"
            required
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Estimated Duration"
              value={lessonForm.duration}
              onChange={(e) => setLessonForm({ ...lessonForm, duration: e.target.value })}
              placeholder="e.g. 25 min"
            />

            <Select
              label="Lesson Content Medium"
              value={lessonForm.type}
              onChange={(e) => setLessonForm({ ...lessonForm, type: e.target.value })}
              options={[
                { label: 'Rich Text & Code Snippets', value: 'text' },
                { label: 'Video Lecture Stream', value: 'video' }
              ]}
            />
          </div>

          {lessonForm.type === 'video' && (
            <Input
              label="Video Embed URL (YouTube or MP4)"
              value={lessonForm.videoUrl}
              onChange={(e) => setLessonForm({ ...lessonForm, videoUrl: e.target.value })}
              placeholder="https://www.youtube.com/embed/..."
            />
          )}

          <Input
            label="Short Summary"
            value={lessonForm.summary}
            onChange={(e) => setLessonForm({ ...lessonForm, summary: e.target.value })}
            placeholder="Brief 1-2 sentence concept overview"
          />

          <TextArea
            label="Detailed Lecture Notes & Code (Markdown Supported)"
            value={lessonForm.content}
            onChange={(e) => setLessonForm({ ...lessonForm, content: e.target.value })}
            rows={8}
            placeholder="Write complete lecture material with code blocks..."
          />

          <div className="p-3 rounded-xl bg-slate-900 border border-surface-border flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-white">Free Preview Lecture</span>
              <p className="text-[11px] text-slate-400">Allow prospective students to inspect this lesson before enrolling</p>
            </div>
            <input
              type="checkbox"
              checked={lessonForm.isPreview}
              onChange={(e) => setLessonForm({ ...lessonForm, isPreview: e.target.checked })}
              className="rounded bg-slate-800 border-surface-border text-brand-500 w-4 h-4 cursor-pointer"
            />
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t border-surface-border/60">
            <Button variant="secondary" onClick={() => setIsLessonModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" leftIcon={<Save className="w-4 h-4" />}>
              Save Lesson Content
            </Button>
          </div>
        </form>
      </Modal>

      {/* Delete Module Confirm */}
      <ConfirmDialog
        isOpen={Boolean(deleteModuleTarget)}
        title="Delete Curriculum Module?"
        message={`Are you sure you want to delete "${deleteModuleTarget?.title}"? All ${(deleteModuleTarget?.lessons || []).length} lessons within will also be removed.`}
        confirmText="Delete Module"
        cancelText="Cancel"
        isDanger={true}
        onConfirm={handleConfirmDeleteModule}
        onCancel={() => setDeleteModuleTarget(null)}
      />

      {/* Delete Lesson Confirm */}
      <ConfirmDialog
        isOpen={Boolean(deleteLessonTarget)}
        title="Delete Lesson?"
        message={`Are you sure you want to remove lesson "${deleteLessonTarget?.title}"?`}
        confirmText="Delete Lesson"
        cancelText="Cancel"
        isDanger={true}
        onConfirm={handleConfirmDeleteLesson}
        onCancel={() => setDeleteLessonTarget(null)}
      />
    </div>
  );
}
