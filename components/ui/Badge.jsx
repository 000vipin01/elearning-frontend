import React from 'react';

export function Badge({
  children,
  variant = 'default',
  size = 'md',
  className = '',
  icon = null
}) {
  const baseStyles = 'inline-flex items-center font-medium rounded-full tracking-wide';

  const sizeStyles = {
    sm: 'text-[11px] px-2 py-0.5 gap-1 font-semibold',
    md: 'text-xs px-2.5 py-1 gap-1.5 font-semibold'
  };

  const variantStyles = {
    default: 'bg-slate-800 text-slate-300 border border-slate-700',
    amber: 'bg-amber-500/15 text-amber-300 border border-amber-500/30',
    emerald: 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30',
    sky: 'bg-sky-500/15 text-sky-300 border border-sky-500/30',
    rose: 'bg-rose-500/15 text-rose-300 border border-rose-500/30',
    purple: 'bg-purple-500/15 text-purple-300 border border-purple-500/30',
    outline: 'border border-surface-border text-slate-400 bg-surface-subtle/50'
  };

  return (
    <span className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}>
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  );
}

export function Avatar({
  src,
  alt = 'User avatar',
  size = 'md',
  status = null, // 'online' | 'offline' | 'busy'
  fallbackText = 'U',
  className = ''
}) {
  const [imageError, setImageError] = React.useState(false);

  const sizeStyles = {
    xs: 'w-6 h-6 text-[10px]',
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base font-semibold',
    xl: 'w-16 h-16 text-lg font-bold',
    '2xl': 'w-24 h-24 text-2xl font-bold'
  };

  const statusSize = {
    xs: 'w-1.5 h-1.5',
    sm: 'w-2 h-2',
    md: 'w-2.5 h-2.5',
    lg: 'w-3 h-3',
    xl: 'w-3.5 h-3.5',
    '2xl': 'w-4 h-4'
  };

  const initials = fallbackText.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();

  return (
    <div className={`relative inline-block shrink-0 ${className}`}>
      <div
        className={`${sizeStyles[size]} rounded-full overflow-hidden bg-gradient-to-tr from-slate-800 to-slate-700 flex items-center justify-center border border-surface-border text-slate-200 select-none shadow-sm`}
      >
        {src && !imageError ? (
          <img
            src={src}
            alt={alt}
            onError={() => setImageError(true)}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="font-semibold tracking-wider text-brand-400">{initials}</span>
        )}
      </div>
      {status && (
        <span
          className={`absolute bottom-0 right-0 ${statusSize[size]} rounded-full border-2 border-background ring-1 ring-slate-900 ${
            status === 'online' ? 'bg-emerald-400' : status === 'busy' ? 'bg-rose-500' : 'bg-slate-500'
          }`}
        />
      )}
    </div>
  );
}

export function ProgressBar({
  progress = 0,
  showLabel = true,
  height = 'h-2',
  variant = 'amber',
  className = ''
}) {
  const clamped = Math.min(100, Math.max(0, Math.round(progress)));

  const colorStyles = {
    amber: 'bg-gradient-to-r from-amber-500 to-yellow-400 shadow-sm shadow-amber-500/20',
    emerald: 'bg-gradient-to-r from-emerald-500 to-teal-400 shadow-sm shadow-emerald-500/20',
    sky: 'bg-gradient-to-r from-sky-500 to-cyan-400 shadow-sm shadow-sky-500/20'
  };

  return (
    <div className={`w-full ${className}`}>
      {showLabel && (
        <div className="flex justify-between items-center text-xs font-semibold mb-1.5">
          <span className="text-slate-400">Completion</span>
          <span className="text-slate-200">{clamped}%</span>
        </div>
      )}
      <div className={`w-full bg-slate-800/80 rounded-full overflow-hidden ${height} border border-slate-700/50 p-[1px]`}>
        <div
          className={`${height} rounded-full transition-all duration-500 ease-out ${colorStyles[variant]}`}
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
}
