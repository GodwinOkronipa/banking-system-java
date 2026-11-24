import React from 'react';

export function Input({
  label,
  error,
  helperText,
  icon: Icon,
  className = '',
  id,
  ...props
}) {
  const inputId = id || props.name;

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={inputId} className="block text-xs font-semibold text-ink mb-1.5">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted">
            <Icon className="w-4 h-4" />
          </div>
        )}
        <input
          id={inputId}
          className={`w-full h-10 rounded-control border bg-white text-sm text-ink transition-colors placeholder:text-muted/70 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 ${
            Icon ? 'pl-9 pr-3.5' : 'px-3.5'
          } ${
            error
              ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
              : 'border-[#D0D5DD]'
          } ${className}`}
          {...props}
        />
      </div>
      {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
      {!error && helperText && <p className="text-xs text-muted mt-1">{helperText}</p>}
    </div>
  );
}
