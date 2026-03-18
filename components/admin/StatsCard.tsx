"use client";

import { useEffect, useState } from "react";
import { Mail, Calendar, TrendingUp, Award, LucideIcon } from "lucide-react";

const ICON_MAP: Record<string, LucideIcon> = {
  Mail,
  Calendar,
  TrendingUp,
  Award,
};

interface StatsCardProps {
  title: string;
  value: number | string;
  icon: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  delay?: number;
  color?: string;
}

export default function StatsCard({
  title,
  value,
  icon,
  trend,
  delay = 0,
  color = "from-blue-500 to-indigo-600",
}: StatsCardProps) {
  const Icon = ICON_MAP[icon] ?? Mail;
  const [displayValue, setDisplayValue] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animation
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  useEffect(() => {
    if (typeof value === "number" && isVisible) {
      // Count-up animation
      const duration = 1000; // 1 second
      const steps = 30;
      const increment = value / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= value) {
          setDisplayValue(value);
          clearInterval(timer);
        } else {
          setDisplayValue(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [value, isVisible]);

  return (
    <div
      className={`bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-all duration-300 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <p className="text-sm font-medium text-slate-600 mb-1">{title}</p>
          <h3 className="text-3xl font-bold text-slate-900">
            {typeof value === "number" ? displayValue.toLocaleString() : value}
          </h3>
        </div>
        <div
          className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center shadow-sm`}
        >
          <Icon className="text-white" size={24} />
        </div>
      </div>

      {trend && (
        <div className="flex items-center gap-1 text-sm">
          <span
            className={`font-semibold ${
              trend.isPositive ? "text-green-600" : "text-red-600"
            }`}
          >
            {trend.isPositive ? "↑" : "↓"} {Math.abs(trend.value)}%
          </span>
          <span className="text-slate-500">vs last period</span>
        </div>
      )}
    </div>
  );
}
