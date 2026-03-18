"use client";

import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { DailyCount } from "@/lib/enquiry-analytics";

interface DailyBarChartProps {
  data: DailyCount[];
  delay?: number;
}

export default function DailyBarChart({ data, delay = 0 }: DailyBarChartProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      className={`bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-all duration-300 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      <div className="mb-6">
        <h3 className="text-lg font-bold text-slate-900 mb-1">
          Daily Enquiries
        </h3>
        <p className="text-sm text-slate-500">Last 7 days activity</p>
      </div>

      {data.length === 0 ? (
        <div className="h-64 flex items-center justify-center text-slate-400">
          No data available
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis
              dataKey="label"
              tick={{ fill: "#64748b", fontSize: 12 }}
              axisLine={{ stroke: "#e2e8f0" }}
            />
            <YAxis
              tick={{ fill: "#64748b", fontSize: 12 }}
              axisLine={{ stroke: "#e2e8f0" }}
              allowDecimals={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                border: "1px solid #e2e8f0",
                borderRadius: "8px",
                boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
              }}
              cursor={{ fill: "rgba(17, 17, 132, 0.05)" }}
            />
            <Bar
              dataKey="count"
              fill="#111184"
              radius={[8, 8, 0, 0]}
              animationBegin={0}
              animationDuration={800}
            />
          </BarChart>
        </ResponsiveContainer>
      )}

      {/* Summary stats */}
      <div className="mt-6 grid grid-cols-3 gap-4">
        <div className="text-center p-3 rounded-lg bg-slate-50">
          <p className="text-xs text-slate-500 mb-1">Total</p>
          <p className="text-lg font-bold text-slate-900">
            {data.reduce((sum, item) => sum + item.count, 0)}
          </p>
        </div>
        <div className="text-center p-3 rounded-lg bg-slate-50">
          <p className="text-xs text-slate-500 mb-1">Average</p>
          <p className="text-lg font-bold text-slate-900">
            {Math.round(
              data.reduce((sum, item) => sum + item.count, 0) / data.length
            )}
          </p>
        </div>
        <div className="text-center p-3 rounded-lg bg-slate-50">
          <p className="text-xs text-slate-500 mb-1">Peak Day</p>
          <p className="text-lg font-bold text-slate-900">
            {Math.max(...data.map((item) => item.count))}
          </p>
        </div>
      </div>
    </div>
  );
}
