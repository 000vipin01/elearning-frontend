import { Card, CardContent, CardTitle, Button } from '../ui/index.js'
import { PlayCircle } from 'lucide-react'
import ProgressBar from './ProgressBar.jsx'
import { continueLearning } from '../../data/mockData.js'

export default function ContinueLearning() {
  return (
    <section>
      <div className="mb-4 flex items-center gap-2">
        <PlayCircle className="h-5 w-5 text-indigo-600" />
        <h2 className="text-lg font-semibold text-gray-900">Continue Learning</h2>
      </div>
      <div className="space-y-4">
        {continueLearning.map((item) => (
          <Card key={item.id}>
            <CardContent className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="flex-1 space-y-2">
                <CardTitle className="text-base">{item.title}</CardTitle>
                <p className="text-sm text-gray-600">
                  Lesson {item.lessonNumber} of {item.totalLessons}: {item.currentLesson}
                </p>
                <div className="flex items-center gap-3">
                  <div className="flex-1">
                    <ProgressBar value={item.progress} size="sm" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">{item.progress}%</span>
                </div>
                <p className="text-xs text-gray-400">{item.estimatedTime}</p>
              </div>
              <Button to={`/courses/${item.id}/lessons/${item.lessonNumber}`} className="shrink-0">
                Resume
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
