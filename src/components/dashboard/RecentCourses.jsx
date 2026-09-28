import { Card, CardContent, CardHeader, CardTitle } from '../ui/index.js'
import { History } from 'lucide-react'

export default function RecentCourses({ enrollments = [] }) {
  const recent = enrollments.slice(0, 3)

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
          {recent.length === 0 ? (
            <p className="text-sm text-ink/60">No recent activity.</p>
          ) : (
            recent.map((enrollment) => (
              <div key={enrollment.id} className="flex items-center justify-between rounded-lg p-3 hover:bg-mist">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-mist">
                    <span className="text-xs font-bold text-ink/60">
                      {enrollment.course?.title?.charAt(0) || 'C'}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-ink">{enrollment.course?.title}</p>
                    <p className="text-xs text-ink/60">{enrollment.course?.instructor?.name || 'Unknown'}</p>
                  </div>
                </div>
                <span className="text-xs text-ink/50">{enrollment.progress}%</span>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </section>
  )
}
