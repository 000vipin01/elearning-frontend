import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { courseService } from '../../services/courseService';
import { categoryService } from '../../services/categoryService';
import { activityService } from '../../services/activityService';
import { useAuth } from '../../context/AuthContext';
import {
  Sparkles,
  ArrowRight,
  BookOpen,
  CheckCircle,
  GraduationCap
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { CourseCard } from '../../components/ui/CourseCard';
import { Badge } from '../../components/ui/Badge';
import { Footer } from '../../components/layout/Footer';

export function LandingPage() {
  const { user, role } = useAuth();
  const navigate = useNavigate();

  const [featuredCourses, setFeaturedCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [stats, setStats] = useState({
    totalUsers: '10,000+',
    totalCourses: '12+',
    totalInstructors: '8+',
    completionRate: '94%'
  });

  useEffect(() => {
    async function loadData() {
      try {
        const [cList, catList, pStats] = await Promise.all([
          courseService.getCourses({ publishedOnly: true, sortBy: 'popular' }),
          categoryService.getCategories(),
          activityService.getPlatformStats()
        ]);
        setFeaturedCourses(cList.slice(0, 4));
        setCategories(catList);
        if (pStats) {
          setStats({
            totalUsers: pStats.totalUsers + 2150 + '+',
            totalCourses: pStats.totalCourses + '+',
            totalInstructors: pStats.totalInstructors + '+',
            completionRate: pStats.completionRate + '%'
          });
        }
      } catch (err) {
        console.error(err);
      }
    }
    loadData();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-background text-slate-100">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-32 border-b border-surface-border/50">
        {/* Ambient background glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-brand-500/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-[400px] h-[300px] bg-sky-500/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-xs font-semibold tracking-wide animate-in fade-in">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Next-Generation Academic Engineering Platform</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
              Learn. Build. <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 via-yellow-300 to-amber-500">Grow.</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal max-w-2xl mx-auto">
              A centralized, production-grade learning management system uniting university students, faculty researchers, and enterprise engineering architects in a shared ecosystem of rigorous technical curricula.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link to="/courses" className="w-full sm:w-auto">
                <Button variant="primary" size="lg" rightIcon={<ArrowRight className="w-4 h-4" />} className="w-full sm:w-auto">
                  Explore All Courses
                </Button>
              </Link>
              <Link to="/about" className="w-full sm:w-auto">
                <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                  Platform Architecture
                </Button>
              </Link>
            </div>

            {/* Quick Demo Shortcuts Banner */}
            <div className="pt-8">
              <div className="p-4 rounded-2xl bg-surface-card border border-surface-border text-left flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-brand-500/15 text-brand-400 flex items-center justify-center shrink-0">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-100 uppercase tracking-wider">Evaluation Demo Accounts Available</h4>
                    <p className="text-xs text-slate-400">Instantly test Student, Instructor, and Admin workspaces</p>
                  </div>
                </div>
                <Link to="/login">
                  <Button variant="subtleAmber" size="sm">
                    Open Demo Logins
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Metrics / Key Stats Banner */}
      <section className="bg-slate-950/70 border-b border-surface-border/50 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-white">{stats.totalUsers}</div>
              <div className="text-xs font-medium text-slate-400 mt-1 uppercase tracking-wider">Active Learners</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-brand-400">{stats.totalCourses}</div>
              <div className="text-xs font-medium text-slate-400 mt-1 uppercase tracking-wider">Accredited Courses</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-white">{stats.totalInstructors}</div>
              <div className="text-xs font-medium text-slate-400 mt-1 uppercase tracking-wider">Lead Instructors</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400">{stats.completionRate}</div>
              <div className="text-xs font-medium text-slate-400 mt-1 uppercase tracking-wider">Curriculum Completion</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses Section */}
      <section className="py-20 border-b border-surface-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <Badge variant="amber" size="sm" className="mb-2">Academic Excellence</Badge>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Featured Engineering Curricula
              </h2>
              <p className="text-sm text-slate-400 mt-1">
                Hand-curated, multi-module masterclasses with production-ready depth.
              </p>
            </div>
            <Link to="/courses">
              <Button variant="secondary" size="sm" rightIcon={<ArrowRight className="w-4 h-4" />}>
                View All Courses
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredCourses.map(course => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </section>

      {/* Curriculum Categories */}
      <section className="py-20 bg-slate-950/40 border-b border-surface-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <Badge variant="sky" size="sm" className="mb-2">Disciplinary Tracks</Badge>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Explore Academic Disciplines
            </h2>
            <p className="text-sm text-slate-400 mt-2">
              Structured learning pathways mapped to enterprise roles and software engineering accreditations.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {categories.slice(0, 8).map(cat => (
              <Link
                key={cat.id}
                to={`/courses?category=${encodeURIComponent(cat.name)}`}
                className="group p-5 rounded-2xl bg-surface-card hover:bg-surface-hover border border-surface-border transition-all duration-200 hover:-translate-y-1 hover:border-brand-500/40"
              >
                <div className="w-12 h-12 rounded-xl bg-brand-500/10 text-brand-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <BookOpen className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-sm text-white group-hover:text-brand-400 transition-colors">
                  {cat.name}
                </h4>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                  {cat.description}
                </p>
                <div className="mt-4 pt-3 border-t border-surface-border/60 flex items-center justify-between text-xs text-slate-400">
                  <span>{cat.courseCount} Courses</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform text-brand-500" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How the Platform Works */}
      <section className="py-20 border-b border-surface-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <Badge variant="amber" size="sm" className="mb-2">Methodology</Badge>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              How NexusLMS Delivers Mastery
            </h2>
            <p className="text-sm text-slate-400 mt-2">
              Every course is structured around real-world software architecture, verified problem sets, and progressive milestones.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-surface-card border border-surface-border relative">
              <div className="w-10 h-10 rounded-xl bg-brand-500 text-slate-950 font-extrabold flex items-center justify-center mb-4 text-sm shadow-lg shadow-brand-500/20">
                1
              </div>
              <h4 className="text-base font-bold text-white mb-2">Enroll in Accredited Tracks</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Choose specialized courses curated by veteran industry architects and university faculty with comprehensive prerequisites.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-surface-card border border-surface-border relative">
              <div className="w-10 h-10 rounded-xl bg-sky-500 text-slate-950 font-extrabold flex items-center justify-center mb-4 text-sm shadow-lg shadow-sky-500/20">
                2
              </div>
              <h4 className="text-base font-bold text-white mb-2">Engage with Rich Lessons</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Learn via structured multimedia lectures, complete lecture transcriptions, downloadable notes, and runnable code snippets.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-surface-card border border-surface-border relative">
              <div className="w-10 h-10 rounded-xl bg-emerald-500 text-slate-950 font-extrabold flex items-center justify-center mb-4 text-sm shadow-lg shadow-emerald-500/20">
                3
              </div>
              <h4 className="text-base font-bold text-white mb-2">Track & Certify Completion</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Monitor granular progress per module, retain completed lesson history, and unlock academic verification badges.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Instructor Invitation Section */}
      <section className="py-20 bg-gradient-to-b from-slate-950/60 to-surface-subtle/40 border-b border-surface-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Badge variant="amber" size="sm">Faculty & Instructors</Badge>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                Architect Curricula with Modern Faculty Tools
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                Instructors gain full curriculum authoring autonomy: draft multi-tier modules, embed interactive video simulations, organize lecture notes, and inspect student cohort analytics in real time.
              </p>
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3 text-xs text-slate-300">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Interactive Module & Lesson Builder with real-time preview</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-300">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Per-course student enrollment inspection and retention analytics</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-300">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Autonomous draft, publish, and revision state controls</span>
                </div>
              </div>
              <div className="pt-2">
                <Link to="/register?role=INSTRUCTOR">
                  <Button variant="primary" size="md">
                    Become an Instructor
                  </Button>
                </Link>
              </div>
            </div>

            <div className="bg-surface-card border border-surface-border rounded-3xl p-6 shadow-2xl relative">
              <div className="flex items-center justify-between pb-4 border-b border-surface-border/60">
                <div className="flex items-center gap-2.5">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                </div>
                <span className="text-[11px] font-mono text-slate-400">Instructor Studio Preview</span>
              </div>
              <div className="pt-5 space-y-4">
                <div className="p-4 rounded-xl bg-slate-900 border border-surface-border">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-200">Module 1: Concurrency & Loom</span>
                    <Badge variant="emerald" size="sm">Published</Badge>
                  </div>
                  <div className="mt-3 pl-3 border-l-2 border-brand-500 space-y-2 text-xs text-slate-400">
                    <div className="flex items-center justify-between">
                      <span>1.1 Virtual Thread Internals</span>
                      <span className="text-[11px] text-slate-500">24 min</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>1.2 Structured Concurrency Patterns</span>
                      <span className="text-[11px] text-slate-500">30 min</span>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 text-center">
                  <div className="p-3 rounded-xl bg-slate-900/60 border border-surface-border">
                    <div className="text-lg font-bold text-amber-400">1,240</div>
                    <div className="text-[10px] text-slate-400 uppercase">Enrolled Students</div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900/60 border border-surface-border">
                    <div className="text-lg font-bold text-emerald-400">92%</div>
                    <div className="text-[10px] text-slate-400 uppercase">Avg. Completion</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
