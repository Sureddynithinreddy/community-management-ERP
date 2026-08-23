import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'organic' | 'glass';
  hover?: boolean;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  variant = 'default',
  hover = false,
  onClick
}) => {
  const baseClasses = 'rounded-2xl transition-all duration-200';
  
  const variantClasses = {
    default: 'bg-[#F1EDE2] border border-[#DED8C8]',
    organic: 'organic-panel',
    glass: 'bg-white/60 backdrop-blur-sm border border-[#DED8C8]/50 shadow-sm'
  };

  const hoverClasses = hover ? 'hover:shadow-lg hover:scale-[1.01] cursor-pointer' : '';

  return (
    <div 
      className={`${baseClasses} ${variantClasses[variant]} ${hoverClasses} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};
