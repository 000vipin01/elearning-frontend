import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext.jsx'
import { api } from '../services/api.js'
import WelcomeSection from '../components/dashboard/WelcomeSection.jsx'
import EnrolledCourses from '../components/dashboard/EnrolledCourses.jsx'
import ContinueLearning from '../components/dashboard/ContinueLearning.jsx'
import LearningStats from '../components/dashboard/LearningStats.jsx'
import { Card, CardContent } from '../components/ui/index.js'
import { BookOpen, Clock, Flame, Target } from 'lucide-react'

export default function StudentDashboardPage() {
  const { user } = useAuth()
  const [dashboard, setDashboard] = useState(null)
  const [enrollments, setEnrollments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [dashData, enrollData] = await Promise.all([
          api.getStudentDashboard(),
          api.getMyEnrollments(),
        ])
        setDashboard(dashData)
        setEnrollments(enrollData)
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
    { icon: BookOpen, label: 'Enrolled', value: dashboard?.totalEnrolled || 0, color: 'text-plum' },
    { icon: Clock, label: 'Completed', value: dashboard?.completed || 0, color: 'text-fern' },
    { icon: Flame, label: 'In Progress', value: dashboard?.inProgress || 0, color: 'text-tangerine' },
    { icon: Target, label: 'Total Hours', value: '0', color: 'text-ocean' },
  ]

  return (
    <div className="space-y-8">
      <WelcomeSection userName={user?.name || 'Student'} streak={0} />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
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

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="space-y-8 lg:col-span-2">
          <ContinueLearning enrollments={enrollments} />
          <EnrolledCourses enrollments={enrollments} />
        </div>
        <div className="space-y-8">
          <LearningStats dashboard={dashboard} />
        </div>
      </div>
    </div>
  )
}
