'use client';

import { TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DashboardMetricProps {
  title: string;
  value: string;
  change?: {
    value: string;
    trend: 'up' | 'down';
  };
  icon?: React.ReactNode;
  className?: string;
}

export function DashboardMetric({ 
  title, 
  value, 
  change, 
  icon,
  className 
}: DashboardMetricProps) {
  return (
    <div className={cn("metric-card", className)}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-text-secondary mb-1">{title}</p>
          <p className="text-2xl font-bold text-fg">{value}</p>
          
          {change && (
            <div className={cn(
              "flex items-center space-x-1 text-sm mt-2",
              change.trend === 'up' ? 'text-green-400' : 'text-red-400'
            )}>
              {change.trend === 'up' ? (
                <TrendingUp className="w-4 h-4" />
              ) : (
                <TrendingDown className="w-4 h-4" />
              )}
              <span>{change.value}</span>
            </div>
          )}
        </div>
        
        {icon && (
          <div className="text-accent">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}
