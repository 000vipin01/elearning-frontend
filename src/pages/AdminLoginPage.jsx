import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Shield, Mail, Lock, LoaderCircle, AlertCircle } from 'lucide-react'
import { Button, Card, CardContent, CardHeader, CardTitle } from '../components/ui/index.js'
import { useAuth } from '../context/AuthContext.jsx'

export default function AdminLoginPage() {
  const navigate = useNavigate()
  const { login } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    const result = await login(email, password)
    setIsLoading(false)

    if (result.success) {
      if (result.user?.role === 'ADMIN') {
        navigate('/admin')
      } else {
        setError('Access denied. Admin credentials required.')
      }
    } else {
      setError(result.error || 'Login failed. Please try again.')
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-ink px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 flex flex-col items-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-plum">
            <Shield className="h-8 w-8 text-white" />
          </div>
          <h1 className="mt-4 text-2xl font-bold text-white">Admin Portal</h1>
          <p className="mt-1 text-sm text-white/60">Restricted access only</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Admin Sign In</CardTitle>
          </CardHeader>
          <CardContent>
            {error && (
              <div className="mb-4 flex items-center gap-2 rounded-md bg-cream px-3 py-2 text-sm text-tangerine">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-ink">
                  Admin Email
                </label>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/50" />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@example.com"
                    required
                    className="w-full rounded-md border border-mist bg-white py-2 pl-10 pr-3 text-sm text-ink placeholder:text-ink/40 focus:border-plum focus:outline-none focus:ring-1 focus:ring-plum"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-ink">
                  Password
                </label>
                <div className="relative">
                  <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/50" />
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter admin password"
                    required
                    className="w-full rounded-md border border-mist bg-white py-2 pl-10 pr-3 text-sm text-ink placeholder:text-ink/40 focus:border-plum focus:outline-none focus:ring-1 focus:ring-plum"
                  />
                </div>
              </div>

              <Button type="submit" variant="primary" size="lg" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <LoaderCircle className="h-4 w-4 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  'Sign in as Admin'
                )}
              </Button>
            </form>

            <p className="mt-4 text-center text-sm text-ink">
              <Link to="/login" className="font-medium text-plum hover:underline">
                ← Back to regular login
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
