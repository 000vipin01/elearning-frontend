import { Card, CardContent } from '../ui/index.js'

export default function StatCard({ icon: Icon, label, value, subtext, color = 'indigo' }) {
  const colors = {
    indigo: 'bg-plum/15 text-plum',
    green: 'bg-fern/15 text-fern',
    purple: 'bg-plum/15 text-plum',
    amber: 'bg-tangerine/15 text-tangerine',
  }

  return (
    <Card>
      <CardContent className="flex flex-col items-center gap-3 p-4 text-center">
        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${colors[color]}`}>
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <p className="text-xs text-ink/60">{label}</p>
          <p className="text-xl font-bold text-ink">{value}</p>
          {subtext && <p className="text-xs text-ink/50">{subtext}</p>}
        </div>
      </CardContent>
    </Card>
  )
}
