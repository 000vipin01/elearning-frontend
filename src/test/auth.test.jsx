import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { AuthProvider, useAuth } from '../shared/auth/AuthContext.jsx'

function TestComponent() {
  const { user, isAuthenticated, login, logout } = useAuth()
  return (
    <div>
      <div data-testid="auth-status">{isAuthenticated ? 'authenticated' : 'anonymous'}</div>
      {user && <div data-testid="user-name">{user.name}</div>}
      <button onClick={() => login('test@example.com', 'password')}>Login</button>
      <button onClick={logout}>Logout</button>
    </div>
  )
}

describe('Auth', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.restoreAllMocks()
  })

  it('should start as anonymous', () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      </MemoryRouter>
    )

    expect(screen.getByTestId('auth-status')).toHaveTextContent('anonymous')
  })

  it('should login successfully', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      status: 200,
      json: () => Promise.resolve({
        token: 'test-token',
        id: 1,
        name: 'Test User',
        email: 'test@example.com',
        role: 'STUDENT',
      }),
    })

    render(
      <MemoryRouter>
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      </MemoryRouter>
    )

    fireEvent.click(screen.getByText('Login'))

    await waitFor(() => {
      expect(screen.getByTestId('auth-status')).toHaveTextContent('authenticated')
    }, { timeout: 5000 })
  })

  it('should logout', async () => {
    localStorage.setItem('token', 'test-token')
    localStorage.setItem('user', JSON.stringify({ name: 'Test User', role: 'STUDENT' }))

    render(
      <MemoryRouter>
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      </MemoryRouter>
    )

    await waitFor(() => {
      expect(screen.getByTestId('auth-status')).toHaveTextContent('authenticated')
    }, { timeout: 5000 })

    fireEvent.click(screen.getByText('Logout'))

    await waitFor(() => {
      expect(screen.getByTestId('auth-status')).toHaveTextContent('anonymous')
    }, { timeout: 5000 })
  })
})
