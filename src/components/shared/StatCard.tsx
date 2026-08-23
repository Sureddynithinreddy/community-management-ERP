import React from 'react';
import { LucideIcon } from 'lucide-react';
import { Card } from './Card';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: LucideIcon;
  trend?: {
    value: string;
    direction: 'up' | 'down' | 'neutral';
  };
  color?: 'primary' | 'success' | 'warning' | 'info';
  onClick?: () => void;
}

export const StatCard: React.FC<StatCardProps> = ({ 
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  color = 'primary',
  onClick
}) => {
  const colorClasses = {
    primary: 'text-[#254238]',
    success: 'text-[#738743]',
    warning: 'text-amber-700',
    info: 'text-[#3a6657]'
  };

  const iconBgClasses = {
    primary: 'bg-[#254238]/10',
    success: 'bg-[#738743]/10',
    warning: 'bg-amber-100',
    info: 'bg-[#A3C3B7]/30'
  };

  return (
    <Card 
      variant="organic" 
      hover={!!onClick}
      className="p-5 space-y-3"
      onClick={onClick}
    >
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <p className="text-xs text-[#698a7f] font-bold uppercase tracking-wider">
            {title}
          </p>
        </div>
        {Icon && (
          <div className={`w-10 h-10 rounded-xl ${iconBgClasses[color]} flex items-center justify-center`}>
            <Icon className={`w-5 h-5 ${colorClasses[color]}`} />
          </div>
        )}
      </div>
      
      <div className="space-y-1">
        <div className={`serif-title text-3xl ${colorClasses[color]}`}>
          {value}
        </div>
        
        {(subtitle || trend) && (
          <div className="flex items-center gap-2 text-xs">
            {subtitle && (
              <span className="text-[#698a7f] font-medium">{subtitle}</span>
            )}
            {trend && (
              <span className={`font-bold ${
                trend.direction === 'up' ? 'text-[#738743]' : 
                trend.direction === 'down' ? 'text-red-600' : 
                'text-[#698a7f]'
              }`}>
                {trend.direction === 'up' && '↑ '}
                {trend.direction === 'down' && '↓ '}
                {trend.value}
              </span>
            )}
          </div>
        )}
      </div>
    </Card>
  );
};
