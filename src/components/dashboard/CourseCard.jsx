import { Card, CardContent, CardHeader, CardTitle, Badge } from '../ui/index.js'
import { Clock, BookOpen } from 'lucide-react'
import ProgressBar from './ProgressBar.jsx'

const statusColors = {
  'in-progress': 'info',
  'completed': 'success',
  'not-started': 'default',
}

export default function CourseCard({ course, showProgress = true }) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <div>
            <Badge variant={statusColors[course.status] || 'default'}>{course.status.replace('-', ' ')}</Badge>
            <CardTitle className="mt-2">{course.title}</CardTitle>
          </div>
        </div>
        <p className="text-sm text-gray-500">{course.instructor}</p>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <span className="flex items-center gap-1">
            <BookOpen className="h-4 w-4" />
            {course.totalLessons} lessons
          </span>
          {course.lastAccessed && (
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {formatDate(course.lastAccessed)}
            </span>
          )}
        </div>

        {showProgress && (
          <div className="space-y-1.5">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Progress</span>
              <span className="font-medium text-gray-900">{course.progress}%</span>
            </div>
            <ProgressBar value={course.progress} />
            <p className="text-xs text-gray-400">
              {course.completedLessons} of {course.totalLessons} lessons completed
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  })
}
