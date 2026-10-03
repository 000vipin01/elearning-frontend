import React from 'react';

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
