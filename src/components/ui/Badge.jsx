const variants = {
  default: 'bg-mist text-ink',
  success: 'bg-mist text-fern',
  warning: 'bg-cream text-tangerine',
  danger: 'bg-mist text-tangerine',
  info: 'bg-mist text-ocean',
}

export default function Badge({ children, variant = 'default', className = '' }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  )
}
