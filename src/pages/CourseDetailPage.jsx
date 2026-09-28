import { useParams, Link } from 'react-router-dom'
import { Clock, BookOpen, CheckCircle, PlayCircle, Users, BarChart3 } from 'lucide-react'
import { Button, Badge, Card, CardContent, CardHeader, CardTitle } from '../components/ui/index.js'
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
    description:
      'Master machine learning from the ground up. Cover supervised and unsupervised learning, neural networks, and real-world model deployment with hands-on projects.',
    duration: '18 hours',
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
    description:
      'Build production-ready React applications with hooks, context, suspense, and modern tooling. Includes performance patterns and testing strategies.',
    duration: '12 hours',
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
    description:
      'Learn to design scalable, resilient cloud systems. Covers core services, networking, security, and cost optimization across major providers.',
    duration: '14 hours',
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
    description:
      'Apply design thinking frameworks to solve real product problems. From user research to prototyping and usability testing.',
    duration: '10 hours',
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

export default function CourseDetailPage() {
  const { id } = useParams()
  const course = allCourses.find((c) => c.id === Number(id))

  if (!course) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <h2 className="text-xl font-semibold text-ink">Course not found</h2>
        <p className="mt-2 text-sm text-ink/60">The course you're looking for doesn't exist.</p>
        <Link to="/courses" className="mt-4">
          <Button variant="primary">Back to Courses</Button>
        </Link>
      </div>
    )
  }

  const lessons = getLessons(course)
  const isEnrolled = course.status !== 'not-started'

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="rounded-xl bg-gradient-to-br from-plum to-plum/80 p-8 text-white">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-3">
            <Badge className="bg-white/20 text-white">{course.category}</Badge>
            <h1 className="text-3xl font-bold">{course.title}</h1>
            <p className="text-white/80">by {course.instructor}</p>
            <div className="flex flex-wrap items-center gap-4 text-sm text-white/70">
              <span className="flex items-center gap-1">
                <BookOpen className="h-4 w-4" />
                {course.totalLessons} lessons
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {course.duration || `${Math.round(course.totalLessons * 0.5)} hours`}
              </span>
              <span className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                {course.status === 'completed' ? 'Completed' : course.status === 'in-progress' ? 'In Progress' : 'Not Started'}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {isEnrolled ? (
              <Link to={`/courses/${course.id}/lessons/${course.completedLessons + 1}`}>
                <Button variant="secondary" size="lg" className="bg-white text-plum hover:bg-white/90">
                  Continue Learning
                </Button>
              </Link>
            ) : (
              <Button variant="secondary" size="lg" className="bg-white text-plum hover:bg-white/90">
                Enroll Now
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Main content */}
        <div className="space-y-8 lg:col-span-2">
          {/* Description */}
          <Card>
            <CardHeader>
              <CardTitle>About this course</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed text-ink/70">
                {course.description ||
                  `This comprehensive course covers everything you need to know about ${course.category}. Learn at your own pace with hands-on exercises, real-world projects, and expert instruction from ${course.instructor}.`}
              </p>
            </CardContent>
          </Card>

          {/* Lessons */}
          <Card>
            <CardHeader>
              <CardTitle>Course Content</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {lessons.map((lesson) => (
                  <Link
                    key={lesson.number}
                    to={`/courses/${course.id}/lessons/${lesson.number}`}
                    className="flex items-center gap-3 rounded-lg border border-mist px-4 py-3 transition-colors hover:bg-mist/50"
                  >
                    {lesson.completed ? (
                      <CheckCircle className="h-5 w-5 flex-shrink-0 text-fern" />
                    ) : (
                      <PlayCircle className="h-5 w-5 flex-shrink-0 text-plum" />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-medium ${lesson.completed ? 'text-ink/50 line-through' : 'text-ink'}`}>
                        {lesson.title}
                      </p>
                    </div>
                    <span className="text-xs text-ink/40">Lesson {lesson.number}</span>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {isEnrolled && (
            <Card>
              <CardHeader>
                <CardTitle>Your Progress</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <ProgressBar value={course.progress} size="lg" />
                <div className="flex justify-between text-sm">
                  <span className="text-ink/60">{course.completedLessons} of {course.totalLessons} lessons</span>
                  <span className="font-medium text-ink">{course.progress}%</span>
                </div>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Course Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 text-ink/60">
                  <BarChart3 className="h-4 w-4" />
                  Level
                </span>
                <span className="font-medium text-ink">Intermediate</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 text-ink/60">
                  <Clock className="h-4 w-4" />
                  Duration
                </span>
                <span className="font-medium text-ink">{course.duration || `${Math.round(course.totalLessons * 0.5)} hours`}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 text-ink/60">
                  <BookOpen className="h-4 w-4" />
                  Lessons
                </span>
                <span className="font-medium text-ink">{course.totalLessons}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
