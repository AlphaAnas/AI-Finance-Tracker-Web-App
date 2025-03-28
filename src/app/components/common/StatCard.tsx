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
  style?: React.CSSProperties;
  iconStyle?: React.CSSProperties;
}

const StatCard = ({ 
  title, 
  value, 
  icon, 
  trend, 
  className, 
  iconClassName, 
  style, 
  iconStyle 
}: StatCardProps) => {
  return (
    <div className={`stat-card animate-fade-in-up ${className || ''}`} style={style}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-muted-foreground">{title}</span>
        {icon && (
          <div 
            className={`p-2 rounded-lg ${iconClassName || ''}`} 
            style={iconStyle}
          >
            {icon}
          </div>
        )}
      </div>
      <div className="mt-1">
        <div className="text-2xl font-semibold">{value}</div>
        {trend && (
          <div className="flex items-center mt-1">
            <span
              className={`text-xs font-medium flex items-center ${
                trend.isPositive ? 'text-[#16A34A]' : 'text-[#DC2626]'
              }`}
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
