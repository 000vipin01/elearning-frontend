import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { BookOpen, Clock, Award, TrendingUp, Play } from 'lucide-react'
import { api } from '../../shared/api/client.js'

export default function StudentDashboard() {
  const [enrollments, setEnrollments] = useState([])
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      api.get('/enrollments/my'),
      api.get('/courses?size=6'),
    ]).then(([enrollmentsRes, coursesRes]) => {
      setEnrollments(enrollmentsRes.content || [])
      setCourses(coursesRes.content || [])
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="animate-pulse space-y-6">
        <div className="h-8 w-48 rounded bg-[var(--border)]" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-24 rounded-xl bg-[var(--border)]" />
          ))}
        </div>
      </div>
    )
  }

  const continueLearning = enrollments.filter(e => e.progress < 100).slice(0, 3)
  const completed = enrollments.filter(e => e.progress === 100)

  return (
    <div className="space-y-8">
      {/* Welcome section */}
      <div className="rounded-2xl bg-[var(--hero)] p-6 sm:p-8">
        <h1 className="font-display text-2xl font-bold text-[var(--text)] sm:text-3xl">
          Welcome back!
        </h1>
        <p className="mt-2 text-[var(--text-muted)]">
          Continue your learning journey. You have {continueLearning.length} courses in progress.
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={BookOpen} label="Enrolled" value={enrollments.length} />
        <StatCard icon={Clock} label="In Progress" value={continueLearning.length} />
        <StatCard icon={Award} label="Completed" value={completed.length} />
        <StatCard icon={TrendingUp} label="Courses" value={courses.length} />
      </div>

      {/* Continue learning */}
      {continueLearning.length > 0 && (
        <section>
          <h2 className="mb-4 font-display text-xl font-bold text-[var(--text)]">Continue Learning</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {continueLearning.map((enrollment) => (
              <Link
                key={enrollment.id}
                to={`/student/courses/${enrollment.courseId}`}
                className="group rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 transition-shadow hover:shadow-md"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-[var(--text)] group-hover:text-[var(--primary)]">
                      {enrollment.courseTitle}
                    </h3>
                    <p className="mt-1 text-sm text-[var(--text-muted)]">
                      {enrollment.progress}% complete
                    </p>
                  </div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--primary)]/10 text-[var(--primary)]">
                    <Play size={18} />
                  </div>
                </div>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-[var(--border)]">
                  <div
                    className="h-full rounded-full bg-[var(--primary)] transition-all"
                    style={{ width: `${enrollment.progress}%` }}
                  />
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Recommended courses */}
      <section>
        <h2 className="mb-4 font-display text-xl font-bold text-[var(--text)]">Recommended for You</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <Link
              key={course.id}
              to={`/student/courses/${course.id}`}
              className="group rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 transition-shadow hover:shadow-md"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-[var(--text)] group-hover:text-[var(--primary)]">
                    {course.title}
                  </h3>
                  <p className="mt-1 text-sm text-[var(--text-muted)]">{course.category}</p>
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between text-sm">
                <span className="text-[var(--text-muted)]">{course.lessonCount} lessons</span>
                <span className="font-semibold text-[var(--primary)]">
                  {course.price === 0 ? 'Free' : `₹${course.price}`}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}

function StatCard({ icon: Icon, label, value }) {
  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--primary)]/10 text-[var(--primary)]">
          <Icon size={20} />
        </div>
        <div>
          <p className="text-2xl font-bold text-[var(--text)]">{value}</p>
          <p className="text-sm text-[var(--text-muted)]">{label}</p>
        </div>
      </div>
    </div>
  )
}
