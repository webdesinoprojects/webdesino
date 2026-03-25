import { Suspense } from "react";
import prisma from "@/lib/prisma";
import { Prisma } from "@/lib/generated/prisma";
import type { LocationPage } from "@/lib/generated/prisma";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { deleteLocation } from "@/lib/actions";
import ActionsMenu from "@/components/admin/ActionsMenu";
import LocationFilters from "@/components/admin/LocationFilters";
import { mergeStateFilterOptions, labelForLocationState } from "@/lib/location-states";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Make this page dynamic to support search params
export const dynamic = 'force-dynamic';

const PAGE_SIZE = 50;

/** Raw WHERE — Prisma engine can reject `state` in `where` when out of sync with schema; SQL always matches the DB. */
function locationPageWhereClause(
  service: string | undefined,
  stateFilter: string | undefined,
  search: string | undefined
): Prisma.Sql {
  const parts: Prisma.Sql[] = [];
  if (service) parts.push(Prisma.sql`"serviceFocus" = ${service}`);
  if (stateFilter) parts.push(Prisma.sql`"state" = ${stateFilter}`);
  if (search) {
    const searchPattern = `%${search}%`;
    parts.push(Prisma.sql`("location" ILIKE ${searchPattern} OR "slug" ILIKE ${searchPattern})`);
  }
  return parts.length > 0
    ? Prisma.sql`WHERE ${Prisma.join(parts, " AND ")}`
    : Prisma.empty;
}

function locationsListHref(opts: {
  service?: string;
  state?: string;
  search?: string;
  page?: number;
}) {
  const p = new URLSearchParams();
  if (opts.service) p.set("service", opts.service);
  if (opts.state) p.set("state", opts.state);
  if (opts.search) p.set("search", opts.search);
  if (opts.page && opts.page > 1) p.set("page", String(opts.page));
  const s = p.toString();
  return s ? `/admin/locations?${s}` : "/admin/locations";
}

interface LocationsPageProps {
  searchParams: {
    service?: string;
    state?: string;
    search?: string;
    page?: string;
  };
}

export default async function LocationsPage({ searchParams }: LocationsPageProps) {
  const service = searchParams?.service;
  const stateFilter = searchParams?.state;
  const search = searchParams?.search;
  const parsedPage = parseInt(searchParams?.page ?? "1", 10);

  const stateDistinctRows = await prisma.$queryRaw<Array<{ state: string }>>(
    Prisma.sql`SELECT DISTINCT state FROM "LocationPage"`
  );
  const stateFilterOptions = mergeStateFilterOptions(
    stateDistinctRows
      .map((r) => r.state)
      .filter((s): s is string => s != null && s.length > 0)
  );

  const whereSql = locationPageWhereClause(service, stateFilter, search);

  const [countRow] = await prisma.$queryRaw<[{ count: bigint }]>(
    Prisma.sql`SELECT COUNT(*)::bigint AS count FROM "LocationPage" ${whereSql}`
  );
  const total = countRow ? Number(countRow.count) : 0;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const page = Math.min(
    Math.max(1, Number.isNaN(parsedPage) ? 1 : parsedPage),
    totalPages
  );
  const skip = (page - 1) * PAGE_SIZE;

  const locations = await prisma.$queryRaw<LocationPage[]>(
    Prisma.sql`SELECT * FROM "LocationPage" ${whereSql} ORDER BY "location" ASC, "slug" ASC LIMIT ${PAGE_SIZE} OFFSET ${skip}`
  );

  const services = [
    { value: "all-services", label: "All Services" },
    { value: "web-development", label: "Web Development" },
    { value: "digital-marketing", label: "Digital Marketing" },
    { value: "seo-services", label: "SEO Services" },
    { value: "graphic-designing", label: "Graphic Designing" },
    { value: "content-writing", label: "Content Writing" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-slate-800 tracking-tight">Locations</h1>
        <Link href="/admin/locations/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Add Location
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="bg-white p-4 rounded-lg border border-slate-200">
        <p className="text-sm text-slate-600">
          {total === 0 ? (
            <>No location pages</>
          ) : (
            <>
              Showing{" "}
              <span className="font-semibold text-slate-900">
                {skip + 1}–{Math.min(skip + locations.length, total)}
              </span>{" "}
              of <span className="font-semibold text-slate-900">{total}</span> location pages
              {stateFilter && (
                <span>
                  {" "}
                  · State:{" "}
                  <span className="font-semibold">
                    {labelForLocationState(stateFilter)}
                  </span>
                </span>
              )}
              {service && (
                <span>
                  {" "}
                  · Service:{" "}
                  <span className="font-semibold">
                    {services.find((s) => s.value === service)?.label}
                  </span>
                </span>
              )}
              {search && (
                <span>
                  {" "}
                  · Search:{" "}
                  <span className="font-semibold">"{search}"</span>
                </span>
              )}
              <span className="text-slate-500"> · Sorted A–Z by location name</span>
            </>
          )}
        </p>
      </div>

      <Suspense
        fallback={
          <div className="h-24 rounded-lg border border-slate-200 bg-white animate-pulse" />
        }
      >
        <LocationFilters stateOptions={stateFilterOptions} />
      </Suspense>

      <div className="rounded-2xl border border-slate-200/70 shadow-[0_2px_12px_rgba(0,0,0,0.04)] overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Location Name</TableHead>
              <TableHead>State</TableHead>
              <TableHead>Service</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {locations.map((loc) => (
              <TableRow key={loc.id}>
                <TableCell className="font-medium">{loc.location}</TableCell>
                <TableCell className="text-xs text-slate-600 max-w-[10rem]">
                  {labelForLocationState(loc.state)}
                </TableCell>
                <TableCell className="text-xs">
                  {services.find(s => s.value === loc.serviceFocus)?.label || loc.serviceFocus}
                </TableCell>
                <TableCell className="text-xs text-slate-500">{loc.slug}</TableCell>
                <TableCell className="text-right">
                  <ActionsMenu 
                    editUrl={`/admin/locations/${loc.id}`} 
                    id={loc.id} 
                    deleteAction={deleteLocation} 
                    itemName="location" 
                  />
                </TableCell>
              </TableRow>
            ))}
            {locations.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-10 text-gray-500">
                  No locations found.{" "}
                  {service || stateFilter
                    ? "Try adjusting your filters."
                    : "Add one to get started."}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {total > 0 && totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl border border-slate-200/70 bg-white px-4 py-3">
          <p className="text-sm text-slate-600">
            Page <span className="font-semibold text-slate-900">{page}</span> of{" "}
            <span className="font-semibold text-slate-900">{totalPages}</span>
          </p>
          <div className="flex items-center gap-2">
            {page <= 1 ? (
              <Button variant="outline" size="sm" disabled>
                <ChevronLeft className="h-4 w-4 mr-1" />
                Previous
              </Button>
            ) : (
              <Button variant="outline" size="sm" asChild>
                <Link href={locationsListHref({ service, state: stateFilter, search, page: page - 1 })}>
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Previous
                </Link>
              </Button>
            )}
            {page >= totalPages ? (
              <Button variant="outline" size="sm" disabled>
                Next
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            ) : (
              <Button variant="outline" size="sm" asChild>
                <Link href={locationsListHref({ service, state: stateFilter, search, page: page + 1 })}>
                  Next
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
