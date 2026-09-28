import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { api } from '../services/api.js'
import { Card, CardContent, CardHeader, CardTitle, Badge, Button } from '../components/ui/index.js'
import { BookOpen, Users, Plus, Eye } from 'lucide-react'

export default function InstructorDashboardPage() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [dashboard, setDashboard] = useState(null)
  const [enrolledStudents, setEnrolledStudents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [newTitle, setNewTitle] = useState('')
  const [newDescription, setNewDescription] = useState('')
  const [newCategory, setNewCategory] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [dashData, studentsData] = await Promise.all([
          api.getInstructorDashboard(),
          api.getEnrolledStudents(user?.id),
        ])
        setDashboard(dashData)
        setEnrolledStudents(studentsData)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [user?.id])

  const handleCreateCourse = async () => {
    try {
      await api.createCourse({ title: newTitle, description: newDescription, category: newCategory })
      setShowCreateModal(false)
      setNewTitle('')
      setNewDescription('')
      setNewCategory('')
      const data = await api.getInstructorDashboard()
      setDashboard(data)
    } catch (err) {
      setError(err.message)
    }
  }

  const handleDeleteCourse = async (courseId) => {
    try {
      await api.deleteCourse(courseId)
      const [dashData, studentsData] = await Promise.all([
        api.getInstructorDashboard(),
        api.getEnrolledStudents(user?.id),
      ])
      setDashboard(dashData)
      setEnrolledStudents(studentsData)
    } catch (err) {
      setError(err.message)
    }
  }

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
        <Button variant="primary" size="md" onClick={() => setShowCreateModal(true)}>
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
                          <Button variant="secondary" size="sm" onClick={() => navigate(`/courses/${course.id}`)}>
                            <Eye className="h-3.5 w-3.5" />
                            View
                          </Button>
                          <Button variant="danger" size="sm" onClick={() => handleDeleteCourse(course.id)}>
                            Delete
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

      {/* Enrolled Students */}
      <Card>
        <CardHeader>
          <CardTitle>Enrolled Students</CardTitle>
        </CardHeader>
        <CardContent>
          {enrolledStudents.length === 0 ? (
            <p className="text-sm text-ink/60">No students enrolled yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-ink/10">
                    <th className="pb-3 text-left text-sm font-semibold text-ink/70">Student</th>
                    <th className="pb-3 text-left text-sm font-semibold text-ink/70">Course</th>
                    <th className="pb-3 text-left text-sm font-semibold text-ink/70">Progress</th>
                    <th className="pb-3 text-left text-sm font-semibold text-ink/70">Enrolled</th>
                  </tr>
                </thead>
                <tbody>
                  {enrolledStudents.map((s, i) => (
                    <tr key={i} className="border-b border-ink/5 last:border-0">
                      <td className="py-4 pr-4">
                        <div>
                          <p className="font-medium text-ink">{s.studentName}</p>
                          <p className="text-xs text-ink/50">{s.studentEmail}</p>
                        </div>
                      </td>
                      <td className="py-4 pr-4 text-ink/70">{s.courseTitle}</td>
                      <td className="py-4 pr-4">
                        <Badge variant={s.progress === 100 ? 'success' : 'info'}>{s.progress}%</Badge>
                      </td>
                      <td className="py-4 text-ink/50 text-sm">
                        {s.enrolledAt ? new Date(s.enrolledAt).toLocaleDateString() : 'N/A'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Create Course Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/50">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Create New Course</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-ink">Title</label>
                  <input
                    type="text"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full rounded-md border border-mist bg-white px-3 py-2 text-sm text-ink focus:border-plum focus:outline-none focus:ring-1 focus:ring-plum"
                    placeholder="Course title"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-ink">Description</label>
                  <textarea
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                    className="w-full rounded-md border border-mist bg-white px-3 py-2 text-sm text-ink focus:border-plum focus:outline-none focus:ring-1 focus:ring-plum"
                    rows={3}
                    placeholder="Course description"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-ink">Category</label>
                  <input
                    type="text"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full rounded-md border border-mist bg-white px-3 py-2 text-sm text-ink focus:border-plum focus:outline-none focus:ring-1 focus:ring-plum"
                    placeholder="e.g. Web Development"
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="secondary" size="sm" onClick={() => setShowCreateModal(false)}>
                    Cancel
                  </Button>
                  <Button variant="primary" size="sm" onClick={handleCreateCourse} disabled={!newTitle.trim()}>
                    Create
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
