import React from 'react';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary',
  size = 'md',
  isLoading = false,
  icon,
  iconPosition = 'left',
  fullWidth = false,
  className = '',
  disabled,
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center gap-2 serif-title tracking-wider rounded-xl font-bold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-[10px]',
    md: 'px-4 py-2.5 text-xs',
    lg: 'px-6 py-3.5 text-xs'
  };

  const variantClasses = {
    primary: 'bg-[#738743] hover:bg-[#5E7034] text-white shadow-md hover:shadow-lg',
    secondary: 'bg-[#254238] hover:bg-[#1E372E] text-white shadow-md hover:shadow-lg',
    success: 'bg-[#738743] hover:bg-[#5E7034] text-white shadow-md',
    danger: 'bg-red-600 hover:bg-red-700 text-white shadow-md',
    ghost: 'bg-transparent hover:bg-[#254238]/10 text-[#254238]',
    outline: 'bg-transparent border-2 border-[#254238] hover:bg-[#254238] text-[#254238] hover:text-white'
  };

  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <button
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${widthClass} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        <>
          {icon && iconPosition === 'left' && <span className="inline-flex">{icon}</span>}
          {children}
          {icon && iconPosition === 'right' && <span className="inline-flex">{icon}</span>}
        </>
      )}
    </button>
  );
};
