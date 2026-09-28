import { BookOpen, Users, Star, DollarSign, Plus, Edit, Eye } from 'lucide-react'
import { Button, Card, CardHeader, CardTitle, CardContent, Badge } from '../components/ui/index.js'
import { useAuth } from '../context/AuthContext.jsx'

const instructorCourses = [
  { id: 1, title: 'Introduction to Web Development', students: 342, rating: 4.8, status: 'published', revenue: 12450 },
  { id: 2, title: 'Advanced React Patterns', students: 189, rating: 4.9, status: 'published', revenue: 8920 },
  { id: 3, title: 'Node.js Microservices', students: 97, rating: 4.6, status: 'published', revenue: 4380 },
  { id: 4, title: 'TypeScript Deep Dive', students: 0, rating: 0, status: 'draft', revenue: 0 },
]

const recentActivity = [
  { id: 1, student: 'Maria Garcia', action: 'completed lesson "CSS Grid Layout"', course: 'Introduction to Web Development', time: '5 min ago' },
  { id: 2, student: 'James Wilson', action: 'enrolled in course', course: 'Advanced React Patterns', time: '12 min ago' },
  { id: 3, student: 'Aisha Patel', action: 'submitted quiz "React Hooks"', course: 'Advanced React Patterns', time: '28 min ago' },
  { id: 4, student: 'Tom Becker', action: 'left a 5-star review', course: 'Node.js Microservices', time: '1 hour ago' },
  { id: 5, student: 'Lisa Chen', action: 'completed lesson "Docker Basics"', course: 'Node.js Microservices', time: '2 hours ago' },
]

const stats = [
  { label: 'Total Courses', value: '4', icon: BookOpen, color: 'text-plum' },
  { label: 'Total Students', value: '628', icon: Users, color: 'text-ocean' },
  { label: 'Average Rating', value: '4.77', icon: Star, color: 'text-tangerine' },
  { label: 'Total Revenue', value: '$25,750', icon: DollarSign, color: 'text-fern' },
]

export default function InstructorDashboardPage() {
  const { user } = useAuth()

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-ink">Instructor Dashboard</h1>
          <p className="mt-1 text-ink/60">Welcome back, {user?.name || 'Instructor'}</p>
        </div>
        <Button variant="primary" size="md">
          <Plus className="h-4 w-4" />
          Create New Course
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="flex items-center gap-4 p-6">
              <div className={`rounded-lg bg-mist p-3 ${stat.color}`}>
                <stat.icon className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm text-ink/60">{stat.label}</p>
                <p className="text-2xl font-bold text-ink">{stat.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>My Courses</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-ink/10">
                  <th className="pb-3 text-left text-sm font-semibold text-ink/70">Course</th>
                  <th className="pb-3 text-left text-sm font-semibold text-ink/70">Students</th>
                  <th className="pb-3 text-left text-sm font-semibold text-ink/70">Rating</th>
                  <th className="pb-3 text-left text-sm font-semibold text-ink/70">Status</th>
                  <th className="pb-3 text-left text-sm font-semibold text-ink/70">Revenue</th>
                  <th className="pb-3 text-right text-sm font-semibold text-ink/70">Actions</th>
                </tr>
              </thead>
              <tbody>
                {instructorCourses.map((course) => (
                  <tr key={course.id} className="border-b border-ink/5 last:border-0">
                    <td className="py-4 pr-4"><span className="font-medium text-ink">{course.title}</span></td>
                    <td className="py-4 pr-4 text-ink/70">{course.students}</td>
                    <td className="py-4 pr-4">
                      {course.rating > 0 ? (
                        <span className="flex items-center gap-1 text-ink/70">
                          <Star className="h-4 w-4 fill-tangerine text-tangerine" />
                          {course.rating}
                        </span>
                      ) : (
                        <span className="text-ink/40">—</span>
                      )}
                    </td>
                    <td className="py-4 pr-4">
                      <Badge variant={course.status === 'published' ? 'success' : 'warning'}>{course.status}</Badge>
                    </td>
                    <td className="py-4 pr-4 text-ink/70">{course.revenue > 0 ? `$${course.revenue.toLocaleString()}` : '—'}</td>
                    <td className="py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="secondary" size="sm"><Edit className="h-3.5 w-3.5" />Edit</Button>
                        <Button variant="secondary" size="sm"><Eye className="h-3.5 w-3.5" />View</Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Student Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start gap-4 rounded-lg bg-sage p-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-plum/10">
                  <span className="text-sm font-semibold text-plum">
                    {activity.student.split(' ').map((n) => n[0]).join('')}
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-ink">
                    <span className="font-semibold">{activity.student}</span> {activity.action}
                  </p>
                  <p className="mt-0.5 text-xs text-ink/50">{activity.course}</p>
                </div>
                <span className="shrink-0 text-xs text-ink/40">{activity.time}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
