import { Card, CardContent, CardHeader, CardTitle } from '../ui/index.js'
import { History } from 'lucide-react'
import { recentCourses } from '../../data/mockData.js'

export default function RecentCourses() {
  return (
    <section>
      <div className="mb-4 flex items-center gap-2">
        <History className="h-5 w-5 text-plum" />
        <h2 className="text-lg font-semibold text-ink">Recently Viewed</h2>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Your recent activity</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {recentCourses.map((course) => (
            <div key={course.id} className="flex items-center justify-between rounded-lg p-3 hover:bg-mist">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-mist">
                  <span className="text-xs font-bold text-ink/60">
                    {course.title.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium text-ink">{course.title}</p>
                  <p className="text-xs text-ink/60">{course.instructor} &middot; {course.category}</p>
                </div>
              </div>
              <span className="text-xs text-ink/50">{course.lastViewed}</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </section>
  )
}
