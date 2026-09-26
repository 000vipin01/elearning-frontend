import { Card, CardContent, Badge, Button } from '../ui/index.js'
import { FileQuestion, Clock } from 'lucide-react'
import { upcomingQuizzes } from '../../data/mockData.js'

export default function UpcomingQuizzes() {
  return (
    <section>
      <div className="mb-4 flex items-center gap-2">
        <FileQuestion className="h-5 w-5 text-indigo-600" />
        <h2 className="text-lg font-semibold text-gray-900">Upcoming Quizzes</h2>
      </div>
      <div className="space-y-3">
        {upcomingQuizzes.map((quiz) => (
          <Card key={quiz.id}>
            <CardContent className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-gray-900">{quiz.title}</p>
                  <Badge variant="warning">{quiz.status}</Badge>
                </div>
                <p className="text-xs text-gray-500">{quiz.courseTitle}</p>
                <div className="flex items-center gap-4 text-xs text-gray-400">
                  <span>Due: {formatDate(quiz.dueDate)}</span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {quiz.duration} min
                  </span>
                  <span>{quiz.totalQuestions} questions</span>
                </div>
              </div>
              <Button variant="secondary" size="sm" to={`/courses/${quiz.courseId}/quizzes/${quiz.id}`} className="shrink-0">
                Start Quiz
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}
