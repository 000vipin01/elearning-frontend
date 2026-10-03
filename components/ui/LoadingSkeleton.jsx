import React from 'react';

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
