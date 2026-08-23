import React from 'react';
import { AlertCircle, CheckCircle2, Info, X, AlertTriangle } from 'lucide-react';

interface AlertProps {
  variant: 'success' | 'error' | 'warning' | 'info';
  title?: string;
  children: React.ReactNode;
  onClose?: () => void;
}

export const Alert: React.FC<AlertProps> = ({
  variant,
  title,
  children,
  onClose
}) => {
  const config = {
    success: {
      icon: CheckCircle2,
      bg: 'bg-[#738743]/10',
      border: 'border-[#738743]',
      iconColor: 'text-[#738743]',
      textColor: 'text-[#1E372E]'
    },
    error: {
      icon: AlertCircle,
      bg: 'bg-red-50',
      border: 'border-red-400',
      iconColor: 'text-red-600',
      textColor: 'text-red-900'
    },
    warning: {
      icon: AlertTriangle,
      bg: 'bg-amber-50',
      border: 'border-amber-400',
      iconColor: 'text-amber-600',
      textColor: 'text-amber-900'
    },
    info: {
      icon: Info,
      bg: 'bg-[#A3C3B7]/20',
      border: 'border-[#A3C3B7]',
      iconColor: 'text-[#254238]',
      textColor: 'text-[#1E372E]'
    }
  };

  const { icon: Icon, bg, border, iconColor, textColor } = config[variant];

  return (
    <div className={`${bg} ${border} border rounded-xl p-4 flex gap-3`}>
      <Icon className={`w-5 h-5 ${iconColor} shrink-0 mt-0.5`} />
      <div className="flex-1 space-y-1">
        {title && (
          <h4 className={`font-bold text-sm ${textColor}`}>{title}</h4>
        )}
        <div className={`text-sm ${textColor}`}>
          {children}
        </div>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className={`${iconColor} hover:opacity-70 transition-opacity shrink-0`}
        >
          <X className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};
