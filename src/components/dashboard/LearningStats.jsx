import { BarChart3, BookOpen, Clock, Flame, Target, TrendingUp } from 'lucide-react'
import { learningStats } from '../../data/mockData.js'

export default function LearningStats() {
  const stats = [
    { icon: BookOpen, label: 'Enrolled', value: learningStats.totalCoursesEnrolled, subtext: `${learningStats.coursesCompleted} done`, color: 'text-sky-400' },
    { icon: Clock, label: 'Hours', value: learningStats.totalLearningHours, subtext: 'total invested', color: 'text-emerald-400' },
    { icon: Flame, label: 'Streak', value: `${learningStats.currentStreak}d`, subtext: 'personal best', color: 'text-orange-400' },
    { icon: Target, label: 'Avg Score', value: `${learningStats.averageScore}%`, subtext: 'all quizzes', color: 'text-violet-400' },
  ]

  const weeklyGoalPercent = Math.round(
    (learningStats.weeklyProgress / learningStats.weeklyGoal) * 100,
  )
  const maxHours = Math.max(...learningStats.monthlyProgress.map((w) => w.hours))

  return (
    <section className="overflow-hidden rounded-xl bg-gray-900 text-white shadow-lg">
      {/* Header */}
      <div className="flex items-center gap-2 border-b border-gray-800 px-5 py-4">
        <BarChart3 className="h-5 w-5 text-indigo-400" />
        <h2 className="text-sm font-semibold tracking-wide text-gray-100 uppercase">
          Learning Statistics
        </h2>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-px bg-gray-800">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-gray-900 p-4">
            <div className="flex items-center gap-2">
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
              <span className="text-xs text-gray-400">{stat.label}</span>
            </div>
            <p className="mt-2 text-2xl font-bold text-white">{stat.value}</p>
            <p className="text-xs text-gray-500">{stat.subtext}</p>
          </div>
        ))}
      </div>

      {/* Weekly Goal */}
      <div className="border-t border-gray-800 px-5 py-4">
        <div className="mb-2 flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-xs text-gray-400">
            <TrendingUp className="h-3.5 w-3.5 text-indigo-400" />
            Weekly Goal
          </span>
          <span className="text-xs font-medium text-gray-300">
            {learningStats.weeklyProgress}h / {learningStats.weeklyGoal}h
          </span>
        </div>
        <div className="h-2 w-full rounded-full bg-gray-800">
          <div
            className="h-2 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 transition-all duration-500"
            style={{ width: `${weeklyGoalPercent}%` }}
          />
        </div>
      </div>

      {/* Monthly Overview */}
      <div className="border-t border-gray-800 px-5 py-4">
        <p className="mb-3 text-xs text-gray-400">Monthly Overview</p>
        <div className="flex items-end justify-between gap-3">
          {learningStats.monthlyProgress.map((week) => (
            <div key={week.week} className="flex flex-1 flex-col items-center gap-1.5">
              <span className="text-[10px] font-medium text-gray-500">{week.hours}h</span>
              <div className="flex h-16 w-full items-end rounded-t" style={{ backgroundColor: '#1f2937' }}>
                <div
                  className="w-full rounded-t bg-gradient-to-t from-indigo-600 to-violet-400 transition-all duration-500"
                  style={{ height: `${(week.hours / maxHours) * 100}%` }}
                />
              </div>
              <span className="text-[10px] text-gray-600">{week.week.replace('Week ', 'W')}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
