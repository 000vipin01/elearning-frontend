import { Card, CardContent, CardTitle, Button } from '../ui/index.js'
import { PlayCircle } from 'lucide-react'
import ProgressBar from './ProgressBar.jsx'

export default function ContinueLearning({ enrollments = [] }) {
  const inProgress = enrollments.filter((e) => e.progress > 0 && e.progress < 100)

  if (inProgress.length === 0) {
    return (
      <section>
        <div className="mb-4 flex items-center gap-2">
          <PlayCircle className="h-5 w-5 text-plum" />
          <h2 className="text-lg font-semibold text-ink">Continue Learning</h2>
        </div>
        <p className="text-sm text-ink/60">Start learning to see your progress here.</p>
      </section>
    )
  }

  return (
    <section>
      <div className="mb-4 flex items-center gap-2">
        <PlayCircle className="h-5 w-5 text-plum" />
        <h2 className="text-lg font-semibold text-ink">Continue Learning</h2>
      </div>
      <div className="space-y-4">
        {inProgress.map((enrollment) => (
          <Card key={enrollment.id}>
            <CardContent className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="flex-1 space-y-2">
                <CardTitle className="text-base">{enrollment.course?.title}</CardTitle>
                <div className="flex items-center gap-3">
                  <div className="flex-1">
                    <ProgressBar value={enrollment.progress} size="sm" />
                  </div>
                  <span className="text-sm font-medium text-ink">{enrollment.progress}%</span>
                </div>
              </div>
              <Button to={`/courses/${enrollment.course?.id}/lessons/${enrollment.nextLessonId || 1}`} className="shrink-0">
                Resume
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
