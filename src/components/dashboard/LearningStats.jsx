import { BarChart3, BookOpen, Clock, Flame, Target } from 'lucide-react'

export default function LearningStats({ dashboard }) {
  const stats = [
    { icon: BookOpen, label: 'Enrolled', value: dashboard?.totalEnrolled || 0, color: 'text-sky' },
    { icon: Clock, label: 'Completed', value: dashboard?.completed || 0, color: 'text-fern' },
    { icon: Flame, label: 'In Progress', value: dashboard?.inProgress || 0, color: 'text-tangerine' },
    { icon: Target, label: 'Total Hours', value: '0', color: 'text-plum' },
  ]

  return (
    <section className="overflow-hidden rounded-xl bg-ink text-white shadow-lg">
      <div className="flex items-center gap-2 border-b border-ink/50 px-5 py-4">
        <BarChart3 className="h-5 w-5 text-plum" />
        <h2 className="text-sm font-semibold tracking-wide text-mist uppercase">
          Learning Statistics
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-px bg-ink/50">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-ink p-4">
            <div className="flex items-center gap-2">
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
              <span className="text-xs text-ink/50">{stat.label}</span>
            </div>
            <p className="mt-2 text-2xl font-bold text-white">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="border-t border-ink/50 px-5 py-4">
        <p className="mb-3 text-xs text-ink/50">Course Status</p>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-ink/60">Enrolled</span>
            <span className="font-medium text-ink">{dashboard?.totalEnrolled || 0}</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-ink/60">Completed</span>
            <span className="font-medium text-fern">{dashboard?.completed || 0}</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-ink/60">In Progress</span>
            <span className="font-medium text-tangerine">{dashboard?.inProgress || 0}</span>
          </div>
        </div>
      </div>
    </section>
  )
}
