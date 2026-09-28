import { createContext, useContext, useState, useCallback } from 'react'

const AuthContext = createContext(null)

const MOCK_USERS = [
  {
    id: 1,
    name: 'Vipin Yadav',
    email: 'vipin@example.com',
    password: 'vipin@123',
    role: 'student',
    avatar: null,
    memberSince: '2025-09-15',
  },
  {
    id: 2,
    name: 'Dr. Sarah Chen',
    email: 'rakesh@example.com',
    password: 'rakesh@123',
    role: 'instructor',
    avatar: null,
    memberSince: '2024-01-10',
  },
  {
    id: 3,
    name: 'Admin User',
    email: 'baibhav@example.com',
    password: 'baibhav@123',
    role: 'admin',
    avatar: null,
    memberSince: '2023-06-01',
  },
]

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const login = useCallback(async (email, password) => {
    setIsLoading(true)
    // Simulate API call
    await new Promise((r) => setTimeout(r, 800))
    const found = MOCK_USERS.find(
      (u) => u.email === email && u.password === password,
    )
    setIsLoading(false)
    if (found) {
      const { password: _, ...safeUser } = found
      setUser(safeUser)
      return { success: true, user: safeUser }
    }
    return { success: false, error: 'Invalid email or password' }
  }, [])

  const signup = useCallback(async (name, email, password) => {
    setIsLoading(true)
    await new Promise((r) => setTimeout(r, 800))
    const exists = MOCK_USERS.some((u) => u.email === email)
    if (exists) {
      setIsLoading(false)
      return { success: false, error: 'Email already registered' }
    }
    const newUser = {
      id: Date.now(),
      name,
      email,
      password,
      role: 'student',
      avatar: null,
      memberSince: new Date().toISOString().split('T')[0],
    }
    MOCK_USERS.push(newUser)
    const { password: _, ...safeUser } = newUser
    setUser(safeUser)
    setIsLoading(false)
    return { success: true, user: safeUser }
  }, [])

  const logout = useCallback(() => {
    setUser(null)
  }, [])

  const value = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    signup,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
