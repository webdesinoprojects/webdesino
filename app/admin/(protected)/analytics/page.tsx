import prisma from "@/lib/prisma";
import { Metadata } from "next";
import { BarChart3 } from "lucide-react";
import StatsCard from "@/components/admin/StatsCard";
import ServicePieChart from "@/components/admin/ServicePieChart";
import DailyBarChart from "@/components/admin/DailyBarChart";
import LocationDistribution from "@/components/admin/LocationDistribution";
import {
  getEnquiryStats,
  getServiceCounts,
  getDailyCounts,
  getLocationCounts,
} from "@/lib/enquiry-analytics";

export const metadata: Metadata = {
  title: "Analytics Dashboard",
};

export default async function AnalyticsPage() {
  // Fetch all enquiries
  const enquiries = await prisma.enquiry.findMany({
    where: { source: { not: "ads-landing" } },
    orderBy: { createdAt: "desc" },
  });

  // Calculate analytics
  const stats = getEnquiryStats(enquiries);
  const serviceCounts = getServiceCounts(enquiries);
  const dailyCounts = getDailyCounts(enquiries, 7);
  const locationCounts = getLocationCounts(enquiries);

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex items-center gap-3">
        <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-sm">
          <BarChart3 size={16} className="text-white" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-slate-800 tracking-tight">
            Analytics Dashboard
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Enquiry insights and trends
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Enquiries"
          value={stats.total}
          icon="Mail"
          color="from-blue-500 to-indigo-600"
          delay={0}
        />
        <StatsCard
          title="Today's Enquiries"
          value={stats.today}
          icon="Calendar"
          color="from-green-500 to-emerald-600"
          delay={100}
        />
        <StatsCard
          title="This Week"
          value={stats.thisWeek}
          icon="TrendingUp"
          color="from-purple-500 to-pink-600"
          delay={200}
        />
        <StatsCard
          title="Top Service"
          value={stats.mostRequestedService}
          icon="Award"
          color="from-orange-500 to-red-600"
          delay={300}
        />
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ServicePieChart data={serviceCounts} delay={400} />
        <DailyBarChart data={dailyCounts} delay={500} />
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <LocationDistribution data={locationCounts} delay={600} />
        </div>

        {/* Quick Stats Card */}
        <div className="bg-gradient-to-br from-[#111184] to-[#1a1a9e] rounded-2xl p-6 text-white shadow-lg">
          <h3 className="text-lg font-bold mb-6">Quick Insights</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-lg bg-white/10 backdrop-blur-sm">
              <span className="text-sm">Conversion Rate</span>
              <span className="text-lg font-bold">
                {stats.total > 0
                  ? Math.round((stats.thisWeek / stats.total) * 100)
                  : 0}
                %
              </span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-white/10 backdrop-blur-sm">
              <span className="text-sm">Avg. Daily</span>
              <span className="text-lg font-bold">
                {dailyCounts.length > 0
                  ? Math.round(
                      dailyCounts.reduce((sum, d) => sum + d.count, 0) /
                        dailyCounts.length
                    )
                  : 0}
              </span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-white/10 backdrop-blur-sm">
              <span className="text-sm">Peak Day</span>
              <span className="text-lg font-bold">
                {dailyCounts.length > 0
                  ? Math.max(...dailyCounts.map((d) => d.count))
                  : 0}
              </span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-white/10 backdrop-blur-sm">
              <span className="text-sm">Services</span>
              <span className="text-lg font-bold">{serviceCounts.length}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity Summary */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
        <h3 className="text-lg font-bold text-slate-900 mb-4">
          Activity Summary
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 rounded-lg bg-blue-50">
            <p className="text-sm text-blue-600 font-medium mb-2">
              Most Active Day
            </p>
            <p className="text-2xl font-bold text-blue-900">
              {dailyCounts.length > 0
                ? dailyCounts.reduce((max, d) =>
                    d.count > max.count ? d : max
                  ).label
                : "N/A"}
            </p>
          </div>
          <div className="text-center p-4 rounded-lg bg-green-50">
            <p className="text-sm text-green-600 font-medium mb-2">
              Growth This Week
            </p>
            <p className="text-2xl font-bold text-green-900">
              {stats.thisWeek > 0 ? "+" : ""}
              {stats.thisWeek}
            </p>
          </div>
          <div className="text-center p-4 rounded-lg bg-purple-50">
            <p className="text-sm text-purple-600 font-medium mb-2">
              Unique Locations
            </p>
            <p className="text-2xl font-bold text-purple-900">
              {locationCounts.length}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
