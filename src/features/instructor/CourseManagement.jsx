import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Edit, Trash2, Eye } from 'lucide-react'
import { api } from '../../shared/api/client.js'

export default function CourseManagement() {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/courses/instructor/mine').then((res) => {
      setCourses(res)
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [])

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this course?')) return
    try {
      await api.delete(`/courses/${id}`)
      setCourses(courses.filter((c) => c.id !== id))
    } catch (err) {
      alert(err.message)
    }
  }

  const handlePublish = async (id) => {
    try {
      await api.post(`/courses/${id}/publish`)
      setCourses(courses.map((c) => c.id === id ? { ...c, status: 'PUBLISHED' } : c))
    } catch (err) {
      alert(err.message)
    }
  }

  if (loading) {
    return <div className="h-96 animate-pulse rounded-xl bg-[var(--border)]" />
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-bold text-[var(--text)]">My Courses</h1>
        <Link
          to="/instructor/courses/new"
          className="flex items-center gap-2 rounded-lg bg-[var(--primary)] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[var(--primary-hover)]"
        >
          <Plus size={18} /> New Course
        </Link>
      </div>

      {courses.length === 0 ? (
        <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-12 text-center">
          <p className="text-[var(--text-muted)]">No courses yet. Create your first course!</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-[var(--border)] bg-[var(--surface)]">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[var(--border)] bg-[var(--bg)]">
                <th className="px-4 py-3 text-left text-sm font-medium text-[var(--text-muted)]">Title</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-[var(--text-muted)]">Category</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-[var(--text-muted)]">Price</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-[var(--text-muted)]">Status</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-[var(--text-muted)]">Lessons</th>
                <th className="px-4 py-3 text-right text-sm font-medium text-[var(--text-muted)]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course) => (
                <tr key={course.id} className="border-b border-[var(--border)] last:border-0">
                  <td className="px-4 py-3">
                    <Link to={`/instructor/courses/${course.id}`} className="font-medium text-[var(--text)] hover:text-[var(--primary)]">
                      {course.title}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-sm text-[var(--text-muted)]">{course.category}</td>
                  <td className="px-4 py-3 text-sm text-[var(--text)]">
                    {course.price === 0 ? 'Free' : `₹${course.price}`}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                      course.status === 'PUBLISHED'
                        ? 'bg-green-100 text-green-700'
                        : course.status === 'DRAFT'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {course.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-[var(--text-muted)]">{course.lessonCount}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <Link to={`/instructor/courses/${course.id}`} className="rounded-lg p-2 text-[var(--text-muted)] hover:bg-[var(--border)]">
                        <Eye size={16} />
                      </Link>
                      {course.status === 'DRAFT' && (
                        <button
                          onClick={() => handlePublish(course.id)}
                          className="rounded-lg p-2 text-[var(--text-muted)] hover:bg-[var(--border)]"
                        >
                          <Edit size={16} />
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(course.id)}
                        className="rounded-lg p-2 text-red-500 hover:bg-red-50"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
