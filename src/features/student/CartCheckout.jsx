import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ShoppingCart, Tag, CreditCard, CheckCircle } from 'lucide-react'
import { api } from '../../shared/api/client.js'

export default function CartCheckout() {
  const navigate = useNavigate()
  const [couponCode, setCouponCode] = useState('')
  const [appliedCoupon, setAppliedCoupon] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // This would come from a cart context in a real app
  const [cartItems] = useState([])

  const handleApplyCoupon = () => {
    if (!couponCode.trim()) return
    // In a real app, this would validate the coupon with the backend
    setAppliedCoupon({ code: couponCode, discount: 0 })
  }

  const handleCheckout = async () => {
    setLoading(true)
    setError('')
    try {
      // In a real app, this would create an order and process payment
      const order = await api.post('/payments/orders', { courseId: 1 })
      const payment = await api.post(`/payments/orders/${order.id}/pay`)
      if (payment.status === 'SUCCESS') {
        navigate('/student/my-learning')
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (cartItems.length === 0) {
    return (
      <div className="mx-auto max-w-2xl">
        <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-12 text-center">
          <ShoppingCart size={48} className="mx-auto text-[var(--text-muted)]" />
          <h2 className="mt-4 font-display text-xl font-bold text-[var(--text)]">Your cart is empty</h2>
          <p className="mt-2 text-[var(--text-muted)]">Browse courses and add them to your cart</p>
          <button
            onClick={() => navigate('/student/courses')}
            className="mt-6 rounded-lg bg-[var(--primary)] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[var(--primary-hover)]"
          >
            Browse Courses
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <h1 className="font-display text-2xl font-bold text-[var(--text)]">Checkout</h1>

      {/* Cart items */}
      <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6">
        <h2 className="mb-4 font-semibold text-[var(--text)]">Order Summary</h2>
        {cartItems.map((item) => (
          <div key={item.id} className="flex items-center justify-between border-b border-[var(--border)] py-3 last:border-0">
            <div>
              <p className="font-medium text-[var(--text)]">{item.title}</p>
              <p className="text-sm text-[var(--text-muted)]">{item.category}</p>
            </div>
            <span className="font-semibold text-[var(--text)]">₹{item.price}</span>
          </div>
        ))}
      </div>

      {/* Coupon */}
      <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6">
        <h2 className="mb-4 font-semibold text-[var(--text)]">Apply Coupon</h2>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Tag size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
            <input
              type="text"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              placeholder="Enter coupon code"
              className="w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] py-2.5 pl-10 pr-4 text-sm outline-none focus:border-[var(--primary)]"
            />
          </div>
          <button
            onClick={handleApplyCoupon}
            className="rounded-lg border border-[var(--border)] px-4 py-2.5 text-sm font-medium hover:bg-[var(--bg)]"
          >
            Apply
          </button>
        </div>
        {appliedCoupon && (
          <div className="mt-3 flex items-center gap-2 rounded-lg bg-green-50 p-3 text-sm text-green-600">
            <CheckCircle size={16} />
            Coupon {appliedCoupon.code} applied
          </div>
        )}
      </div>

      {/* Payment */}
      <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6">
        <h2 className="mb-4 font-semibold text-[var(--text)]">Payment</h2>
        {error && (
          <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">{error}</div>
        )}
        <button
          onClick={handleCheckout}
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-[var(--primary)] py-3 text-sm font-semibold text-white transition-colors hover:bg-[var(--primary-hover)] disabled:opacity-50"
        >
          <CreditCard size={18} />
          {loading ? 'Processing...' : 'Pay Now'}
        </button>
      </div>
    </div>
  )
}
