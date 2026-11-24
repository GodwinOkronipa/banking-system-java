import React from 'react';

export function Card({ children, className = '', title, subtitle, action, ...props }) {
  return (
    <div
      className={`bg-white border border-line rounded-card p-5 shadow-card transition-shadow ${className}`}
      {...props}
    >
      {(title || subtitle || action) && (
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-line">
          <div>
            {title && <h3 className="text-base font-bold text-ink">{title}</h3>}
            {subtitle && <p className="text-xs text-muted mt-0.5">{subtitle}</p>}
          </div>
          {action && <div>{action}</div>}
        </div>
      )}
      {children}
    </div>
  );
}
