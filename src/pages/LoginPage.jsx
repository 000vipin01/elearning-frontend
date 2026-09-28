import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { GraduationCap, Mail, Lock, LoaderCircle, AlertCircle } from 'lucide-react'
import { Button, Card, CardContent, CardHeader, CardTitle } from '../components/ui/index.js'
import { useAuth } from '../context/AuthContext.jsx'

function getHomeForRole(role) {
  switch (role) {
    case 'admin': return '/admin'
    case 'instructor': return '/instructor'
    default: return '/'
  }
}

export default function LoginPage() {
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
      navigate(getHomeForRole(result.user?.role))
    } else {
      setError(result.error || 'Login failed. Please try again.')
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-mist px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 flex flex-col items-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-plum">
            <GraduationCap className="h-8 w-8 text-white" />
          </div>
          <h1 className="mt-4 text-2xl font-bold text-ink">E-Learning</h1>
          <p className="mt-1 text-sm text-ink">Sign in to your account</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Welcome back</CardTitle>
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
                  Email
                </label>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/50" />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
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
                    placeholder="Enter your password"
                    required
                    className="w-full rounded-md border border-mist bg-white py-2 pl-10 pr-3 text-sm text-ink placeholder:text-ink/40 focus:border-plum focus:outline-none focus:ring-1 focus:ring-plum"
                  />
                </div>
              </div>

              <Button type="submit" variant="primary" size="lg" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <LoaderCircle className="h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  'Sign in'
                )}
              </Button>
            </form>

            <p className="mt-4 text-center text-sm text-ink">
              Don&apos;t have an account?{' '}
              <Link to="/signup" className="font-medium text-plum hover:underline">
                Sign up
              </Link>
            </p>
          </CardContent>
        </Card>

        <Card className="mt-4">
          <CardContent>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-ink/60">
              Demo credentials
            </p>
            <div className="space-y-1 text-xs text-ink/70">
              <p><span className="font-medium text-ink">Student:</span> alex@example.com / password123</p>
              <p><span className="font-medium text-ink">Instructor:</span> sarah@example.com / password123</p>
              <p><span className="font-medium text-ink">Admin:</span> admin@example.com / admin123</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
