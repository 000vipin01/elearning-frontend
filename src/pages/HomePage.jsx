import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/index.js'
import { BookOpen, Users, GraduationCap } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-ink">Welcome to E-Learning</h1>
        <p className="mt-1 text-sm text-ink">
          Your learning management system dashboard
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-mist">
                <BookOpen className="h-5 w-5 text-plum" />
              </div>
              <CardTitle>Total Courses</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-ink">0</p>
            <p className="mt-1 text-sm text-ink">Active courses available</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-mist">
                <Users className="h-5 w-5 text-fern" />
              </div>
              <CardTitle>Total Students</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-ink">0</p>
            <p className="mt-1 text-sm text-ink">Enrolled students</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-mist">
                <GraduationCap className="h-5 w-5 text-plum" />
              </div>
              <CardTitle>Total Instructors</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-ink">0</p>
            <p className="mt-1 text-sm text-ink">Active instructors</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Getting Started</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-ink">
            This is the main content area. Navigate using the sidebar to explore
            different sections of the application. Course management, student
            enrollment, and instructor tools will be available here.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
