import React from 'react';

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  icon: Icon,
  disabled = false,
  ...props
}) {
  const baseClasses = 'inline-flex items-center justify-center font-semibold transition-colors duration-150 rounded-control focus:outline-none focus:ring-2 focus:ring-brand-500/20 disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary: 'bg-brand-500 hover:bg-brand-600 text-white shadow-sm',
    secondary: 'bg-white border border-[#D0D5DD] text-ink hover:border-brand-500 hover:text-brand-600 hover:bg-gray-50',
    outline: 'border border-brand-500 text-brand-500 hover:bg-brand-50',
    ghost: 'text-muted hover:text-ink hover:bg-gray-100',
    danger: 'bg-red-600 hover:bg-red-700 text-white',
  };

  const sizes = {
    sm: 'h-8 px-3 text-xs',
    md: 'h-10 px-4 text-sm',
    lg: 'h-12 px-5 text-base',
    icon: 'h-9 w-9 p-0',
  };

  return (
    <button
      className={`${baseClasses} ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${className}`}
      disabled={disabled}
      {...props}
    >
      {Icon && <Icon className={`w-4 h-4 ${children ? 'mr-2' : ''}`} />}
      {children}
    </button>
  );
}
