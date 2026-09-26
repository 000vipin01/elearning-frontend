export default function ProgressBar({ value, size = 'md', className = '' }) {
  const sizes = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4',
  }

  return (
    <div className={`w-full rounded-full bg-gray-200 ${sizes[size]} ${className}`}>
      <div
        className={`${sizes[size]} rounded-full bg-indigo-600 transition-all duration-500`}
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  )
}
