import WelcomeSection from '../components/dashboard/WelcomeSection.jsx'
import EnrolledCourses from '../components/dashboard/EnrolledCourses.jsx'
import ContinueLearning from '../components/dashboard/ContinueLearning.jsx'
import RecentCourses from '../components/dashboard/RecentCourses.jsx'
import UpcomingQuizzes from '../components/dashboard/UpcomingQuizzes.jsx'
import LearningStats from '../components/dashboard/LearningStats.jsx'
import { currentUser, learningStats } from '../data/mockData.js'

export default function StudentDashboardPage() {
  return (
    <div className="space-y-8">
      <WelcomeSection userName={currentUser.name} streak={learningStats.currentStreak} />

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Main content */}
        <div className="space-y-8 lg:col-span-2">
          <ContinueLearning />
          <EnrolledCourses />
          <UpcomingQuizzes />
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          <LearningStats />
          <RecentCourses />
        </div>
      </div>
    </div>
  )
}
