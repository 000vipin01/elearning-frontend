import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext.jsx'
import { api } from '../services/api.js'
import { Card, CardContent, CardHeader, CardTitle, Badge, Button } from '../components/ui/index.js'
import { BookOpen, Users, Plus, Edit, Eye } from 'lucide-react'

export default function InstructorDashboardPage() {
  const { user } = useAuth()
  const [dashboard, setDashboard] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await api.getInstructorDashboard()
        setDashboard(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-plum border-t-transparent" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="rounded-lg bg-cream p-4 text-center text-tangerine">
        {error}
      </div>
    )
  }

  const stats = [
    { label: 'Total Courses', value: dashboard?.totalCourses || 0, icon: BookOpen, color: 'text-plum' },
    { label: 'Total Students', value: dashboard?.totalStudents || 0, icon: Users, color: 'text-ocean' },
  ]

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

      <div className="grid gap-4 sm:grid-cols-2">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="flex items-center gap-4 p-6">
              <div className="rounded-lg bg-mist p-3">
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
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
          {!dashboard?.courses || dashboard.courses.length === 0 ? (
            <p className="text-sm text-ink/60">No courses created yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-ink/10">
                    <th className="pb-3 text-left text-sm font-semibold text-ink/70">Course</th>
                    <th className="pb-3 text-left text-sm font-semibold text-ink/70">Students</th>
                    <th className="pb-3 text-left text-sm font-semibold text-ink/70">Category</th>
                    <th className="pb-3 text-right text-sm font-semibold text-ink/70">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {dashboard.courses.map((course) => (
                    <tr key={course.id} className="border-b border-ink/5 last:border-0">
                      <td className="py-4 pr-4">
                        <span className="font-medium text-ink">{course.title}</span>
                      </td>
                      <td className="py-4 pr-4 text-ink/70">{course.studentCount || 0}</td>
                      <td className="py-4 pr-4">
                        <Badge variant="default">{course.category || 'General'}</Badge>
                      </td>
                      <td className="py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="secondary" size="sm">
                            <Edit className="h-3.5 w-3.5" />
                            Edit
                          </Button>
                          <Button variant="secondary" size="sm">
                            <Eye className="h-3.5 w-3.5" />
                            View
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
