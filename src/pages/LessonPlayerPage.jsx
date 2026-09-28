import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Play, CheckCircle, Circle, ChevronLeft, ChevronRight, BookOpen, Clock } from 'lucide-react'
import { Button, Card, CardContent, CardHeader, CardTitle, Badge } from '../components/ui/index.js'
import ProgressBar from '../components/dashboard/ProgressBar.jsx'
import { enrolledCourses } from '../data/mockData.js'

const additionalCourses = [
  {
    id: 5,
    title: 'Machine Learning A-Z',
    instructor: 'Dr. Aisha Patel',
    thumbnail: null,
    progress: 0,
    totalLessons: 36,
    completedLessons: 0,
    lastAccessed: null,
    category: 'Data Science',
    status: 'not-started',
  },
  {
    id: 6,
    title: 'React & Modern Frontend',
    instructor: 'Marcus Thompson',
    thumbnail: null,
    progress: 0,
    totalLessons: 22,
    completedLessons: 0,
    lastAccessed: null,
    category: 'Web Development',
    status: 'not-started',
  },
  {
    id: 7,
    title: 'Cloud Architecture Basics',
    instructor: 'Sofia Lindqvist',
    thumbnail: null,
    progress: 0,
    totalLessons: 20,
    completedLessons: 0,
    lastAccessed: null,
    category: 'Computer Science',
    status: 'not-started',
  },
  {
    id: 8,
    title: 'Product Design Thinking',
    instructor: 'Daniel Okafor',
    thumbnail: null,
    progress: 0,
    totalLessons: 16,
    completedLessons: 0,
    lastAccessed: null,
    category: 'Design',
    status: 'not-started',
  },
]

const allCourses = [...enrolledCourses, ...additionalCourses]

const lessonTitles = {
  1: ['Welcome & Course Overview', 'HTML Fundamentals', 'Semantic HTML', 'CSS Basics', 'CSS Flexbox & Grid', 'Responsive Design', 'JavaScript Essentials', 'DOM Manipulation', 'Events & Interactivity', 'Forms & Validation', 'APIs & Fetch', 'Async JavaScript', 'ES6+ Features', 'Module Systems', 'Build Tools Intro', 'Version Control with Git', 'Testing Basics', 'Performance Optimization', 'Accessibility', 'SEO Fundamentals', 'Deployment', 'Final Project', 'Course Wrap-up', 'Next Steps'],
  2: ['What is Data Structures?', 'Arrays & Strings', 'Linked Lists', 'Stacks & Queues', 'Hash Tables', 'Trees & BST', 'Heaps', 'Graphs', 'Sorting Algorithms', 'Searching Algorithms', 'Recursion', 'Dynamic Programming', 'Greedy Algorithms', 'Divide & Conquer', 'Time Complexity', 'Space Complexity', 'Amortized Analysis', 'Advanced Trees', 'Graph Traversals', 'Shortest Path', 'Minimum Spanning Trees', 'NP-Completeness', 'Practice Problems', 'Final Assessment'],
  3: ['Design Thinking Overview', 'User Research Methods', 'Personas & Empathy Maps', 'User Journey Mapping', 'Ideation Techniques', 'Wireframing', 'Visual Design Principles', 'Typography & Color', 'Prototyping', 'Usability Testing', 'Design Systems', 'Interaction Design', 'Mobile Design', 'Accessibility in Design', 'Portfolio Project', 'Course Wrap-up'],
  4: ['Python Refresher', 'NumPy Fundamentals', 'Pandas DataFrame Basics', 'Data Cleaning', 'Exploratory Data Analysis', 'Data Visualization', 'Statistical Foundations', 'Linear Regression', 'Classification', 'Clustering', 'Model Evaluation', 'Feature Engineering', 'Working with APIs', 'Time Series Basics', 'Final Project', 'Next Steps'],
  5: ['ML Landscape', 'Linear Models', 'Logistic Regression', 'Decision Trees', 'Random Forests', 'Gradient Boosting', 'Support Vector Machines', 'Neural Networks Intro', 'Deep Learning', 'CNNs', 'RNNs', 'Unsupervised Learning', 'Dimensionality Reduction', 'Model Selection', 'Hyperparameter Tuning', 'Deployment Basics', 'Ethics in ML', 'Capstone Project', 'Advanced Topics', 'Industry Applications', 'Research Directions', 'Final Review'],
  6: ['React Fundamentals', 'Components & Props', 'State & Lifecycle', 'Hooks Deep Dive', 'Context API', 'Suspense & Lazy', 'Routing', 'Data Fetching', 'Forms in React', 'Performance Patterns', 'Testing React', 'State Management', 'Server Components', 'Build & Deploy', 'Real-world Patterns', 'Design Systems', 'Animation', 'Accessibility', 'Final Project', 'Course Wrap-up'],
  7: ['Cloud Fundamentals', 'Compute Services', 'Storage Solutions', 'Networking', 'Security & Identity', 'Databases in the Cloud', 'Serverless', 'Containers', 'Kubernetes Basics', 'Infrastructure as Code', 'Monitoring & Logging', 'Cost Optimization', 'High Availability', 'Disaster Recovery', 'Hybrid Cloud', 'Edge Computing', 'Case Studies', 'Certification Prep', 'Final Project', 'Course Wrap-up'],
  8: ['Design Thinking Process', 'Empathize', 'Define', 'Ideate', 'Prototype', 'Test', 'User Interviews', 'Survey Design', 'Journey Mapping', 'Service Blueprinting', 'Rapid Prototyping', 'Usability Heuristics', 'A/B Testing', 'Design Sprints', 'Portfolio Review', 'Next Steps'],
}

