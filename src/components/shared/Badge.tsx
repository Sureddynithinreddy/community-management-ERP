import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'success' | 'warning' | 'error' | 'info' | 'neutral' | 'primary';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  icon?: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({ 
  children, 
  variant = 'neutral',
  size = 'md',
  className = '',
  icon
}) => {
  const sizeClasses = {
    sm: 'px-2 py-0.5 text-[10px]',
    md: 'px-2.5 py-1 text-xs',
    lg: 'px-3 py-1.5 text-sm'
  };

  const variantClasses = {
    success: 'bg-[#738743] text-white',
    warning: 'bg-amber-200 text-amber-900 border border-amber-400',
    error: 'bg-red-100 text-red-900 border border-red-400',
    info: 'bg-[#A3C3B7] text-[#1E372E]',
    neutral: 'bg-[#254238] text-white',
    primary: 'bg-[#254238] text-[#F8F5EE]'
  };

  return (
    <span className={`inline-flex items-center gap-1 rounded-full font-bold ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}>
      {icon && <span className="inline-flex">{icon}</span>}
      {children}
    </span>
  );
};
