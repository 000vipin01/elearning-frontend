import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { courseService } from '../../services/courseService';
import { enrollmentService } from '../../services/enrollmentService';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import {
  Star,
  Clock,
  Users,
  CheckCircle2,
  PlayCircle,
  FileText,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Avatar } from '../../components/ui/Avatar';
import { ProgressBar } from '../../components/ui/ProgressBar';

export function CourseDetailsPage() {
  const { id } = useParams();
  const { user, isAuthenticated, isStudent } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [enrollment, setEnrollment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);
  const [expandedModules, setExpandedModules] = useState({});

  useEffect(() => {
    async function loadCourse() {
      setLoading(true);
      try {
        const found = await courseService.getCourseById(id);
        setCourse(found);

        // Expand first module by default
        if (found?.modules?.[0]?.id) {
          setExpandedModules({ [found.modules[0].id]: true });
        }

        if (user) {
          const userEnr = await enrollmentService.getProgress
            ? await (await enrollmentService.getStudentEnrollments(user.id)).find(e => e.courseId === id)
            : null;
          setEnrollment(userEnr || null);
        }
      } catch (err) {
        toast.error('Course not found or relocated.');
        navigate('/courses');
      } finally {
        setLoading(false);
      }
    }
    loadCourse();
  }, [id, user]);

  const toggleModule = (modId) => {
    setExpandedModules(prev => ({
      ...prev,
      [modId]: !prev[modId]
    }));
  };

  const handleEnroll = async () => {
    if (!isAuthenticated) {
      toast.info('Please sign in or create an account to enroll.');
      navigate('/login', { state: { from: { pathname: `/courses/${id}` } } });
      return;
    }

    if (!isStudent) {
      toast.info('Instructors and Administrators can inspect curriculum directly via their dashboards.');
      return;
    }

    setEnrolling(true);
    try {
      const newEnr = await enrollmentService.enroll(user.id, course.id);
      setEnrollment(newEnr);
      toast.success(`You are now enrolled in "${course.title}"!`);
      // Update course student count locally
      setCourse(prev => ({
        ...prev,
        studentsCount: (prev.studentsCount || 0) + 1
      }));
    } catch (err) {
      toast.error(err.message || 'Failed to enroll');
    } finally {
      setEnrolling(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <div className="h-10 bg-slate-800 rounded-xl w-1/3 mx-auto animate-pulse mb-6" />
        <div className="h-64 bg-slate-800/60 rounded-3xl animate-pulse" />
      </div>
    );
  }

  if (!course) return null;

  let totalLessons = 0;
  course.modules?.forEach(m => {
    totalLessons += (m.lessons || []).length;
  });

  const isEnrolled = Boolean(enrollment);

  return (
    <div className="min-h-screen bg-background text-slate-100">
      {/* Hero Section */}
      <section className="bg-slate-950/80 border-b border-surface-border py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left 8 cols: Course Headline & Metadata */}
            <div className="lg:col-span-8 space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="amber" size="md">
                  {course.category}
                </Badge>
                <Badge
                  variant={
                    course.difficulty === 'Beginner'
                      ? 'emerald'
                      : course.difficulty === 'Intermediate'
                      ? 'sky'
                      : 'purple'
                  }
                  size="md"
                >
                  {course.difficulty}
                </Badge>
                <span className="text-xs text-slate-400">
                  Last updated {course.updatedAt || 'Recent'}
                </span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                {course.title}
              </h1>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-3xl">
                {course.subtitle || course.description}
              </p>

              {/* Meta metrics */}
              <div className="flex flex-wrap items-center gap-6 pt-2 text-xs text-slate-400">
                <div className="flex items-center gap-1.5 text-amber-400 font-bold">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="text-sm text-slate-100">{course.rating || '4.9'}</span>
                  <span className="text-slate-500 font-normal">({course.reviewsCount || 120} reviews)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-slate-400" />
                  <span>{course.studentsCount || 0} students enrolled</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-slate-400" />
                  <span>{course.duration} of comprehensive lecture material</span>
                </div>
              </div>

              {/* Instructor snippet */}
              <div className="flex items-center gap-3 pt-3">
                <Avatar
                  src={course.instructorAvatar}
                  fallbackText={course.instructorName}
                  size="md"
                />
                <div>
                  <div className="text-xs text-slate-400">Created by</div>
                  <div className="text-sm font-bold text-slate-200">{course.instructorName}</div>
                  <div className="text-xs text-slate-400">{course.instructorTitle}</div>
                </div>
              </div>
            </div>

            {/* Right 4 cols: Sticky Enrollment Box */}
            <div className="lg:col-span-4">
              <div className="bg-surface-card border border-surface-border rounded-3xl p-6 shadow-2xl space-y-5 sticky top-24">
                <div className="aspect-video rounded-2xl overflow-hidden bg-slate-900 relative">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-slate-950/30 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-brand-500/90 text-slate-950 flex items-center justify-center shadow-lg shadow-black/50">
                      <PlayCircle className="w-6 h-6 ml-0.5" />
                    </div>
                  </div>
                </div>

                {isEnrolled ? (
                  <div className="space-y-4">
                    <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                      <span>You are currently enrolled in this curriculum.</span>
                    </div>
                    {enrollment.progressPercentage !== undefined && (
                      <ProgressBar progress={enrollment.progressPercentage} variant="amber" />
                    )}
                    <Link to={`/learn/${course.id}`} className="block">
                      <Button variant="primary" size="lg" className="w-full font-bold">
                        Continue Learning
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-baseline justify-between">
                      <span className="text-2xl font-black text-white">Academic Free</span>
                      <span className="text-xs text-emerald-400 font-semibold uppercase tracking-wider">Open Access</span>
                    </div>

                    <Button
                      variant="primary"
                      size="lg"
                      isLoading={enrolling}
                      onClick={handleEnroll}
                      className="w-full font-bold shadow-lg shadow-brand-500/25"
                    >
                      Enroll in Course Now
                    </Button>

                    <p className="text-[11px] text-center text-slate-400">
                      Full lifetime access • All modules & lessons included
                    </p>
                  </div>
                )}

                <div className="pt-4 border-t border-surface-border/60 space-y-2 text-xs text-slate-300">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>{course.modules?.length || 0} Comprehensive Modules</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>{totalLessons} Guided Lessons</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Self-Paced Progress Tracking</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Body */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8 space-y-12">
            {/* What you'll learn */}
            {course.whatYouWillLearn?.length > 0 && (
              <div className="p-6 sm:p-8 rounded-3xl bg-surface-card border border-surface-border space-y-4">
                <h3 className="text-lg font-bold text-white tracking-tight">
                  What You'll Learn
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {course.whatYouWillLearn.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-brand-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Course Description */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white tracking-tight">
                Course Description
              </h3>
              <div className="text-sm text-slate-300 leading-relaxed space-y-4 bg-surface-card/60 p-6 rounded-2xl border border-surface-border">
                <p>{course.description}</p>
              </div>
            </div>

            {/* Course Curriculum Accordion */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-white tracking-tight">
                    Course Curriculum
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {course.modules?.length || 0} modules • {totalLessons} lessons • {course.duration} total duration
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {course.modules?.map((mod, mi) => {
                  const isOpen = expandedModules[mod.id];
                  const lessonCount = mod.lessons?.length || 0;

                  return (
                    <div
                      key={mod.id}
                      className="rounded-2xl border border-surface-border bg-surface-card overflow-hidden"
                    >
                      <button
                        type="button"
                        onClick={() => toggleModule(mod.id)}
                        className="w-full flex items-center justify-between p-4 sm:p-5 text-left bg-slate-900/60 hover:bg-slate-900 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-7 h-7 rounded-lg bg-surface-subtle border border-surface-border text-brand-400 font-bold text-xs flex items-center justify-center">
                            {mi + 1}
                          </span>
                          <div>
                            <h4 className="text-sm font-bold text-slate-100">{mod.title}</h4>
                            <span className="text-xs text-slate-400">
                              {lessonCount} lessons • {mod.duration || '45 min'}
                            </span>
                          </div>
                        </div>
                        {isOpen ? (
                          <ChevronUp className="w-5 h-5 text-slate-400" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-slate-400" />
                        )}
                      </button>

                      {isOpen && (
                        <div className="divide-y divide-surface-border/50 bg-slate-950/40">
                          {mod.lessons?.map((les, li) => (
                            <div
                              key={les.id}
                              className="p-3.5 sm:px-6 flex items-center justify-between text-xs text-slate-300 hover:bg-slate-900/50 transition-colors"
                            >
                              <div className="flex items-center gap-3">
                                {les.type === 'video' ? (
                                  <PlayCircle className="w-4 h-4 text-brand-400 shrink-0" />
                                ) : (
                                  <FileText className="w-4 h-4 text-sky-400 shrink-0" />
                                )}
                                <span>{les.title}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                {les.isPreview && (
                                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-brand-500/10 text-brand-400 border border-brand-500/20">
                                    Preview
                                  </span>
                                )}
                                <span className="text-slate-400">{les.duration}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Prerequisites */}
            {course.requirements?.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-white tracking-tight">
                  Prerequisites & Requirements
                </h3>
                <ul className="space-y-2 text-xs text-slate-300 bg-surface-card/60 p-6 rounded-2xl border border-surface-border">
                  {course.requirements.map((req, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-brand-500" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
