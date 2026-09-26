export default function ProgressBar({ value, size = 'md', className = '' }) {
  const sizes = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4',
  }

  return (
    <div className={`w-full rounded-full bg-mist ${sizes[size]} ${className}`}>
      <div
        className={`${sizes[size]} rounded-full bg-plum transition-all duration-500`}
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  )
}
