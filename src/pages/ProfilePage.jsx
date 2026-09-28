import { useAuth } from '../context/AuthContext.jsx'
import { Card, CardContent, CardHeader, CardTitle, Badge } from '../components/ui/index.js'
import { User, Mail, Calendar } from 'lucide-react'

export default function ProfilePage() {
  const { user } = useAuth()

  if (!user) {
    return null
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-ink">Profile</h1>

      <Card>
        <CardContent className="flex items-center gap-6 p-6">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-plum/10">
            <User className="h-10 w-10 text-plum" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-ink">{user.name}</h2>
            <div className="mt-1 flex items-center gap-2">
              <Badge variant="info">{user.role}</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Account Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3">
            <Mail className="h-5 w-5 text-ink/40" />
            <div>
              <p className="text-xs text-ink/50">Email</p>
              <p className="text-sm text-ink">{user.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Calendar className="h-5 w-5 text-ink/40" />
            <div>
              <p className="text-xs text-ink/50">Member Since</p>
              <p className="text-sm text-ink">{user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
