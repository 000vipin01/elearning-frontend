import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { api } from '../services/api.js'
import { useAuth } from '../context/AuthContext.jsx'
import { Card, CardContent, Button } from '../components/ui/index.js'
import { ArrowLeft, ArrowRight, CheckCircle, PlayCircle } from 'lucide-react'

export default function LessonPlayerPage() {
  const { courseId, lessonId } = useParams()
  const navigate = useNavigate()
  const [course, setCourse] = useState(null)
  const [lessons, setLessons] = useState([])
  const [currentLesson, setCurrentLesson] = useState(null)
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

        const lesson = lessonsData.find((l) => l.id === parseInt(lessonId))
        if (lesson) {
          setCurrentLesson(lesson)
        }
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [courseId, lessonId])

  const handleMarkComplete = async () => {
    try {
      const totalLessons = lessons.length
      const currentIndex = lessons.findIndex((l) => l.id === parseInt(lessonId))
      const newProgress = Math.round(((currentIndex + 1) / totalLessons) * 100)
      await api.updateProgress(courseId, newProgress)
    } catch (err) {
      setError(err.message)
    }
  }

  const goToLesson = (id) => {
    navigate(`/courses/${courseId}/lessons/${id}`)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-plum border-t-transparent" />
      </div>
    )
  }

  if (error || !currentLesson) {
    return (
      <div className="rounded-lg bg-cream p-4 text-center text-tangerine">
        {error || 'Lesson not found'}
      </div>
    )
  }

  const currentIndex = lessons.findIndex((l) => l.id === parseInt(lessonId))
  const nextLesson = currentIndex < lessons.length - 1 ? lessons[currentIndex + 1] : null

  return (
    <div className="space-y-6">
      <Link to={`/courses/${courseId}`} className="inline-flex items-center gap-2 text-sm text-ink/60 hover:text-ink">
        <ArrowLeft className="h-4 w-4" />
        Back to Course
      </Link>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main content */}
        <div className="space-y-6 lg:col-span-2">
          {/* Video placeholder */}
          <div className="flex aspect-video items-center justify-center rounded-xl bg-ink">
            <div className="text-center text-white">
              <PlayCircle className="mx-auto h-16 w-16 text-white/50" />
              <p className="mt-2 text-sm text-white/70">Video Player Placeholder</p>
            </div>
          </div>

          {/* Lesson info */}
          <div>
            <h1 className="text-2xl font-bold text-ink">{currentLesson.title}</h1>
            <p className="mt-1 text-sm text-ink/60">
              {course?.title} • Lesson {currentIndex + 1} of {lessons.length}
            </p>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Button variant="primary" onClick={handleMarkComplete}>
              <CheckCircle className="h-4 w-4" />
              Mark as Complete
            </Button>
            {nextLesson && (
              <Button variant="secondary" onClick={() => goToLesson(nextLesson.id)}>
                Next Lesson
                <ArrowRight className="h-4 w-4" />
              </Button>
            )}
          </div>

          {/* Lesson content */}
          {currentLesson.content && (
            <Card>
              <CardContent className="p-6">
                <p className="whitespace-pre-wrap text-sm text-ink/70">{currentLesson.content}</p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar - lesson list */}
        <div>
          <Card>
            <CardContent className="p-4">
              <h3 className="mb-3 text-sm font-semibold text-ink">Course Content</h3>
              <div className="space-y-1">
                {lessons.map((lesson, index) => (
                  <button
                    key={lesson.id}
                    onClick={() => goToLesson(lesson.id)}
                    className={`flex w-full items-center gap-2 rounded-lg p-2 text-left text-sm transition-colors ${
                      lesson.id === parseInt(lessonId)
                        ? 'bg-plum/10 text-plum'
                        : 'text-ink/70 hover:bg-mist'
                    }`}
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-mist text-xs">
                      {index + 1}
                    </span>
                    <span className="truncate">{lesson.title}</span>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
