import { useState, useEffect } from 'react'
import { Bell, Check, CheckCheck } from 'lucide-react'
import { api } from '../../shared/api/client.js'

export default function NotificationTray() {
  const [notifications, setNotifications] = useState([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadNotifications()
    const interval = setInterval(loadNotifications, 30000)
    return () => clearInterval(interval)
  }, [])

  const loadNotifications = async () => {
    try {
      const [notifsRes, countRes] = await Promise.all([
        api.get('/notifications'),
        api.get('/notifications/unread-count'),
      ])
      setNotifications(notifsRes)
      setUnreadCount(countRes.count)
    } catch (err) {
      console.error('Failed to load notifications:', err)
    } finally {
      setLoading(false)
    }
  }

  const markAsRead = async (id) => {
    try {
      await api.put(`/notifications/${id}/read`)
      setNotifications(notifications.map((n) =>
        n.id === id ? { ...n, isRead: true } : n
      ))
      setUnreadCount(Math.max(0, unreadCount - 1))
    } catch (err) {
      console.error('Failed to mark as read:', err)
    }
  }

  const markAllAsRead = async () => {
    try {
      await api.put('/notifications/read-all')
      setNotifications(notifications.map((n) => ({ ...n, isRead: true })))
      setUnreadCount(0)
    } catch (err) {
      console.error('Failed to mark all as read:', err)
    }
  }

  if (loading) {
    return <div className="h-64 animate-pulse rounded-xl bg-[var(--border)]" />
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bell size={20} className="text-[var(--text)]" />
          <h2 className="font-display text-lg font-bold text-[var(--text)]">Notifications</h2>
          {unreadCount > 0 && (
            <span className="rounded-full bg-[var(--primary)] px-2 py-0.5 text-xs font-medium text-white">
              {unreadCount}
            </span>
          )}
        </div>
        {unreadCount > 0 && (
          <button
            onClick={markAllAsRead}
            className="flex items-center gap-1 text-sm text-[var(--primary)] hover:underline"
          >
            <CheckCheck size={16} /> Mark all read
          </button>
        )}
      </div>

      {notifications.length === 0 ? (
        <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-12 text-center">
          <Bell size={48} className="mx-auto text-[var(--text-muted)]" />
          <p className="mt-4 text-[var(--text-muted)]">No notifications yet</p>
        </div>
      ) : (
        <div className="space-y-2">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`rounded-xl border p-4 ${
                notification.isRead
                  ? 'border-[var(--border)] bg-[var(--surface)]'
                  : 'border-[var(--primary)]/30 bg-[var(--primary)]/5'
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-medium text-[var(--text)]">{notification.title}</p>
                  <p className="mt-1 text-sm text-[var(--text-muted)]">{notification.body}</p>
                </div>
                {!notification.isRead && (
                  <button
                    onClick={() => markAsRead(notification.id)}
                    className="text-[var(--primary)] hover:underline"
                  >
                    <Check size={18} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
