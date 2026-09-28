import { GraduationCap } from 'lucide-react'
import { Button } from '../ui/index.js'

export default function WelcomeSection({ userName, streak }) {
  const greeting = getGreeting()

  return (
    <div className="rounded-xl bg-gradient-to-r from-plum to-plum/80 p-6 text-white sm:p-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <p className="text-white/80">{greeting}</p>
          <h1 className="text-2xl font-bold sm:text-3xl">Ailan</h1>
          <p className="text-white/80">
            {streak > 0
              ? `You're on a ${streak}-day learning streak! Keep it up.`
              : 'Start a learning streak today!'}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/20">
            <GraduationCap className="h-8 w-8" />
          </div>
          <Button variant="secondary" size="md" to="/courses">
            Browse Courses
          </Button>
        </div>
      </div>
    </div>
  )
}

function getGreeting() {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good morning'
  if (hour < 17) return 'Good afternoon'
  return 'Good evening'
}
