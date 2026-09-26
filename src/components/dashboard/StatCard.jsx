import { Card, CardContent } from '../ui/index.js'

export default function StatCard({ icon: Icon, label, value, subtext, color = 'indigo' }) {
  const colors = {
    indigo: 'bg-indigo-100 text-indigo-600',
    green: 'bg-green-100 text-green-600',
    purple: 'bg-purple-100 text-purple-600',
    amber: 'bg-amber-100 text-amber-600',
  }

  return (
    <Card>
      <CardContent className="flex flex-col items-center gap-3 p-4 text-center">
        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${colors[color]}`}>
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <p className="text-xs text-gray-500">{label}</p>
          <p className="text-xl font-bold text-gray-900">{value}</p>
          {subtext && <p className="text-xs text-gray-400">{subtext}</p>}
        </div>
      </CardContent>
    </Card>
  )
}
