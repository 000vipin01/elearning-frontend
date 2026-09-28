import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { api } from '../services/api.js'
import { useAuth } from '../context/AuthContext.jsx'
import { Card, CardContent, CardHeader, CardTitle, Badge, Button } from '../components/ui/index.js'
import { BookOpen, CheckCircle, PlayCircle, ArrowLeft } from 'lucide-react'

export default function CourseDetailPage() {
  const { courseId } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const [course, setCourse] = useState(null)
  const [lessons, setLessons] = useState([])
  const [enrollment, setEnrollment] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [courseData, lessonsData] = await Promise.all([
          api.getCourse(courseId),
          api.getLessons(courseId),
        ])
        setCourse(courseData)
        setLessons(lessonsData)

        if (user?.role === 'STUDENT') {
          try {
            const enrollData = await api.getEnrollmentDetails(courseId)
            setEnrollment(enrollData)
          } catch {
            // Not enrolled
          }
        }
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [courseId, user])

  const handleEnroll = async () => {
    try {
      await api.enroll(courseId)
      const enrollData = await api.getEnrollmentDetails(courseId)
      setEnrollment(enrollData)
    } catch (err) {
      setError(err.message)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-plum border-t-transparent" />
      </div>
    )
  }

  if (error || !course) {
    return (
      <div className="rounded-lg bg-cream p-4 text-center text-tangerine">
        {error || 'Course not found'}
      </div>
    )
  }

  const isEnrolled = !!enrollment
  const completedLessons = enrollment?.completedLessons || 0
  const totalLessons = lessons.length

  return (
    <div className="space-y-6">
      <Link to="/courses" className="inline-flex items-center gap-2 text-sm text-ink/60 hover:text-ink">
        <ArrowLeft className="h-4 w-4" />
        Back to Courses
      </Link>

      {/* Course Header */}
      <div className="rounded-xl bg-gradient-to-r from-plum to-plum/80 p-6 text-white sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-2">
            <Badge variant="default">{course.category || 'General'}</Badge>
            <h1 className="text-2xl font-bold sm:text-3xl">{course.title}</h1>
            <p className="text-white/80">{course.instructor?.name || 'Unknown Instructor'}</p>
            <div className="flex items-center gap-4 text-sm text-white/70">
              <span className="flex items-center gap-1">
                <BookOpen className="h-4 w-4" />
                {totalLessons} lessons
              </span>
            </div>
          </div>
          {user?.role === 'STUDENT' && (
            <div>
              {isEnrolled ? (
                <Button variant="secondary" size="lg" onClick={() => navigate(`/courses/${courseId}/lessons/${lessons[0]?.id}`)}>
                  Continue Learning
                </Button>
              ) : (
                <Button variant="primary" size="lg" onClick={handleEnroll}>
                  Enroll Now
                </Button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Progress */}
      {isEnrolled && (
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-ink/70">Progress</span>
              <span className="font-medium text-ink">{enrollment?.enrollment?.progress || 0}%</span>
            </div>
            <div className="mt-2 h-2 w-full rounded-full bg-mist">
              <div
                className="h-2 rounded-full bg-plum transition-all duration-500"
                style={{ width: `${enrollment?.enrollment?.progress || 0}%` }}
              />
            </div>
            <p className="mt-1 text-xs text-ink/50">
              {completedLessons} of {totalLessons} lessons completed
            </p>
          </CardContent>
        </Card>
      )}

      {/* Description */}
      <Card>
        <CardHeader>
          <CardTitle>About this course</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-ink/70">{course.description || 'No description available.'}</p>
        </CardContent>
      </Card>

      {/* Lessons */}
      <Card>
        <CardHeader>
          <CardTitle>Course Content</CardTitle>
        </CardHeader>
        <CardContent>
          {lessons.length === 0 ? (
            <p className="text-sm text-ink/60">No lessons available yet.</p>
          ) : (
            <div className="space-y-2">
              {lessons.map((lesson, index) => {
                const isCompleted = index < completedLessons
                const canAccess = isEnrolled || user?.role === 'INSTRUCTOR'
                return (
                  <div
                    key={lesson.id}
                    className="flex items-center justify-between rounded-lg border border-mist p-3"
                  >
                    <div className="flex items-center gap-3">
                      {isCompleted ? (
                        <CheckCircle className="h-5 w-5 text-fern" />
                      ) : (
                        <PlayCircle className="h-5 w-5 text-ink/40" />
                      )}
                      <div>
                        <p className="text-sm font-medium text-ink">
                          {index + 1}. {lesson.title}
                        </p>
                        {lesson.durationMinutes && (
                          <p className="text-xs text-ink/50">{lesson.durationMinutes} min</p>
                        )}
                      </div>
                    </div>
                    {canAccess && (
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => navigate(`/courses/${courseId}/lessons/${lesson.id}`)}
                      >
                        {isCompleted ? 'Review' : 'Start'}
                      </Button>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
