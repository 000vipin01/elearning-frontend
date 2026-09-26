export default function Card({ children, className = '', ...props }) {
  return (
    <div
      className={`rounded-xl border border-mist bg-white p-6 shadow-sm ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}

export function CardHeader({ children, className = '' }) {
  return <div className={`mb-4 ${className}`}>{children}</div>
}

export function CardTitle({ children, className = '' }) {
  return <h3 className={`text-lg font-semibold text-ink ${className}`}>{children}</h3>
}

export function CardContent({ children, className = '' }) {
  return <div className={`text-sm text-ink ${className}`}>{children}</div>
}
