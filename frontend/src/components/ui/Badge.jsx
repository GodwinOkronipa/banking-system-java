import React from 'react';

export function Badge({ children, variant = 'active', className = '' }) {
  const variants = {
    active: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    frozen: 'bg-amber-50 text-amber-700 border-amber-200',
    pending: 'bg-amber-50 text-amber-700 border-amber-200',
    closed: 'bg-red-50 text-red-700 border-red-200',
    neutral: 'bg-gray-100 text-muted border-gray-200',
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${variants[variant] || variants.neutral} ${className}`}
    >
      {children}
    </span>
  );
}
