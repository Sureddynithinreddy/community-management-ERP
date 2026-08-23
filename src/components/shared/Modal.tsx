import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  footer?: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
  footer
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl'
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-[#1E372E]/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className={`relative w-full ${sizeClasses[size]} bg-[#F1EDE2] rounded-2xl shadow-2xl border border-[#DED8C8] max-h-[90vh] flex flex-col animate-in fade-in zoom-in duration-200`}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#DED8C8]">
          <h2 className="serif-title text-2xl text-[#1E372E]">{title}</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-[#254238]/10 hover:bg-[#254238]/20 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5 text-[#254238]" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="p-6 border-t border-[#DED8C8] bg-[#F8F5EE]">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};
