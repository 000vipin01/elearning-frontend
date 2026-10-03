import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { courseService } from '../../services/courseService';
import { enrollmentService } from '../../services/enrollmentService';
import { progressService } from '../../services/progressService';
import confetti from 'canvas-confetti';
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Circle,
  PlayCircle,
  FileText,
  Clock,
  BookOpen,
  Volume2,
  Maximize2,
  Share2,
  Menu,
  X,
  Award,
  Download,
  Sparkles
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { ProgressBar } from '../../components/ui/ProgressBar';
import { Avatar } from '../../components/ui/Avatar';
import { Modal } from '../../components/ui/Modal';

export function LearningLessonPage() {
  const { courseId } = useParams();
  const { user } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [enrollment, setEnrollment] = useState(null);
  const [currentLesson, setCurrentLesson] = useState(null);
  const [currentModule, setCurrentModule] = useState(null);
  const [loading, setLoading] = useState(true);
  const [togglingProgress, setTogglingProgress] = useState(false);

  // Responsive drawer toggles
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showCertificateModal, setShowCertificateModal] = useState(false);

  useEffect(() => {
    async function loadData() {
      if (!user) return;
      setLoading(true);
      try {
        const foundCourse = await courseService.getCourseById(courseId);
        setCourse(foundCourse);

        // Fetch or auto-enroll
        let enr = await progressService.getProgress(user.id, courseId);
        if (!enr) {
          enr = await enrollmentService.enroll(user.id, courseId);
          toast.info(`Auto-enrolled in "${foundCourse.title}" for your learning session.`);
        }
        setEnrollment(enr);

        // Determine current active lesson
        let activeLesson = null;
        let activeModule = null;

        if (enr.lastAccessedLessonId) {
          for (const m of (foundCourse.modules || [])) {
            const foundL = (m.lessons || []).find(l => l.id === enr.lastAccessedLessonId);
            if (foundL) {
              activeLesson = foundL;
              activeModule = m;
              break;
            }
          }
        }

        // Fallback to first lesson
        if (!activeLesson && foundCourse.modules?.[0]?.lessons?.[0]) {
          activeModule = foundCourse.modules[0];
          activeLesson = foundCourse.modules[0].lessons[0];
        }

        setCurrentLesson(activeLesson);
        setCurrentModule(activeModule);
      } catch (err) {
        toast.error('Failed to load course curriculum.');
        navigate('/student/dashboard');
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [courseId, user]);

  // Flattened list of all lessons for Prev/Next navigation
  const allLessons = [];
  course?.modules?.forEach(m => {
    m.lessons?.forEach(l => {
      allLessons.push({ ...l, moduleId: m.id, moduleTitle: m.title });
    });
  });

  const currentIndex = allLessons.findIndex(l => l.id === currentLesson?.id);
  const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;

  const selectLesson = (lesson) => {
    setCurrentLesson(lesson);
    const mod = course.modules.find(m => m.id === lesson.moduleId || m.lessons?.some(l => l.id === lesson.id));
    setCurrentModule(mod);
    setIsSidebarOpen(false);
    progressService.updateLastAccessed(user.id, course.id, lesson.id);
  };

  const handleToggleCompleted = async () => {
    if (!currentLesson || !enrollment) return;
    setTogglingProgress(true);
    try {
      const updatedEnr = await progressService.toggleLessonCompletion(user.id, course.id, currentLesson.id);
      setEnrollment(updatedEnr);

      const isNowCompleted = (updatedEnr.completedLessons || []).includes(currentLesson.id);

      if (isNowCompleted) {
        toast.success(`Lesson marked as completed!`);
        // If course is 100% completed, fire celebratory confetti
        if (updatedEnr.progressPercentage >= 100) {
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
          });
          setShowCertificateModal(true);
        }
      } else {
        toast.info('Lesson marked as incomplete.');
      }
    } catch (err) {
      toast.error('Failed to update lesson status');
    } finally {
      setTogglingProgress(false);
    }
  };

  const isCurrentCompleted = enrollment?.completedLessons?.includes(currentLesson?.id);

  if (loading || !course) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <div className="h-10 bg-slate-800 rounded-xl w-1/3 mx-auto animate-pulse mb-6" />
        <div className="h-96 bg-slate-800/60 rounded-3xl animate-pulse" />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)] -m-4 sm:-m-6 lg:-m-8">
      {/* Top Learning Navigation Bar */}
      <div className="bg-slate-950 border-b border-surface-border px-4 py-3 flex items-center justify-between gap-4 sticky top-16 z-30">
        <div className="flex items-center gap-3 min-w-0">
          <Link
            to="/student/my-courses"
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors shrink-0"
            title="Return to My Courses"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="min-w-0">
            <p className="text-[11px] font-semibold text-brand-400 uppercase tracking-wider truncate">
              {course.title}
            </p>
            <h2 className="text-sm font-bold text-white truncate">
              {currentLesson?.title || 'Course Lecture'}
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="lg:hidden p-2 rounded-xl text-slate-300 hover:bg-slate-800 border border-surface-border flex items-center gap-1.5 text-xs font-semibold"
          >
            <Menu className="w-4 h-4" />
            <span>Curriculum</span>
          </button>

          {enrollment && (
            <div className="hidden sm:flex items-center gap-3">
              <div className="w-32">
                <ProgressBar progress={enrollment.progressPercentage} showLabel={false} variant="amber" />
              </div>
              <span className="text-xs font-bold text-brand-400">
                {enrollment.progressPercentage}% Complete
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Main 3-Column Layout */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* LEFT COLUMN: Curriculum / Modules Navigation */}
        <aside
          className={`fixed inset-y-0 left-0 z-40 w-80 bg-slate-950 border-r border-surface-border transform transition-transform duration-300 lg:static lg:translate-x-0 ${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="h-full flex flex-col">
            <div className="p-4 border-b border-surface-border flex items-center justify-between">
              <div>
                <h3 className="font-bold text-sm text-white">Course Curriculum</h3>
                <p className="text-[11px] text-slate-400">
                  {enrollment?.completedLessons?.length || 0} of {allLessons.length} lessons completed
                </p>
              </div>
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="lg:hidden p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto divide-y divide-surface-border/50">
              {course.modules?.map((mod, mi) => (
                <div key={mod.id} className="py-2">
                  <div className="px-4 py-2 text-xs font-bold text-slate-400 uppercase tracking-wider bg-slate-900/40">
                    {mod.title}
                  </div>
                  <div className="space-y-0.5 mt-1">
                    {mod.lessons?.map((les) => {
                      const isActive = les.id === currentLesson?.id;
                      const isCompleted = enrollment?.completedLessons?.includes(les.id);

                      return (
                        <button
                          key={les.id}
                          onClick={() => selectLesson(les)}
                          className={`w-full text-left px-4 py-2.5 flex items-center gap-3 text-xs transition-colors ${
                            isActive
                              ? 'bg-brand-500/15 text-brand-300 border-l-4 border-brand-500 font-bold'
                              : 'text-slate-300 hover:bg-slate-900 hover:text-white'
                          }`}
                        >
                          {isCompleted ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                          ) : (
                            <Circle className="w-4 h-4 text-slate-600 shrink-0" />
                          )}
                          <span className="truncate flex-1">{les.title}</span>
                          <span className="text-[10px] text-slate-500 shrink-0">{les.duration}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* CENTER COLUMN: Lesson Content (Video & Text) */}
        <main className="flex-1 overflow-y-auto bg-background p-4 sm:p-6 lg:p-8 flex flex-col">
          <div className="max-w-4xl w-full mx-auto space-y-6 flex-1">
            {/* Video Player or Simulated Embed */}
            {currentLesson?.videoUrl ? (
              <div className="rounded-2xl overflow-hidden bg-black aspect-video border border-surface-border shadow-2xl relative">
                <iframe
                  src={currentLesson.videoUrl}
                  title={currentLesson.title}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ) : (
              /* Simulated High-Definition Video Player */
              <div className="rounded-2xl overflow-hidden bg-slate-950 aspect-video border border-surface-border shadow-2xl relative flex flex-col justify-between p-6">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <Badge variant="amber" size="sm">Interactive Lecture Stream</Badge>
                  <span>1080p 60fps</span>
                </div>

                <div className="flex flex-col items-center justify-center my-auto">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="w-16 h-16 rounded-full bg-brand-500 hover:bg-brand-400 text-slate-950 flex items-center justify-center shadow-2xl shadow-brand-500/30 transition-transform hover:scale-105 active:scale-95"
                  >
                    <PlayCircle className="w-8 h-8 ml-0.5" />
                  </button>
                  <p className="text-xs text-slate-300 font-semibold mt-3">
                    {isPlaying ? 'Lecture Simulation Playing...' : 'Click to Play Lecture Stream'}
                  </p>
                </div>

                {/* Simulated Scrubber Bar */}
                <div className="space-y-2">
                  <div className="w-full bg-slate-800 rounded-full h-1.5 cursor-pointer">
                    <div className="bg-brand-500 h-1.5 rounded-full w-1/3" />
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span>08:14 / {currentLesson?.duration || '24:00'}</span>
                    <div className="flex items-center gap-3">
                      <Volume2 className="w-4 h-4 cursor-pointer hover:text-white" />
                      <Maximize2 className="w-4 h-4 cursor-pointer hover:text-white" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Lesson Title & Summary Header */}
            <div className="bg-surface-card border border-surface-border rounded-2xl p-6 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="space-y-1">
                  <span className="text-xs font-semibold text-brand-400 uppercase tracking-wider">
                    {currentModule?.title || 'Active Module'}
                  </span>
                  <h1 className="text-2xl font-bold text-white tracking-tight">
                    {currentLesson?.title}
                  </h1>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant={isCurrentCompleted ? 'emerald' : 'primary'}
                    size="md"
                    isLoading={togglingProgress}
                    onClick={handleToggleCompleted}
                    leftIcon={<CheckCircle2 className="w-4 h-4" />}
                  >
                    {isCurrentCompleted ? 'Completed ✓' : 'Mark Complete'}
                  </Button>
                </div>
              </div>

              {currentLesson?.summary && (
                <p className="text-xs sm:text-sm text-slate-300 pt-2 border-t border-surface-border/60 leading-relaxed">
                  {currentLesson.summary}
                </p>
              )}
            </div>

            {/* Rich Markdown / Lesson Notes Content */}
            <div className="bg-surface-card/60 border border-surface-border rounded-2xl p-6 sm:p-8 space-y-4">
              <h3 className="text-base font-bold text-white pb-3 border-b border-surface-border/60">
                Lecture Notes & Code Invariants
              </h3>
              <div className="text-sm text-slate-200 leading-relaxed space-y-4 font-mono whitespace-pre-wrap bg-slate-950/70 p-5 rounded-xl border border-surface-border/80 overflow-x-auto text-xs sm:text-sm">
                {currentLesson?.content || 'No text content available for this lesson.'}
              </div>
            </div>

            {/* Navigation Buttons: Previous & Next Lesson */}
            <div className="flex items-center justify-between pt-6 border-t border-surface-border/60">
              {prevLesson ? (
                <Button
                  variant="secondary"
                  size="md"
                  onClick={() => selectLesson(prevLesson)}
                  leftIcon={<ChevronLeft className="w-4 h-4" />}
                >
                  Previous: {prevLesson.title.slice(0, 24)}...
                </Button>
              ) : (
                <div />
              )}

              {nextLesson && (
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => selectLesson(nextLesson)}
                  rightIcon={<ChevronRight className="w-4 h-4" />}
                >
                  Next: {nextLesson.title.slice(0, 24)}...
                </Button>
              )}
            </div>
          </div>
        </main>

        {/* RIGHT COLUMN: Course Progress / Lesson Information */}
        <aside className="hidden xl:block w-72 bg-slate-950 border-l border-surface-border p-5 space-y-6 shrink-0">
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              Overall Progress
            </h4>
            <div className="p-4 rounded-xl bg-surface-card border border-surface-border space-y-3">
              <div className="flex items-baseline justify-between">
                <span className="text-2xl font-black text-white">{enrollment?.progressPercentage}%</span>
                <span className="text-xs text-slate-400">{enrollment?.completedLessons?.length || 0} / {allLessons.length}</span>
              </div>
              <ProgressBar progress={enrollment?.progressPercentage || 0} showLabel={false} variant="amber" />
              {enrollment?.progressPercentage >= 100 && (
                <button
                  onClick={() => setShowCertificateModal(true)}
                  className="w-full py-2 px-3 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Award className="w-3.5 h-3.5" />
                  <span>View Certificate</span>
                </button>
              )}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              Lead Faculty
            </h4>
            <div className="p-4 rounded-xl bg-surface-card border border-surface-border flex items-center gap-3">
              <Avatar src={course.instructorAvatar} fallbackText={course.instructorName} size="md" />
              <div className="min-w-0">
                <p className="text-xs font-bold text-white truncate">{course.instructorName}</p>
                <p className="text-[11px] text-slate-400 truncate">{course.instructorTitle}</p>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-brand-500/5 border border-brand-500/20 space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-brand-400">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Study Tip</span>
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              Consistently mark each lesson completed as you finish to track verified hours towards your degree audit.
            </p>
          </div>
        </aside>
      </div>

      {/* Graduation Certificate Modal */}
      <Modal
        isOpen={showCertificateModal}
        onClose={() => setShowCertificateModal(false)}
        size="md"
        title="Curriculum Completion Certificate"
      >
        <div className="p-6 text-center space-y-4 border border-brand-500/40 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950">
          <div className="w-16 h-16 rounded-full bg-brand-500/15 text-brand-400 flex items-center justify-center mx-auto">
            <Award className="w-8 h-8" />
          </div>
          <span className="text-xs font-bold uppercase tracking-widest text-brand-400">Academic Verification</span>
          <h3 className="text-xl font-extrabold text-white">Certificate of Completion</h3>
          <p className="text-xs text-slate-300 max-w-sm mx-auto">
            This confirms that <strong className="text-white">{user?.name}</strong> has satisfactorily completed 100% of required curriculum for:
          </p>
          <div className="p-3 rounded-xl bg-slate-900 border border-surface-border font-bold text-amber-300 text-sm">
            {course.title}
          </div>
          <p className="text-[11px] text-slate-500">
            Instructor: {course.instructorName} • Nexus Academic Accreditation
          </p>
          <div className="pt-4 flex justify-center gap-3">
            <Button variant="primary" onClick={() => toast.success('Certificate printed to PDF')}>
              Download PDF Credential
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
