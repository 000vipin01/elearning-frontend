import { describe, it, expect, beforeEach, vi } from 'vitest'
import { api, ApiError } from '../shared/api/client.js'

describe('API Client', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.restoreAllMocks()
  })

  it('should make GET requests', async () => {
    const mockData = { content: [] }
    vi.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      status: 200,
      json: () => Promise.resolve(mockData),
    })

    const result = await api.get('/courses')
    expect(result).toEqual(mockData)
  })

  it('should include auth token when present', async () => {
    localStorage.setItem('token', 'test-token')
    const mockData = { content: [] }

    const fetchSpy = vi.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      status: 200,
      json: () => Promise.resolve(mockData),
    })

    await api.get('/courses')
    expect(fetchSpy).toHaveBeenCalledWith(
      expect.stringContaining('/api/v1/courses'),
      expect.objectContaining({
        headers: expect.objectContaining({
          Authorization: 'Bearer test-token',
        }),
      })
    )
  })

  it('should throw ApiError on non-ok response', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValue({
      ok: false,
      status: 404,
      json: () => Promise.resolve({ message: 'Not found' }),
    })

    await expect(api.get('/courses/999')).rejects.toThrow(ApiError)
  })

  it('should handle 401 by clearing storage', async () => {
    localStorage.setItem('token', 'expired-token')
    vi.spyOn(global, 'fetch').mockResolvedValue({
      ok: false,
      status: 401,
      json: () => Promise.resolve({ message: 'Unauthorized' }),
    })

    const mockLocation = { href: '' }
    Object.defineProperty(window, 'location', {
      value: mockLocation,
      writable: true,
    })

    try {
      await api.get('/courses')
    } catch (e) {
      expect(e).toBeInstanceOf(ApiError)
    }

    expect(localStorage.getItem('token')).toBeNull()
  })

  it('should make POST requests with body', async () => {
    const mockData = { id: 1 }
    const fetchSpy = vi.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      status: 200,
      json: () => Promise.resolve(mockData),
    })

    const body = { email: 'test@example.com', password: 'password' }
    await api.post('/auth/login', body)

    expect(fetchSpy).toHaveBeenCalledWith(
      expect.stringContaining('/api/v1/auth/login'),
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify(body),
      })
    )
  })
})
