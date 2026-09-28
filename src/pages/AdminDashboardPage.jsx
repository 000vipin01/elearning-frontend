import { useState, useEffect } from 'react'
import { api } from '../services/api.js'
import { Card, CardContent, CardHeader, CardTitle, Badge, Button } from '../components/ui/index.js'
import { Users, BookOpen, GraduationCap, Shield, Trash2 } from 'lucide-react'

export default function AdminDashboardPage() {
  const [stats, setStats] = useState(null)
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showCourseModal, setShowCourseModal] = useState(false)
  const [newInstructorId, setNewInstructorId] = useState(null)
  const [newTitle, setNewTitle] = useState('')
  const [newDescription, setNewDescription] = useState('')
  const [newCategory, setNewCategory] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsData, usersData] = await Promise.all([
          api.getAdminStats(),
          api.getAdminUsers(),
        ])
        setStats(statsData)
        setUsers(usersData)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const handleDeleteUser = async (id) => {
    if (!confirm('Are you sure you want to delete this user?')) return
    try {
      await api.deleteUser(id)
      setUsers(users.filter((u) => u.id !== id))
    } catch (err) {
      setError(err.message)
    }
  }

  const handleRoleChange = async (id, newRole) => {
    try {
      const result = await api.updateUserRole(id, newRole)
      setUsers(users.map((u) => (u.id === id ? { ...u, role: newRole } : u)))
      // If promoting to instructor, prompt for course creation
      if (result.requiresCourseCreation) {
        setNewInstructorId(id)
        setShowCourseModal(true)
      }
    } catch (err) {
      setError(err.message)
    }
  }

  const handleCreateCourseForInstructor = async () => {
    try {
      await api.createCourse({
        title: newTitle,
        description: newDescription,
        category: newCategory,
      })
      setShowCourseModal(false)
      setNewTitle('')
      setNewDescription('')
      setNewCategory('')
      setNewInstructorId(null)
      // Refresh user list to show updated data
      const usersData = await api.getAdminUsers()
      setUsers(usersData)
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

  const statCards = [
    { label: 'Total Users', value: stats?.totalUsers || 0, icon: Users, color: 'text-plum' },
    { label: 'Students', value: stats?.totalStudents || 0, icon: GraduationCap, color: 'text-ocean' },
    { label: 'Instructors', value: stats?.totalInstructors || 0, icon: BookOpen, color: 'text-fern' },
    { label: 'Courses', value: stats?.totalCourses || 0, icon: BookOpen, color: 'text-tangerine' },
    { label: 'Enrollments', value: stats?.totalEnrollments || 0, icon: Shield, color: 'text-plum' },
  ]

  const roleBadgeVariant = { STUDENT: 'info', INSTRUCTOR: 'warning', ADMIN: 'danger' }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-ink">Admin Dashboard</h1>
        <p className="mt-1 text-ink/60">Platform management and user administration</p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {statCards.map((stat) => (
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

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>User Management</CardTitle>
        </CardHeader>
        <CardContent>
          {users.length === 0 ? (
            <p className="text-sm text-ink/60">No users found.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-ink/10">
                    <th className="pb-3 text-left text-sm font-semibold text-ink/70">Name</th>
                    <th className="pb-3 text-left text-sm font-semibold text-ink/70">Email</th>
                    <th className="pb-3 text-left text-sm font-semibold text-ink/70">Role</th>
                    <th className="pb-3 text-right text-sm font-semibold text-ink/70">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id} className="border-b border-ink/5 last:border-0">
                      <td className="py-4 pr-4">
                        <span className="font-medium text-ink">{user.name}</span>
                      </td>
                      <td className="py-4 pr-4 text-ink/70">{user.email}</td>
                      <td className="py-4 pr-4">
                        <select
                          value={user.role}
                          onChange={(e) => handleRoleChange(user.id, e.target.value)}
                          disabled={user.role === 'ADMIN'}
                          className="rounded-md border border-mist bg-white px-2 py-1 text-sm text-ink focus:border-plum focus:outline-none disabled:opacity-50"
                        >
                          <option value="STUDENT">STUDENT</option>
                          <option value="INSTRUCTOR">INSTRUCTOR</option>
                          <option value="ADMIN">ADMIN</option>
                        </select>
                      </td>
                      <td className="py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => handleDeleteUser(user.id)}
                            disabled={user.role === 'ADMIN'}
                          >
                            <Trash2 className="h-3.5 w-3.5" />
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

      {/* Create Course for New Instructor Modal */}
      {showCourseModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/50">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Create First Course</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-sm text-ink/60">
                This user has been promoted to Instructor. Please create at least one course for them.
              </p>
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
                  <Button variant="secondary" size="sm" onClick={() => setShowCourseModal(false)}>
                    Cancel
                  </Button>
                  <Button variant="primary" size="sm" onClick={handleCreateCourseForInstructor} disabled={!newTitle.trim()}>
                    Create Course
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
