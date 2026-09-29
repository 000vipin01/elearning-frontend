import { useState, useEffect } from 'react'
import { Edit, Trash2, Shield } from 'lucide-react'
import { api } from '../../shared/api/client.js'

export default function UserManagement() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [editingUser, setEditingUser] = useState(null)
  const [newRole, setNewRole] = useState('')

  useEffect(() => {
    loadUsers()
  }, [])

  const loadUsers = async () => {
    try {
      const res = await api.get('/admin/users')
      setUsers(res)
    } catch (err) {
      console.error('Failed to load users:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleRoleChange = async () => {
    if (!editingUser || !newRole) return
    try {
      await api.put(`/admin/users/${editingUser.id}/role`, { role: newRole })
      setUsers(users.map((u) => u.id === editingUser.id ? { ...u, role: newRole } : u))
      setEditingUser(null)
      setNewRole('')
    } catch (err) {
      alert(err.message)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this user?')) return
    try {
      await api.delete(`/admin/users/${id}`)
      setUsers(users.filter((u) => u.id !== id))
    } catch (err) {
      alert(err.message)
    }
  }

  if (loading) {
    return <div className="h-96 animate-pulse rounded-xl bg-[var(--border)]" />
  }

  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-bold text-[var(--text)]">User Management</h1>

      <div className="overflow-x-auto rounded-xl border border-[var(--border)] bg-[var(--surface)]">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[var(--border)] bg-[var(--bg)]">
              <th className="px-4 py-3 text-left text-sm font-medium text-[var(--text-muted)]">Name</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-[var(--text-muted)]">Email</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-[var(--text-muted)]">Role</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-[var(--text-muted)]">Joined</th>
              <th className="px-4 py-3 text-right text-sm font-medium text-[var(--text-muted)]">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b border-[var(--border)] last:border-0">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--primary)]/10 text-sm font-bold text-[var(--primary)]">
                      {user.name?.[0]?.toUpperCase()}
                    </div>
                    <span className="font-medium text-[var(--text)]">{user.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-[var(--text-muted)]">{user.email}</td>
                <td className="px-4 py-3">
                  {editingUser?.id === user.id ? (
                    <div className="flex items-center gap-2">
                      <select
                        value={newRole}
                        onChange={(e) => setNewRole(e.target.value)}
                        className="rounded border border-[var(--border)] px-2 py-1 text-sm"
                      >
                        <option value="STUDENT">STUDENT</option>
                        <option value="INSTRUCTOR">INSTRUCTOR</option>
                        <option value="ADMIN">ADMIN</option>
                      </select>
                      <button onClick={handleRoleChange} className="text-[var(--primary)] hover:underline">Save</button>
                      <button onClick={() => setEditingUser(null)} className="text-[var(--text-muted)] hover:underline">Cancel</button>
                    </div>
                  ) : (
                    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                      user.role === 'ADMIN'
                        ? 'bg-purple-100 text-purple-700'
                        : user.role === 'INSTRUCTOR'
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-green-100 text-green-700'
                    }`}>
                      {user.role}
                    </span>
                  )}
                </td>
                <td className="px-4 py-3 text-sm text-[var(--text-muted)]">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => { setEditingUser(user); setNewRole(user.role) }}
                      className="rounded-lg p-2 text-[var(--text-muted)] hover:bg-[var(--border)]"
                    >
                      <Shield size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="rounded-lg p-2 text-red-500 hover:bg-red-50"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
