import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/index.js'

export default function PlaceholderPage({ title, description }) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
        {description && <p className="mt-1 text-sm text-gray-600">{description}</p>}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Coming Soon</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600">
            This page is under development. Check back later for updates.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
