import { Enquiry } from "@prisma/client";
import { startOfDay, subDays, format, isWithinInterval, startOfWeek } from "date-fns";

export interface ServiceCount {
  service: string;
  count: number;
  percentage: number;
}

export interface DailyCount {
  date: string;
  count: number;
  label: string;
}

export interface LocationCount {
  location: string;
  count: number;
}

export interface EnquiryStats {
  total: number;
  today: number;
  thisWeek: number;
  mostRequestedService: string;
}

/**
 * Get summary statistics from enquiries
 */
export function getEnquiryStats(enquiries: Enquiry[]): EnquiryStats {
  const now = new Date();
  const todayStart = startOfDay(now);
  const weekStart = startOfWeek(now, { weekStartsOn: 1 }); // Monday

  const today = enquiries.filter(
    (e) => new Date(e.createdAt) >= todayStart
  ).length;

  const thisWeek = enquiries.filter(
    (e) => new Date(e.createdAt) >= weekStart
  ).length;

  // Find most requested service
  const serviceCounts = getServiceCounts(enquiries);
  const mostRequestedService =
    serviceCounts.length > 0 ? serviceCounts[0].service : "N/A";

  return {
    total: enquiries.length,
    today,
    thisWeek,
    mostRequestedService,
  };
}

/**
 * Get enquiry counts by service
 */
export function getServiceCounts(enquiries: Enquiry[]): ServiceCount[] {
  const serviceMap = new Map<string, number>();

  enquiries.forEach((enquiry) => {
    const service = enquiry.service || "General Enquiry";
    serviceMap.set(service, (serviceMap.get(service) || 0) + 1);
  });

  const total = enquiries.length || 1; // Avoid division by zero

  const counts: ServiceCount[] = Array.from(serviceMap.entries())
    .map(([service, count]) => ({
      service,
      count,
      percentage: Math.round((count / total) * 100),
    }))
    .sort((a, b) => b.count - a.count);

  return counts;
}

/**
 * Get enquiry counts per day for the last N days
 */
export function getDailyCounts(
  enquiries: Enquiry[],
  days: number = 7
): DailyCount[] {
  const now = new Date();
  const dailyMap = new Map<string, number>();

  // Initialize all days with 0
  for (let i = days - 1; i >= 0; i--) {
    const date = subDays(now, i);
    const dateKey = format(date, "yyyy-MM-dd");
    dailyMap.set(dateKey, 0);
  }

  // Count enquiries per day
  enquiries.forEach((enquiry) => {
    const date = new Date(enquiry.createdAt);
    const dateKey = format(date, "yyyy-MM-dd");

    if (dailyMap.has(dateKey)) {
      dailyMap.set(dateKey, (dailyMap.get(dateKey) || 0) + 1);
    }
  });

  // Convert to array with labels
  const counts: DailyCount[] = Array.from(dailyMap.entries()).map(
    ([date, count]) => ({
      date,
      count,
      label: format(new Date(date), "MMM dd"),
    })
  );

  return counts;
}

/**
 * Get enquiry counts by location
 */
export function getLocationCounts(enquiries: Enquiry[]): LocationCount[] {
  const locationMap = new Map<string, number>();

  enquiries.forEach((enquiry) => {
    // Extract location from message if it exists
    const locationMatch = enquiry.message.match(/\[Location: ([^\]]+)\]/);
    const location = locationMatch ? locationMatch[1] : "Not Specified";

    locationMap.set(location, (locationMap.get(location) || 0) + 1);
  });

  const counts: LocationCount[] = Array.from(locationMap.entries())
    .map(([location, count]) => ({
      location,
      count,
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10); // Top 10 locations

  return counts;
}

/**
 * Filter enquiries by date range
 */
export function filterEnquiriesByDateRange(
  enquiries: Enquiry[],
  startDate: Date,
  endDate: Date
): Enquiry[] {
  return enquiries.filter((enquiry) =>
    isWithinInterval(new Date(enquiry.createdAt), {
      start: startDate,
      end: endDate,
    })
  );
}
