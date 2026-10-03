import React, { useState } from 'react';

export function Avatar({
  src,
  alt = 'User avatar',
  size = 'md',
  status = null, // 'online' | 'offline' | 'busy'
  fallbackText = 'U',
  className = ''
}) {
  const [imageError, setImageError] = useState(false);

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

  const initials = fallbackText
    ? fallbackText.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
    : 'U';

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
