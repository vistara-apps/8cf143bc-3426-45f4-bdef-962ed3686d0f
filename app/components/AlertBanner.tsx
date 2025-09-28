'use client';

import { AlertCircle, CheckCircle, Info, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AlertBannerProps {
  variant?: 'info' | 'warning' | 'success';
  title: string;
  message: string;
  onClose?: () => void;
  className?: string;
}

export function AlertBanner({ 
  variant = 'info', 
  title, 
  message, 
  onClose,
  className 
}: AlertBannerProps) {
  const icons = {
    info: Info,
    warning: AlertCircle,
    success: CheckCircle,
  };

  const styles = {
    info: 'bg-blue-500 bg-opacity-10 border-blue-500 text-blue-400',
    warning: 'bg-yellow-500 bg-opacity-10 border-yellow-500 text-yellow-400',
    success: 'bg-green-500 bg-opacity-10 border-green-500 text-green-400',
  };

  const Icon = icons[variant];

  return (
    <div className={cn(
      "p-4 border border-opacity-30 rounded-lg",
      styles[variant],
      className
    )}>
      <div className="flex items-start space-x-3">
        <Icon className="w-5 h-5 mt-0.5 flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <h4 className="font-medium">{title}</h4>
          <p className="text-sm opacity-90 mt-1">{message}</p>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="p-1 rounded-md hover:bg-black hover:bg-opacity-20 transition-colors flex-shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
