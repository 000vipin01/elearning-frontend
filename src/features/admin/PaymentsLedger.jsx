import { useState, useEffect } from 'react'
import { CreditCard, RefreshCw, DollarSign } from 'lucide-react'
import { api } from '../../shared/api/client.js'

export default function PaymentsLedger() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/admin/stats').then((res) => {
      setStats(res)
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [])

  if (loading) {
    return <div className="h-96 animate-pulse rounded-xl bg-[var(--border)]" />
  }

  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-bold text-[var(--text)]">Payments & Refunds</h1>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={DollarSign} label="Total Revenue" value={`₹${stats?.totalRevenue || 0}`} />
        <StatCard icon={CreditCard} label="Total Payments" value={stats?.totalPayments || 0} />
        <StatCard icon={RefreshCw} label="Total Refunds" value={stats?.totalRefunds || 0} />
        <StatCard icon={DollarSign} label="Refund Amount" value={`₹${stats?.totalRefundAmount || 0}`} />
      </div>

      <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6">
        <h2 className="mb-4 font-display text-lg font-bold text-[var(--text)]">Payment Summary</h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[var(--text-muted)]">Total Orders</span>
            <span className="font-semibold text-[var(--text)]">{stats?.totalOrders || 0}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[var(--text-muted)]">Successful Payments</span>
            <span className="font-semibold text-green-500">{stats?.totalPayments || 0}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[var(--text-muted)]">Refunds Processed</span>
            <span className="font-semibold text-red-500">{stats?.totalRefunds || 0}</span>
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
