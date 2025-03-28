
import React from 'react';
import { cn } from '@/app/lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
  iconClassName?: string;
}

const StatCard = ({ title, value, icon, trend, className, iconClassName }: StatCardProps) => {
  return (
    <div className={cn('stat-card animate-fade-in-up', className)}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-muted-foreground">{title}</span>
        {icon && <div className={cn('p-2 rounded-lg', iconClassName)}>{icon}</div>}
      </div>
      <div className="mt-1">
        <div className="text-2xl font-semibold">{value}</div>
        {trend && (
          <div className="flex items-center mt-1">
            <span
              className={cn(
                'text-xs font-medium flex items-center',
                trend.isPositive ? 'text-finance-green-dark' : 'text-finance-red-dark'
              )}
            >
              {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
            </span>
            <span className="text-xs text-muted-foreground ml-1">vs last month</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default StatCard;
