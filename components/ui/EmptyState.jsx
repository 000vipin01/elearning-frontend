import React from 'react';
import { Button } from './Button';

export function EmptyState({
  icon,
  title,
  description,
  actionLabel,
  onAction,
  className = ''
}) {
  return (
    <div className={`flex flex-col items-center justify-center p-12 text-center rounded-2xl border border-dashed border-surface-border/80 bg-slate-900/30 ${className}`}>
      {icon && (
        <div className="w-16 h-16 rounded-2xl bg-surface-subtle border border-surface-border flex items-center justify-center text-slate-400 mb-4 shadow-inner">
          {icon}
        </div>
      )}
      <h3 className="text-lg font-bold text-slate-100">{title}</h3>
      {description && (
        <p className="text-sm text-slate-400 max-w-md mt-1.5 mb-6 leading-relaxed">
          {description}
        </p>
      )}
      {actionLabel && onAction && (
        <Button variant="primary" size="md" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
}

export function LoadingSkeleton({ variant = 'card', count = 3 }) {
  const items = Array.from({ length: count });

  if (variant === 'card') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((_, i) => (
          <div key={i} className="bg-surface-card border border-surface-border rounded-2xl p-5 animate-pulse">
            <div className="w-full h-44 bg-slate-800/80 rounded-xl mb-4" />
            <div className="h-4 bg-slate-800 rounded w-1/3 mb-3" />
            <div className="h-6 bg-slate-800 rounded w-3/4 mb-4" />
            <div className="h-4 bg-slate-800 rounded w-full mb-2" />
            <div className="h-4 bg-slate-800 rounded w-2/3 mb-6" />
            <div className="flex justify-between items-center pt-4 border-t border-slate-800">
              <div className="h-4 bg-slate-800 rounded w-1/4" />
              <div className="h-8 bg-slate-800 rounded w-1/3" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (variant === 'table') {
    return (
      <div className="bg-surface-card border border-surface-border rounded-2xl p-6 animate-pulse space-y-4">
        <div className="h-10 bg-slate-800 rounded-xl w-full" />
        {items.map((_, i) => (
          <div key={i} className="h-12 bg-slate-800/60 rounded-lg w-full" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4 animate-pulse">
      <div className="h-8 bg-slate-800 rounded w-1/3" />
      <div className="h-32 bg-slate-800/60 rounded-xl w-full" />
    </div>
  );
}

export function Table({ headers = [], children, className = '' }) {
  return (
    <div className={`w-full overflow-x-auto rounded-2xl border border-surface-border bg-surface-card ${className}`}>
      <table className="w-full text-left border-collapse text-sm">
        <thead>
          <tr className="border-b border-surface-border/80 bg-slate-900/60">
            {headers.map((h, i) => (
              <th
                key={i}
                className="py-3.5 px-4 font-semibold text-xs text-slate-400 uppercase tracking-wider whitespace-nowrap"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-surface-border/50 text-slate-300">
          {children}
        </tbody>
      </table>
    </div>
  );
}
