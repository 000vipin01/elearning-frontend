import { Card, CardContent, Badge, Button } from '../ui/index.js'
import { FileQuestion, Clock } from 'lucide-react'

export default function UpcomingQuizzes({ quizzes = [] }) {
  if (quizzes.length === 0) {
    return (
      <section>
        <div className="mb-4 flex items-center gap-2">
          <FileQuestion className="h-5 w-5 text-plum" />
          <h2 className="text-lg font-semibold text-ink">Upcoming Quizzes</h2>
        </div>
        <p className="text-sm text-ink/60">No quizzes available.</p>
      </section>
    )
  }

  return (
    <section>
      <div className="mb-4 flex items-center gap-2">
        <FileQuestion className="h-5 w-5 text-plum" />
        <h2 className="text-lg font-semibold text-ink">Upcoming Quizzes</h2>
      </div>
      <div className="space-y-3">
        {quizzes.map((quiz) => (
          <Card key={quiz.id}>
            <CardContent className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-ink">{quiz.title}</p>
                  <Badge variant="warning">{quiz.status}</Badge>
                </div>
                <p className="text-xs text-ink/60">{quiz.courseTitle}</p>
                <div className="flex items-center gap-4 text-xs text-ink/50">
                  <span>Due: {quiz.dueDate}</span>
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
