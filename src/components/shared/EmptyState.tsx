import React from 'react';
import { LucideIcon } from 'lucide-react';
import { Card } from './Card';
import { Button } from './Button';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon: Icon,
  title,
  description,
  action
}) => {
  return (
    <Card variant="organic" className="p-12">
      <div className="flex flex-col items-center text-center space-y-4 max-w-md mx-auto">
        <div className="w-16 h-16 rounded-2xl bg-[#A3C3B7]/30 flex items-center justify-center">
          <Icon className="w-8 h-8 text-[#698a7f]" />
        </div>
        <div className="space-y-2">
          <h3 className="serif-title text-xl text-[#1E372E]">{title}</h3>
          <p className="text-sm text-[#698a7f]">{description}</p>
        </div>
        {action && (
          <Button variant="primary" onClick={action.onClick}>
            {action.label}
          </Button>
        )}
      </div>
    </Card>
  );
};