function getLessons(course) {
  const titles = lessonTitles[course.id] || []
  return Array.from({ length: course.totalLessons }, (_, i) => ({
    number: i + 1,
    title: titles[i] || `Lesson ${i + 1}`,
    completed: i < course.completedLessons,
  }))
}

export default function LessonPlayerPage() {
  const { courseId, lessonNumber } = useParams()
  const course = allCourses.find((c) => c.id === Number(courseId))
  const currentLessonNum = Number(lessonNumber)

  const [completedLessons, setCompletedLessons] = useState(() => {
    if (!course) return new Set()
    const lessons = getLessons(course)
    return new Set(lessons.filter((l) => l.completed).map((l) => l.number))
  })

  if (!course) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <h2 className="text-xl font-semibold text-ink">Course not found</h2>
        <Link to="/courses" className="mt-4">
          <Button variant="primary">Back to Courses</Button>
        </Link>
      </div>
    )
  }

  const lessons = getLessons(course)
  const currentLesson = lessons.find((l) => l.number === currentLessonNum) || lessons[0]
  const isCompleted = completedLessons.has(currentLessonNum)
  const isFirst = currentLessonNum === 1
  const isLast = currentLessonNum === course.totalLessons

  const toggleComplete = () => {
    setCompletedLessons((prev) => {
      const next = new Set(prev)
      if (next.has(currentLessonNum)) {
        next.delete(currentLessonNum)
      } else {
        next.add(currentLessonNum)
      }
      return next
    })
  }

  const progress = Math.round((completedLessons.size / course.totalLessons) * 100)

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-ink/50">
        <Link to="/courses" className="hover:text-plum">Courses</Link>
        <span>/</span>
        <Link to={`/courses/${course.id}`} className="hover:text-plum">{course.title}</Link>
        <span>/</span>
        <span className="text-ink">Lesson {currentLessonNum}</span>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main content */}
        <div className="space-y-6 lg:col-span-2">
          {/* Video placeholder */}
          <div className="flex aspect-video flex-col items-center justify-center rounded-xl bg-ink/90 text-white">
            <Play className="h-16 w-16 text-white/60" />
            <p className="mt-4 text-lg font-medium">{currentLesson.title}</p>
            <p className="mt-1 text-sm text-white/50">Video player placeholder</p>
          </div>

          {/* Lesson info */}
          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-2">
                <Badge variant="info">{course.category}</Badge>
                <span className="text-sm text-ink/50">
                  Lesson {currentLessonNum} of {course.totalLessons}
                </span>
              </div>
              <h1 className="mt-2 text-2xl font-bold text-ink">{currentLesson.title}</h1>
              <p className="mt-1 text-sm text-ink/60">{course.title} &middot; {course.instructor}</p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Button
                variant={isCompleted ? 'secondary' : 'primary'}
                onClick={toggleComplete}
              >
                <CheckCircle className="h-4 w-4" />
                {isCompleted ? 'Completed' : 'Mark as Complete'}
              </Button>

              <div className="flex items-center gap-2">
                <Link to={`/courses/${course.id}/lessons/${currentLessonNum - 1}`}>
                  <Button variant="secondary" disabled={isFirst}>
                    <ChevronLeft className="h-4 w-4" />
                    Previous
                  </Button>
                </Link>
                <Link to={`/courses/${course.id}/lessons/${currentLessonNum + 1}`}>
                  <Button variant="secondary" disabled={isLast}>
                    Next
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Progress */}
          <Card>
            <CardContent className="space-y-3 pt-6">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-ink">Course Progress</span>
                <span className="text-ink/60">{completedLessons.size} of {course.totalLessons} lessons &middot; {progress}%</span>
              </div>
              <ProgressBar value={progress} size="lg" />
            </CardContent>
          </Card>
        </div>

        {/* Sidebar - lesson list */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Lessons</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="max-h-[600px] space-y-1 overflow-y-auto pr-2">
                {lessons.map((lesson) => {
                  const isCurrent = lesson.number === currentLessonNum
                  const isLessonCompleted = completedLessons.has(lesson.number)

                  return (
                    <Link
                      key={lesson.number}
                      to={`/courses/${course.id}/lessons/${lesson.number}`}
                      className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                        isCurrent
                          ? 'bg-plum/10 font-medium text-plum'
                          : 'text-ink/70 hover:bg-mist/50'
                      }`}
                    >
                      {isLessonCompleted ? (
                        <CheckCircle className="h-4 w-4 flex-shrink-0 text-fern" />
                      ) : isCurrent ? (
                        <Play className="h-4 w-4 flex-shrink-0 text-plum" />
                      ) : (
                        <Circle className="h-4 w-4 flex-shrink-0 text-ink/30" />
                      )}
                      <span className="flex-1 truncate">{lesson.title}</span>
                      <span className="text-xs text-ink/40">{lesson.number}</span>
                    </Link>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="space-y-2 pt-6">
              <div className="flex items-center gap-2 text-sm text-ink/60">
                <BookOpen className="h-4 w-4" />
                <span>{course.totalLessons} lessons</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-ink/60">
                <Clock className="h-4 w-4" />
                <span>{course.duration || `${Math.round(course.totalLessons * 0.5)} hours`}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
