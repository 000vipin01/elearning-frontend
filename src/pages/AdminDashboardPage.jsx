import { useState } from 'react'
import {
  Users,
  BookOpen,
  GraduationCap,
  DollarSign,
  Settings,
  Edit,
  Trash2,
  Shield,
} from 'lucide-react'
import { Button, Card, CardHeader, CardTitle, CardContent, Badge } from '../components/ui/index.js'

const platformStats = [
  { label: 'Total Users', value: '2,847', icon: Users, color: 'text-ocean' },
  { label: 'Total Courses', value: '156', icon: BookOpen, color: 'text-plum' },
  { label: 'Active Instructors', value: '42', icon: GraduationCap, color: 'text-fern' },
  { label: 'Platform Revenue', value: '$128,450', icon: DollarSign, color: 'text-tangerine' },
]

const users = [
  { id: 1, name: 'Alex Johnson', email: 'alex.johnson@example.com', role: 'student', status: 'active' },
  { id: 2, name: 'Dr. Sarah Chen', email: 'sarah.chen@example.com', role: 'instructor', status: 'active' },
  { id: 3, name: 'Prof. Michael Rivera', email: 'michael.rivera@example.com', role: 'instructor', status: 'active' },
  { id: 4, name: 'Emily Watson', email: 'emily.watson@example.com', role: 'instructor', status: 'suspended' },
  { id: 5, name: 'David Kim', email: 'david.kim@example.com', role: 'student', status: 'active' },
  { id: 6, name: 'Admin User', email: 'admin@elearning.com', role: 'admin', status: 'active' },
]

const courses = [
  { id: 1, title: 'Introduction to Web Development', instructor: 'Dr. Sarah Chen', students: 342, status: 'published' },
  { id: 2, title: 'Data Structures & Algorithms', instructor: 'Prof. Michael Rivera', students: 218, status: 'published' },
  { id: 3, title: 'UI/UX Design Fundamentals', instructor: 'Emily Watson', students: 156, status: 'published' },
  { id: 4, title: 'Python for Data Science', instructor: 'Dr. James Park', students: 289, status: 'published' },
  { id: 5, title: 'Machine Learning Basics', instructor: 'Dr. Sarah Chen', students: 0, status: 'draft' },
]

const roleBadgeVariant = { student: 'info', instructor: 'warning', admin: 'danger' }

export default function AdminDashboardPage() {
  const [maintenanceMode, setMaintenanceMode] = useState(false)
  const [registrationOpen, setRegistrationOpen] = useState(true)

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-ink">Admin Dashboard</h1>
          <p className="mt-1 text-ink/60">Platform overview and management</p>
        </div>
        <div className="flex items-center gap-2 rounded-lg bg-cream px-4 py-2">
          <Shield className="h-5 w-5 text-plum" />
          <span className="text-sm font-medium text-ink">Administrator</span>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {platformStats.map((stat) => (
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
          <CardTitle>User Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-ink/10">
                  <th className="pb-3 text-left text-sm font-semibold text-ink/70">Name</th>
                  <th className="pb-3 text-left text-sm font-semibold text-ink/70">Email</th>
                  <th className="pb-3 text-left text-sm font-semibold text-ink/70">Role</th>
                  <th className="pb-3 text-left text-sm font-semibold text-ink/70">Status</th>
                  <th className="pb-3 text-right text-sm font-semibold text-ink/70">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b border-ink/5 last:border-0">
                    <td className="py-4 pr-4"><span className="font-medium text-ink">{user.name}</span></td>
                    <td className="py-4 pr-4 text-ink/70">{user.email}</td>
                    <td className="py-4 pr-4"><Badge variant={roleBadgeVariant[user.role]}>{user.role}</Badge></td>
                    <td className="py-4 pr-4">
                      <Badge variant={user.status === 'active' ? 'success' : 'danger'}>{user.status}</Badge>
                    </td>
                    <td className="py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="secondary" size="sm"><Edit className="h-3.5 w-3.5" />Edit</Button>
                        <Button variant="danger" size="sm"><Trash2 className="h-3.5 w-3.5" />Delete</Button>
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
          <CardTitle>Course Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-ink/10">
                  <th className="pb-3 text-left text-sm font-semibold text-ink/70">Course</th>
                  <th className="pb-3 text-left text-sm font-semibold text-ink/70">Instructor</th>
                  <th className="pb-3 text-left text-sm font-semibold text-ink/70">Students</th>
                  <th className="pb-3 text-left text-sm font-semibold text-ink/70">Status</th>
                  <th className="pb-3 text-right text-sm font-semibold text-ink/70">Actions</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((course) => (
                  <tr key={course.id} className="border-b border-ink/5 last:border-0">
                    <td className="py-4 pr-4"><span className="font-medium text-ink">{course.title}</span></td>
                    <td className="py-4 pr-4 text-ink/70">{course.instructor}</td>
                    <td className="py-4 pr-4 text-ink/70">{course.students}</td>
                    <td className="py-4 pr-4">
                      <Badge variant={course.status === 'published' ? 'success' : 'warning'}>{course.status}</Badge>
                    </td>
                    <td className="py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="secondary" size="sm"><Edit className="h-3.5 w-3.5" />Edit</Button>
                        <Button variant="danger" size="sm"><Trash2 className="h-3.5 w-3.5" />Delete</Button>
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
          <div className="flex items-center gap-2">
            <Settings className="h-5 w-5 text-plum" />
            <CardTitle>Platform Settings</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-ink">Site Name</p>
                <p className="text-sm text-ink/60">The display name of your platform</p>
              </div>
              <div className="rounded-lg bg-mist px-4 py-2 text-sm font-medium text-ink">EduLearn Platform</div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-ink">Maintenance Mode</p>
                <p className="text-sm text-ink/60">Temporarily disable access for all non-admin users</p>
              </div>
              <button
                type="button"
                onClick={() => setMaintenanceMode(!maintenanceMode)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${maintenanceMode ? 'bg-plum' : 'bg-ink/20'}`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${maintenanceMode ? 'translate-x-6' : 'translate-x-1'}`} />
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-ink">Open Registration</p>
                <p className="text-sm text-ink/60">Allow new users to create accounts</p>
              </div>
              <button
                type="button"
                onClick={() => setRegistrationOpen(!registrationOpen)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${registrationOpen ? 'bg-plum' : 'bg-ink/20'}`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${registrationOpen ? 'translate-x-6' : 'translate-x-1'}`} />
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
