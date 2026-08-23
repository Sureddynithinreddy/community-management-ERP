import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

export const Input: React.FC<InputProps> = ({ 
  label,
  error,
  helperText,
  icon,
  iconPosition = 'left',
  className = '',
  ...props
}) => {
  return (
    <div className="space-y-1.5">
      {label && (
        <label className="block text-xs font-bold text-[#1E372E]">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && iconPosition === 'left' && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#698a7f]">
            {icon}
          </div>
        )}
        <input
          className={`w-full px-3 py-2.5 bg-[#F8F5EE] border border-[#DED8C8] rounded-xl text-sm text-[#1E372E] placeholder:text-[#698a7f]/60 focus:outline-none focus:ring-2 focus:ring-[#738743] focus:border-transparent transition-all ${
            icon && iconPosition === 'left' ? 'pl-10' : ''
          } ${icon && iconPosition === 'right' ? 'pr-10' : ''} ${
            error ? 'border-red-400 focus:ring-red-400' : ''
          } ${className}`}
          {...props}
        />
        {icon && iconPosition === 'right' && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[#698a7f]">
            {icon}
          </div>
        )}
      </div>
      {error && (
        <p className="text-xs text-red-600 font-medium">{error}</p>
      )}
      {helperText && !error && (
        <p className="text-xs text-[#698a7f]">{helperText}</p>
      )}
    </div>
  );
};
