import { useState, useEffect } from 'react'
import { Users, BookOpen, DollarSign, CreditCard, TrendingUp, Award } from 'lucide-react'
import { api } from '../../shared/api/client.js'

export default function AdminDashboard() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/admin/stats').then((res) => {
      setStats(res)
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="animate-pulse space-y-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-24 rounded-xl bg-[var(--border)]" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-[var(--text)]">Platform Analytics</h1>
        <p className="mt-1 text-[var(--text-muted)]">Overview of platform performance</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={Users} label="Total Users" value={stats?.totalUsers || 0} />
        <StatCard icon={BookOpen} label="Total Courses" value={stats?.totalCourses || 0} />
        <StatCard icon={DollarSign} label="Total Revenue" value={`₹${stats?.totalRevenue || 0}`} />
        <StatCard icon={CreditCard} label="Total Payments" value={stats?.totalPayments || 0} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={Users} label="Students" value={stats?.totalStudents || 0} />
        <StatCard icon={Users} label="Instructors" value={stats?.totalInstructors || 0} />
        <StatCard icon={TrendingUp} label="Enrollments" value={stats?.totalEnrollments || 0} />
        <StatCard icon={Award} label="Published Courses" value={stats?.publishedCourses || 0} />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6">
          <h2 className="mb-4 font-display text-lg font-bold text-[var(--text)]">Revenue Summary</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[var(--text-muted)]">Gross Revenue</span>
              <span className="font-semibold text-[var(--text)]">₹{stats?.totalRevenue || 0}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[var(--text-muted)]">Refunds</span>
              <span className="font-semibold text-red-500">-₹{stats?.totalRefundAmount || 0}</span>
            </div>
            <div className="border-t border-[var(--border)] pt-3">
              <div className="flex items-center justify-between">
                <span className="font-medium text-[var(--text)]">Net Revenue</span>
                <span className="font-bold text-[var(--primary)]">
                  ₹{(stats?.totalRevenue || 0) - (stats?.totalRefundAmount || 0)}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6">
          <h2 className="mb-4 font-display text-lg font-bold text-[var(--text)]">Platform Health</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[var(--text-muted)]">Total Orders</span>
              <span className="font-semibold text-[var(--text)]">{stats?.totalOrders || 0}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[var(--text-muted)]">Total Refunds</span>
              <span className="font-semibold text-[var(--text)]">{stats?.totalRefunds || 0}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[var(--text-muted)]">Active Coupons</span>
              <span className="font-semibold text-[var(--text)]">{stats?.totalCoupons || 0}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[var(--text-muted)]">Active Ads</span>
              <span className="font-semibold text-[var(--text)]">{stats?.totalAds || 0}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function StatCard({ icon: Icon, label, value }) {
  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--primary)]/10 text-[var(--primary)]">
          <Icon size={20} />
        </div>
        <div>
          <p className="text-2xl font-bold text-[var(--text)]">{value}</p>
          <p className="text-sm text-[var(--text-muted)]">{label}</p>
        </div>
      </div>
    </div>
  )
}
