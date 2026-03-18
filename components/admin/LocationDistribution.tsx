"use client";

import { useEffect, useState } from "react";
import { MapPin } from "lucide-react";
import { LocationCount } from "@/lib/enquiry-analytics";

interface LocationDistributionProps {
  data: LocationCount[];
  delay?: number;
}

export default function LocationDistribution({
  data,
  delay = 0,
}: LocationDistributionProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  const maxCount = Math.max(...data.map((item) => item.count), 1);

  return (
    <div
      className={`bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-all duration-300 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      <div className="mb-6">
        <h3 className="text-lg font-bold text-slate-900 mb-1">
          Top Locations
        </h3>
        <p className="text-sm text-slate-500">Enquiries by location</p>
      </div>

      {data.length === 0 ? (
        <div className="h-64 flex items-center justify-center text-slate-400">
          No location data available
        </div>
      ) : (
        <div className="space-y-3">
          {data.map((item, index) => {
            const percentage = (item.count / maxCount) * 100;

            return (
              <div
                key={item.location}
                className="group"
                style={{
                  animation: `slideIn 0.5s ease-out ${index * 0.1}s both`,
                }}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <MapPin
                      size={16}
                      className="text-[#111184] flex-shrink-0"
                    />
                    <span className="text-sm font-medium text-slate-700">
                      {item.location}
                    </span>
                  </div>
                  <span className="text-sm font-bold text-slate-900">
                    {item.count}
                  </span>
                </div>
                <div className="relative h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#111184] to-[#4338CA] rounded-full transition-all duration-1000 ease-out"
                    style={{
                      width: `${percentage}%`,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}

      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
}
