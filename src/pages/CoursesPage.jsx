import { useState, useEffect } from 'react'
import { api } from '../services/api.js'
import CourseCard from '../components/dashboard/CourseCard.jsx'
import { Search } from 'lucide-react'

export default function CoursesPage() {
  const [courses, setCourses] = useState([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await api.getCourses(search)
        setCourses(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchCourses()
  }, [search])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-plum border-t-transparent" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="rounded-lg bg-cream p-4 text-center text-tangerine">
        {error}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-ink">All Courses</h1>
        <p className="mt-1 text-sm text-ink/60">Browse and enroll in courses</p>
      </div>

      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/50" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search courses..."
          className="w-full rounded-md border border-mist bg-white py-2 pl-10 pr-3 text-sm text-ink placeholder:text-ink/40 focus:border-plum focus:outline-none focus:ring-1 focus:ring-plum"
        />
      </div>

      {courses.length === 0 ? (
        <div className="rounded-lg bg-mist p-8 text-center text-ink/60">
          No courses found
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      )}
    </div>
  )
}
