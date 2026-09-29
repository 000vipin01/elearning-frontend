import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { BookOpen, Users, DollarSign, TrendingUp, Plus } from 'lucide-react'
import { api } from '../../shared/api/client.js'

export default function InstructorDashboard() {
  const [courses, setCourses] = useState([])
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      api.get('/courses/instructor/mine'),
      api.get('/admin/stats'),
    ]).then(([coursesRes, statsRes]) => {
      setCourses(coursesRes)
      setStats(statsRes)
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="animate-pulse space-y-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-24 rounded-xl bg-[var(--border)]" />
          ))}
        </div>
      </div>
    )
  }

  const published = courses.filter((c) => c.status === 'PUBLISHED').length
  const draft = courses.filter((c) => c.status === 'DRAFT').length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-[var(--text)]">Creator Workbench</h1>
          <p className="mt-1 text-[var(--text-muted)]">Manage your courses and track performance</p>
        </div>
        <Link
          to="/instructor/courses/new"
          className="flex items-center gap-2 rounded-lg bg-[var(--primary)] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[var(--primary-hover)]"
        >
          <Plus size={18} /> New Course
        </Link>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={BookOpen} label="Total Courses" value={courses.length} />
        <StatCard icon={TrendingUp} label="Published" value={published} />
        <StatCard icon={Users} label="Students" value={stats?.totalStudents || 0} />
        <StatCard icon={DollarSign} label="Revenue" value={`₹${stats?.totalRevenue || 0}`} />
      </div>

      {/* Course pipeline */}
      <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6">
        <h2 className="mb-4 font-display text-lg font-bold text-[var(--text)]">Course Pipeline</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <Link
              key={course.id}
              to={`/instructor/courses/${course.id}`}
              className="rounded-lg border border-[var(--border)] p-4 hover:shadow-md"
            >
              <div className="flex items-start justify-between">
                <h3 className="font-semibold text-[var(--text)]">{course.title}</h3>
                <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                  course.status === 'PUBLISHED'
                    ? 'bg-green-100 text-green-700'
                    : course.status === 'DRAFT'
                    ? 'bg-yellow-100 text-yellow-700'
                    : 'bg-red-100 text-red-700'
                }`}>
                  {course.status}
                </span>
              </div>
              <p className="mt-1 text-sm text-[var(--text-muted)]">{course.category}</p>
              <div className="mt-3 flex items-center justify-between text-sm">
                <span className="text-[var(--text-muted)]">{course.lessonCount} lessons</span>
                <span className="font-semibold text-[var(--primary)]">
                  {course.price === 0 ? 'Free' : `₹${course.price}`}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
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
