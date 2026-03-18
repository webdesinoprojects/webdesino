"use client";

import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { ServiceCount } from "@/lib/enquiry-analytics";

interface ServicePieChartProps {
  data: ServiceCount[];
  delay?: number;
}

const COLORS = [
  "#111184",
  "#4338CA",
  "#6366F1",
  "#818CF8",
  "#A5B4FC",
  "#C7D2FE",
];

export default function ServicePieChart({
  data,
  delay = 0,
}: ServicePieChartProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  const chartData = data.map((item) => ({
    name: item.service,
    value: item.count,
  }));

  return (
    <div
      className={`bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-all duration-300 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      <div className="mb-6">
        <h3 className="text-lg font-bold text-slate-900 mb-1">
          Enquiries by Service
        </h3>
        <p className="text-sm text-slate-500">Distribution of service requests</p>
      </div>

      {data.length === 0 ? (
        <div className="h-64 flex items-center justify-center text-slate-400">
          No data available
        </div>
      ) : (
        <>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) =>
                  `${name}: ${(percent * 100).toFixed(0)}%`
                }
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                animationBegin={0}
                animationDuration={800}
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>

          {/* Service breakdown list */}
          <div className="mt-6 space-y-2">
            {data.slice(0, 5).map((item, index) => (
              <div
                key={item.service}
                className="flex items-center justify-between p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />
                  <span className="text-sm font-medium text-slate-700">
                    {item.service}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-slate-500">
                    {item.count} enquiries
                  </span>
                  <span className="text-xs font-semibold text-slate-900 bg-slate-200 px-2 py-1 rounded">
                    {item.percentage}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
