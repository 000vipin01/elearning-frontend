import React from 'react';

export function Card({ children, className = '', hover = false, onClick = null, ...props }) {
  return (
    <div
      onClick={onClick}
      className={`bg-surface-card border border-surface-border/80 rounded-2xl shadow-xl shadow-black/20 overflow-hidden transition-all duration-200 ${
        hover ? 'hover:border-surface-border hover:bg-surface-hover/90 hover:shadow-2xl hover:-translate-y-0.5 cursor-pointer' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className = '', ...props }) {
  return (
    <div className={`p-6 border-b border-surface-border/50 ${className}`} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({ children, className = '', as: Component = 'h3', ...props }) {
  return (
    <Component className={`text-lg font-bold text-slate-100 tracking-tight ${className}`} {...props}>
      {children}
    </Component>
  );
}

export function CardDescription({ children, className = '', ...props }) {
  return (
    <p className={`text-sm text-slate-400 mt-1 leading-relaxed ${className}`} {...props}>
      {children}
    </p>
  );
}

export function CardContent({ children, className = '', ...props }) {
  return (
    <div className={`p-6 ${className}`} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({ children, className = '', ...props }) {
  return (
    <div className={`px-6 py-4 bg-slate-900/40 border-t border-surface-border/50 flex items-center justify-between ${className}`} {...props}>
      {children}
    </div>
  );
}
