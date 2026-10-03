import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { enrollmentService } from '../../services/enrollmentService';
import { progressService } from '../../services/progressService';
import {
  TrendingUp,
  Award,
  BookOpen,
  Clock,
  CheckCircle2,
  Calendar,
  ExternalLink,
  Download
} from 'lucide-react';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { ProgressBar } from '../../components/ui/ProgressBar';
import { Modal } from '../../components/ui/Modal';
import { LoadingSkeleton } from '../../components/ui/LoadingSkeleton';

export function StudentProgressPage() {
  const { user } = useAuth();

  const [enrollments, setEnrollments] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedCert, setSelectedCert] = useState(null);

  useEffect(() => {
    async function loadData() {
      if (!user) return;
      setLoading(true);
      try {
        const [enrs, sStats] = await Promise.all([
          enrollmentService.getStudentEnrollments(user.id),
          progressService.getStudentStats(user.id)
        ]);
        setEnrollments(enrs);
        setStats(sStats);
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

  const completedTracks = enrollments.filter(e => (e.progressPercentage || 0) >= 100);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-surface-border/60 pb-6">
        <div>
          <Badge variant="emerald" size="sm" className="mb-2">Academic Audit</Badge>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Learning Progress & Transcripts
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Track your degree milestones, completed lectures, and verified certificate credentials
          </p>
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-surface-card border border-surface-border space-y-1">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Total Enrolled</span>
          <div className="text-2xl font-black text-white">{stats?.totalEnrolled || 0}</div>
          <span className="text-[11px] text-slate-500">Active curricula</span>
        </div>

        <div className="p-5 rounded-2xl bg-surface-card border border-surface-border space-y-1">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Completed Tracks</span>
          <div className="text-2xl font-black text-emerald-400">{stats?.completedCourses || 0}</div>
          <span className="text-[11px] text-slate-500">Accredited graduations</span>
        </div>

        <div className="p-5 rounded-2xl bg-surface-card border border-surface-border space-y-1">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Total Study Hours</span>
          <div className="text-2xl font-black text-brand-400">{stats?.hoursSpent || 0}h</div>
          <span className="text-[11px] text-slate-500">{stats?.totalLessonsFinished || 0} completed lessons</span>
        </div>

        <div className="p-5 rounded-2xl bg-surface-card border border-surface-border space-y-1">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Overall Progress</span>
          <div className="text-2xl font-black text-sky-400">{stats?.averageProgress || 0}%</div>
          <span className="text-[11px] text-slate-500">Cohort benchmark</span>
        </div>
      </div>

      {/* Course-by-Course Progress Breakdown */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-white tracking-tight">
          Curriculum Milestone Breakdown
        </h2>

        <div className="space-y-4">
          {enrollments.map(enr => {
            const isCompleted = enr.progressPercentage >= 100;

            return (
              <div
                key={enr.id}
                className="p-6 rounded-2xl bg-surface-card border border-surface-border space-y-4 hover:border-slate-600 transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Badge variant="amber" size="sm">{enr.course.category}</Badge>
                      <Badge variant={isCompleted ? 'emerald' : 'sky'} size="sm">
                        {isCompleted ? 'Completed' : 'In Progress'}
                      </Badge>
                    </div>
                    <h3 className="text-base font-bold text-white">{enr.course.title}</h3>
                    <p className="text-xs text-slate-400">
                      Instructor: {enr.course.instructorName} • {enr.course.duration}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    {isCompleted ? (
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => setSelectedCert(enr)}
                        leftIcon={<Award className="w-4 h-4 text-emerald-400" />}
                      >
                        View Certificate
                      </Button>
                    ) : null}
                    <Link to={`/learn/${enr.courseId}`}>
                      <Button variant="primary" size="sm">
                        Resume Study
                      </Button>
                    </Link>
                  </div>
                </div>

                <div className="space-y-2">
                  <ProgressBar
                    progress={enr.progressPercentage}
                    variant={isCompleted ? 'emerald' : 'amber'}
                  />
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>
                      {enr.completedCount} of {enr.totalLessons} lessons finished
                    </span>
                    <span>
                      Enrolled: {new Date(enr.enrolledAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Verified Certificates Section */}
      <div className="space-y-4 pt-4 border-t border-surface-border/60">
        <div>
          <h2 className="text-lg font-bold text-white tracking-tight">
            Earned Certificates of Mastery ({completedTracks.length})
          </h2>
          <p className="text-xs text-slate-400">Official academic verifications ready for export</p>
        </div>

        {completedTracks.length === 0 ? (
          <div className="p-8 rounded-2xl border border-dashed border-surface-border text-center text-xs text-slate-400">
            No completed certificates yet. Reach 100% on any course to unlock your credentials.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {completedTracks.map(c => (
              <div
                key={c.id}
                className="p-5 rounded-2xl bg-surface-card border border-emerald-500/30 flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center shrink-0">
                    <Award className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-sm font-bold text-white truncate">{c.course.title}</h4>
                    <span className="text-[11px] text-slate-400">Issued by {c.course.instructorName}</span>
                  </div>
                </div>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setSelectedCert(c)}
                  className="shrink-0"
                >
                  Inspect
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Certificate Inspection Modal */}
      {selectedCert && (
        <Modal
          isOpen={Boolean(selectedCert)}
          onClose={() => setSelectedCert(null)}
          size="md"
          title="Academic Credential"
        >
          <div className="p-6 text-center space-y-4 border border-brand-500/40 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950">
            <div className="w-16 h-16 rounded-full bg-brand-500/15 text-brand-400 flex items-center justify-center mx-auto">
              <Award className="w-8 h-8" />
            </div>
            <span className="text-xs font-bold uppercase tracking-widest text-brand-400">
              Official Credential
            </span>
            <h3 className="text-xl font-extrabold text-white">Certificate of Achievement</h3>
            <p className="text-xs text-slate-300 max-w-sm mx-auto">
              Conferred upon <strong className="text-white">{user?.name}</strong> for demonstrated mastery in:
            </p>
            <div className="p-3 rounded-xl bg-slate-900 border border-surface-border font-bold text-amber-300 text-sm">
              {selectedCert.course.title}
            </div>
            <div className="text-[11px] text-slate-400 space-y-1">
              <p>Academic Term: Spring 2026</p>
              <p>Faculty Signoff: {selectedCert.course.instructorName}</p>
            </div>
            <div className="pt-4 flex justify-center">
              <Button variant="primary" onClick={() => { alert('Certificate downloaded as PDF'); setSelectedCert(null); }}>
                Download Verified PDF
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
