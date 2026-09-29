import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { BookOpen, Clock, Users, Play, CheckCircle, Lock } from 'lucide-react'
import { api } from '../../shared/api/client.js'
import { useAuth } from '../../shared/auth/AuthContext.jsx'

export default function CourseDetail() {
  const { courseId } = useParams()
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()
  const [course, setCourse] = useState(null)
  const [lessons, setLessons] = useState([])
  const [enrollment, setEnrollment] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      api.get(`/courses/${courseId}`),
      api.get(`/courses/${courseId}/lessons`),
    ]).then(([courseRes, lessonsRes]) => {
      setCourse(courseRes)
      setLessons(lessonsRes)
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [courseId])

  useEffect(() => {
    if (isAuthenticated) {
      api.get(`/enrollments/${courseId}`).then(setEnrollment).catch(() => {})
    }
  }, [courseId, isAuthenticated])

  const handleEnroll = async () => {
    if (!isAuthenticated) {
      navigate('/login')
      return
    }
    try {
      await api.post(`/enrollments/${courseId}`)
      setEnrollment({ progress: 0 })
    } catch (err) {
      alert(err.message)
    }
  }

  if (loading) {
    return <div className="h-96 animate-pulse rounded-xl bg-[var(--border)]" />
  }

  if (!course) {
    return <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-12 text-center">Course not found</div>
  }

  const isEnrolled = !!enrollment
  const isFree = course.price === 0

  return (
    <div className="space-y-6">
      {/* Course header */}
      <div className="rounded-2xl bg-[var(--hero)] p-6 sm:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex-1">
            <span className="rounded-full bg-[var(--primary)]/10 px-3 py-1 text-xs font-medium text-[var(--primary)]">
              {course.category}
            </span>
            <h1 className="mt-3 font-display text-2xl font-bold text-[var(--text)] sm:text-3xl">
              {course.title}
            </h1>
            <p className="mt-2 text-[var(--text-muted)]">{course.description}</p>
            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-[var(--text-muted)]">
              <span className="flex items-center gap-1"><BookOpen size={16} /> {course.lessonCount} lessons</span>
              <span className="flex items-center gap-1"><Users size={16} /> {course.enrollmentCount} students</span>
              <span className="flex items-center gap-1"><Clock size={16} /> {course.level}</span>
            </div>
          </div>
          <div className="flex flex-col items-start gap-3 lg:items-end">
            <span className="text-2xl font-bold text-[var(--primary)]">
              {isFree ? 'Free' : `₹${course.price}`}
            </span>
            {isEnrolled ? (
              <div className="flex items-center gap-2 rounded-lg bg-[var(--secondary)]/10 px-4 py-2 text-sm font-medium text-[var(--secondary)]">
                <CheckCircle size={18} /> Enrolled
              </div>
            ) : (
              <button
                onClick={handleEnroll}
                className="rounded-lg bg-[var(--primary)] px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--primary-hover)]"
              >
                {isFree ? 'Enroll Now' : 'Buy Now'}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Lessons list */}
      <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6">
        <h2 className="mb-4 font-display text-lg font-bold text-[var(--text)]">Course Content</h2>
        <div className="space-y-2">
          {lessons.map((lesson, index) => {
            const canWatch = isEnrolled || lesson.isFreePreview
            return (
              <div
                key={lesson.id}
                className={`flex items-center gap-3 rounded-lg border border-[var(--border)] p-3 ${
                  canWatch ? 'hover:bg-[var(--bg)]' : 'opacity-60'
                }`}
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--border)] text-sm font-medium">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-[var(--text)]">{lesson.title}</p>
                  <p className="text-xs text-[var(--text-muted)]">{lesson.durationMinutes} min</p>
                </div>
                {canWatch ? (
                  <Play size={18} className="text-[var(--primary)]" />
                ) : (
                  <Lock size={18} className="text-[var(--text-muted)]" />
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
