import React from 'react';
import { Loader2 } from 'lucide-react';

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled = false,
  leftIcon = null,
  rightIcon = null,
  className = '',
  type = 'button',
  onClick,
  ...props
}) {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background disabled:opacity-50 disabled:cursor-not-allowed select-none active:scale-[0.98]';

  const sizeStyles = {
    sm: 'text-xs px-3 py-1.5 gap-1.5',
    md: 'text-sm px-4 py-2.5 gap-2',
    lg: 'text-base px-6 py-3.5 gap-2.5 font-semibold'
  };

  const variantStyles = {
    primary: 'bg-brand-500 hover:bg-brand-600 text-slate-950 font-semibold shadow-lg shadow-brand-500/20 focus:ring-brand-400 hover:shadow-brand-500/30',
    secondary: 'bg-surface-hover hover:bg-slate-700/80 text-slate-200 border border-surface-border focus:ring-slate-400',
    outline: 'border border-surface-border text-slate-300 hover:text-white hover:bg-surface-subtle hover:border-slate-500 focus:ring-slate-400',
    ghost: 'text-slate-400 hover:text-white hover:bg-surface-subtle focus:ring-slate-400',
    danger: 'bg-rose-500/15 text-rose-400 hover:bg-rose-500/25 border border-rose-500/30 focus:ring-rose-500',
    emerald: 'bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-semibold shadow-lg shadow-emerald-500/20 focus:ring-emerald-400',
    subtleAmber: 'bg-brand-500/10 text-brand-400 border border-brand-500/20 hover:bg-brand-500/20 focus:ring-brand-400'
  };

  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      onClick={onClick}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {isLoading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin shrink-0" />
          <span>{children}</span>
        </>
      ) : (
        <>
          {leftIcon && <span className="shrink-0">{leftIcon}</span>}
          <span>{children}</span>
          {rightIcon && <span className="shrink-0">{rightIcon}</span>}
        </>
      )}
    </button>
  );
}
