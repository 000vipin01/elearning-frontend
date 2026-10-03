import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

export function Input({
  label,
  error,
  helperText,
  icon = null,
  type = 'text',
  className = '',
  wrapperClassName = '',
  required = false,
  ...props
}) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className={`w-full ${wrapperClassName}`}>
      {label && (
        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
          {label} {required && <span className="text-rose-400">*</span>}
        </label>
      )}
      <div className="relative flex items-center">
        {icon && (
          <div className="absolute left-3.5 pointer-events-none text-slate-400">
            {icon}
          </div>
        )}
        <input
          type={inputType}
          className={`w-full bg-slate-900/80 border rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500/50 ${
            icon ? 'pl-10' : ''
          } ${isPassword ? 'pr-11' : ''} ${
            error
              ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500/30'
              : 'border-surface-border focus:border-brand-500'
          } ${className}`}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3.5 text-slate-400 hover:text-slate-200 focus:outline-none"
            tabIndex={-1}
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        )}
      </div>
      {error && <p className="mt-1.5 text-xs text-rose-400">{error}</p>}
      {helperText && !error && <p className="mt-1.5 text-xs text-slate-400">{helperText}</p>}
    </div>
  );
}

export function Select({
  label,
  error,
  options = [],
  className = '',
  required = false,
  ...props
}) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
          {label} {required && <span className="text-rose-400">*</span>}
        </label>
      )}
      <select
        className={`w-full bg-slate-900/80 border border-surface-border rounded-xl px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/40 transition-colors ${
          error ? 'border-rose-500' : ''
        } ${className}`}
        {...props}
      >
        {options.map((opt, i) => (
          <option key={i} value={opt.value} className="bg-slate-900 text-slate-100">
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="mt-1.5 text-xs text-rose-400">{error}</p>}
    </div>
  );
}

export function TextArea({
  label,
  error,
  helperText,
  rows = 4,
  className = '',
  required = false,
  ...props
}) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
          {label} {required && <span className="text-rose-400">*</span>}
        </label>
      )}
      <textarea
        rows={rows}
        className={`w-full bg-slate-900/80 border border-surface-border rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/40 transition-colors ${
          error ? 'border-rose-500' : ''
        } ${className}`}
        {...props}
      />
      {error && <p className="mt-1.5 text-xs text-rose-400">{error}</p>}
      {helperText && !error && <p className="mt-1.5 text-xs text-slate-400">{helperText}</p>}
    </div>
  );
}
