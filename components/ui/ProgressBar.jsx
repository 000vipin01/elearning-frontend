import React from 'react';

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
