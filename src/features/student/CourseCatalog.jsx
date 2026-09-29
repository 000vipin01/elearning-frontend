import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Search, Filter, BookOpen } from 'lucide-react'
import { api } from '../../shared/api/client.js'

export default function CourseCatalog() {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')
  const [page, setPage] = useState(0)

  useEffect(() => {
    setLoading(true)
    const params = new URLSearchParams({ page, size: 12 })
    if (search) params.set('search', search)
    if (category) params.set('category', category)
    api.get(`/courses?${params}`).then((res) => {
      setCourses(res.content || [])
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [search, category, page])

  const categories = ['Web Development', 'Computer Science', 'Design', 'Data Science', 'Cloud', 'Mobile Development', 'Security']

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-[var(--text)]">Course Catalog</h1>
        <p className="mt-1 text-[var(--text-muted)]">Explore courses and start learning</p>
      </div>

      {/* Search and filter */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search courses..."
            className="w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] py-2.5 pl-10 pr-4 text-sm outline-none focus:border-[var(--primary)]"
          />
        </div>
        <div className="relative">
          <Filter size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="appearance-none rounded-lg border border-[var(--border)] bg-[var(--surface)] py-2.5 pl-10 pr-8 text-sm outline-none focus:border-[var(--primary)]"
          >
            <option value="">All Categories</option>
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Course grid */}
      {loading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-48 animate-pulse rounded-xl bg-[var(--border)]" />
          ))}
        </div>
      ) : courses.length === 0 ? (
        <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-12 text-center">
          <BookOpen size={48} className="mx-auto text-[var(--text-muted)]" />
          <p className="mt-4 text-[var(--text-muted)]">No courses found</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <Link
              key={course.id}
              to={`/student/courses/${course.id}`}
              className="group rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5 transition-shadow hover:shadow-md"
            >
              <div className="flex items-start justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[var(--primary)]/10 text-[var(--primary)]">
                  <BookOpen size={24} />
                </div>
                <span className="rounded-full bg-[var(--secondary)]/10 px-2.5 py-1 text-xs font-medium text-[var(--secondary)]">
                  {course.level}
                </span>
              </div>
              <h3 className="mt-4 font-semibold text-[var(--text)] group-hover:text-[var(--primary)]">
                {course.title}
              </h3>
              <p className="mt-1 line-clamp-2 text-sm text-[var(--text-muted)]">
                {course.description}
              </p>
              <div className="mt-4 flex items-center justify-between text-sm">
                <span className="text-[var(--text-muted)]">{course.lessonCount} lessons</span>
                <span className="font-semibold text-[var(--primary)]">
                  {course.price === 0 ? 'Free' : `₹${course.price}`}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Pagination */}
      <div className="flex items-center justify-center gap-2">
        <button
          onClick={() => setPage(Math.max(0, page - 1))}
          disabled={page === 0}
          className="rounded-lg border border-[var(--border)] px-4 py-2 text-sm disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-sm text-[var(--text-muted)]">Page {page + 1}</span>
        <button
          onClick={() => setPage(page + 1)}
          className="rounded-lg border border-[var(--border)] px-4 py-2 text-sm"
        >
          Next
        </button>
      </div>
    </div>
  )
}
