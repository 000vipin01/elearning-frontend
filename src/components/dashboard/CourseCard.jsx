import { Card, CardContent, CardHeader, CardTitle, Badge } from '../ui/index.js'
import { Clock, BookOpen } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function CourseCard({ course }) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <div>
            <Badge variant="info">{course.category || 'General'}</Badge>
            <CardTitle className="mt-2">{course.title}</CardTitle>
          </div>
        </div>
        <p className="text-sm text-ink/60">{course.instructor?.name || 'Unknown Instructor'}</p>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-ink/60 line-clamp-2">{course.description || 'No description available.'}</p>

        <div className="flex items-center gap-4 text-sm text-ink/60">
          <span className="flex items-center gap-1">
            <BookOpen className="h-4 w-4" />
            {course.category || 'General'}
          </span>
          {course.createdAt && (
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {formatDate(course.createdAt)}
            </span>
          )}
        </div>

        <Link
          to={`/courses/${course.id}`}
          className="inline-flex items-center gap-1 text-sm font-medium text-plum hover:underline"
        >
          View Details →
        </Link>
      </CardContent>
    </Card>
  )
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}
