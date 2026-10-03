import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { courseService } from '../../services/courseService';
import {
  FileCheck,
  CheckCircle2,
  XCircle,
  Eye,
  AlertTriangle,
  Clock,
  Layers
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { TextArea } from '../../components/ui/Input';
import { Table } from '../../components/ui/EmptyState';
import { LoadingSkeleton } from '../../components/ui/LoadingSkeleton';

export function CourseModerationPage() {
  const { user: currentAdmin } = useAuth();
  const toast = useToast();

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  // Moderation action modal
  const [actionTarget, setActionTarget] = useState(null); // { course, action: 'approved' | 'rejected' }
  const [moderationNote, setModerationNote] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    setLoading(true);
    try {
      const list = await courseService.getCourses();
      setCourses(list);
    } catch (err) {
      toast.error('Failed to load courses');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModeration = (course, action) => {
    setActionTarget({ course, action });
    setModerationNote(
      action === 'approved'
        ? 'Curriculum syllabus verified. Compliant with university accreditation standards.'
        : 'Requires additional module recitation and updated video lecture links.'
    );
  };

  const handleConfirmModeration = async (e) => {
    e.preventDefault();
    if (!actionTarget) return;

    setSubmitting(true);
    try {
      await courseService.moderateCourse(actionTarget.course.id, actionTarget.action, currentAdmin);
      toast.success(`Course "${actionTarget.course.title}" status set to ${actionTarget.action}!`);
      setActionTarget(null);
      loadCourses();
    } catch (err) {
      toast.error('Failed to update moderation state');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-surface-border/60 pb-6">
        <div>
          <Badge variant="rose" size="sm" className="mb-2">Quality & Compliance</Badge>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Curriculum Moderation Queue
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Review faculty submitted syllabi, evaluate learning objectives, and grant institutional publication approval
          </p>
        </div>
      </div>

      {/* Moderation Table */}
      {loading ? (
        <LoadingSkeleton variant="table" count={5} />
      ) : (
        <Table headers={['Course Title', 'Author Faculty', 'Modules & Lessons', 'Moderation State', 'Review Actions']}>
          {courses.map(c => {
            let totalLessons = 0;
            c.modules?.forEach(m => totalLessons += (m.lessons || []).length);
            const status = c.moderationStatus || 'approved';

            return (
              <tr key={c.id} className="hover:bg-slate-900/40 transition-colors">
                <td className="py-4 px-4">
                  <div className="font-bold text-white text-xs sm:text-sm">{c.title}</div>
                  <span className="text-[11px] text-slate-400">{c.category} • {c.difficulty}</span>
                </td>

                <td className="py-4 px-4 text-xs font-semibold text-slate-300">
                  {c.instructorName}
                </td>

                <td className="py-4 px-4 text-xs text-slate-400">
                  {c.modules?.length || 0} modules • {totalLessons} lessons
                </td>

                <td className="py-4 px-4">
                  <Badge
                    variant={
                      status === 'approved' ? 'emerald' : status === 'pending' ? 'amber' : 'rose'
                    }
                    size="sm"
                  >
                    {status.toUpperCase()}
                  </Badge>
                </td>

                <td className="py-4 px-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    {status !== 'approved' && (
                      <Button
                        variant="emerald"
                        size="sm"
                        onClick={() => handleOpenModeration(c, 'approved')}
                      >
                        Approve
                      </Button>
                    )}
                    {status !== 'rejected' && (
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleOpenModeration(c, 'rejected')}
                      >
                        Reject
                      </Button>
                    )}
                  </div>
                </td>
              </tr>
            );
          })}
        </Table>
      )}

      {/* Moderation Reason Modal */}
      {actionTarget && (
        <Modal
          isOpen={Boolean(actionTarget)}
          onClose={() => setActionTarget(null)}
          title={`Confirm Course Moderation: ${actionTarget.action.toUpperCase()}`}
          size="md"
        >
          <form onSubmit={handleConfirmModeration} className="space-y-4">
            <p className="text-xs text-slate-300">
              You are setting the review standing of <strong className="text-white">"{actionTarget.course.title}"</strong> to{' '}
              <strong className={actionTarget.action === 'approved' ? 'text-emerald-400' : 'text-rose-400'}>
                {actionTarget.action}
              </strong>.
            </p>

            <TextArea
              label="Evaluation Feedback / Compliance Notes"
              value={moderationNote}
              onChange={(e) => setModerationNote(e.target.value)}
              rows={4}
              required
            />

            <div className="flex justify-end gap-2 pt-3">
              <Button variant="secondary" onClick={() => setActionTarget(null)}>
                Cancel
              </Button>
              <Button
                type="submit"
                variant={actionTarget.action === 'approved' ? 'emerald' : 'danger'}
                isLoading={submitting}
              >
                Confirm {actionTarget.action}
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
