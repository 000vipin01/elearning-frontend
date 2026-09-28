import { useState } from 'react'
import { BarChart3, TrendingUp, Users, Clock, Eye } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/index.js'

const dateRanges = ['7d', '30d', '90d']

const keyMetrics = [
  { label: 'Page Views', value: '48,293', change: '+12.5%', icon: Eye, positive: true },
  { label: 'Unique Visitors', value: '12,847', change: '+8.3%', icon: Users, positive: true },
  { label: 'Course Completions', value: '1,249', change: '+23.1%', icon: TrendingUp, positive: true },
  { label: 'Quiz Average Score', value: '82.4%', change: '-1.2%', icon: BarChart3, positive: false },
]

const enrollmentTrend = [
  { label: 'Mon', value: 45 },
  { label: 'Tue', value: 62 },
  { label: 'Wed', value: 78 },
  { label: 'Thu', value: 55 },
  { label: 'Fri', value: 91 },
  { label: 'Sat', value: 38 },
  { label: 'Sun', value: 52 },
]

const topCourses = [
  { id: 1, name: 'Introduction to Web Development', enrollments: 342, completionRate: 78, revenue: 12450 },
  { id: 2, name: 'Python for Data Science', enrollments: 289, completionRate: 65, revenue: 10200 },
  { id: 3, name: 'Data Structures & Algorithms', enrollments: 218, completionRate: 71, revenue: 8900 },
  { id: 4, name: 'UI/UX Design Fundamentals', enrollments: 156, completionRate: 83, revenue: 6780 },
  { id: 5, name: 'Advanced React Patterns', enrollments: 189, completionRate: 59, revenue: 8920 },
]

const engagementStats = [
  { label: 'Daily Active Users', value: '3,421' },
  { label: 'Average Session Time', value: '14m 32s' },
  { label: 'Bounce Rate', value: '24.8%' },
]

export default function AnalyticsPage() {
  const [selectedRange, setSelectedRange] = useState('7d')
  const maxTrendValue = Math.max(...enrollmentTrend.map((d) => d.value))

  return (
    <div className="space-y-8">
      {/* Page Title & Date Range */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-ink">Analytics</h1>
          <p className="mt-1 text-ink/60">Track platform performance and engagement</p>
        </div>
        <div className="flex gap-1 rounded-lg bg-mist p-1">
          {dateRanges.map((range) => (
            <button
              key={range}
              type="button"
              onClick={() => setSelectedRange(range)}
              className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                selectedRange === range
                  ? 'bg-plum text-white'
                  : 'text-ink/60 hover:text-ink'
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {keyMetrics.map((metric) => (
          <Card key={metric.label}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <p className="text-sm text-ink/60">{metric.label}</p>
                <metric.icon className="h-5 w-5 text-ink/40" />
              </div>
              <p className="mt-2 text-3xl font-bold text-ink">{metric.value}</p>
              <p className={`mt-1 text-sm font-medium ${metric.positive ? 'text-fern' : 'text-red-500'}`}>
                {metric.change} vs last period
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Enrollment Trend Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Enrollment Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex h-64 items-end gap-4">
            {enrollmentTrend.map((day) => (
              <div key={day.label} className="flex flex-1 flex-col items-center gap-2">
                <span className="text-xs font-medium text-ink/60">{day.value}</span>
                <div
                  className="w-full rounded-t-md bg-plum/80 transition-all hover:bg-plum"
                  style={{ height: `${(day.value / maxTrendValue) * 100}%` }}
                />
                <span className="text-xs text-ink/50">{day.label}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Top Courses & Engagement */}
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Top Courses Table */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Top Courses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-ink/10">
                    <th className="pb-3 text-left text-sm font-semibold text-ink/70">Course</th>
                    <th className="pb-3 text-left text-sm font-semibold text-ink/70">Enrollments</th>
                    <th className="pb-3 text-left text-sm font-semibold text-ink/70">Completion</th>
                    <th className="pb-3 text-left text-sm font-semibold text-ink/70">Revenue</th>
                  </tr>
                </thead>
                <tbody>
                  {topCourses.map((course) => (
                    <tr key={course.id} className="border-b border-ink/5 last:border-0">
                      <td className="py-4 pr-4">
                        <span className="font-medium text-ink">{course.name}</span>
                      </td>
                      <td className="py-4 pr-4 text-ink/70">{course.enrollments}</td>
                      <td className="py-4 pr-4">
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-20 rounded-full bg-mist">
                            <div
                              className="h-2 rounded-full bg-fern"
                              style={{ width: `${course.completionRate}%` }}
                            />
                          </div>
                          <span className="text-sm text-ink/70">{course.completionRate}%</span>
                        </div>
                      </td>
                      <td className="py-4 text-ink/70">${course.revenue.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Student Engagement */}
        <Card>
          <CardHeader>
            <CardTitle>Student Engagement</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {engagementStats.map((stat) => (
                <div key={stat.label} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-sage p-2">
                      <Clock className="h-5 w-5 text-fern" />
                    </div>
                    <span className="text-sm text-ink/70">{stat.label}</span>
                  </div>
                  <span className="text-lg font-bold text-ink">{stat.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
