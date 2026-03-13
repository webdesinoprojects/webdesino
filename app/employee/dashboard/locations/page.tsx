import prisma from "@/lib/prisma";
import { requireEmployee } from "@/lib/employee-session";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus } from "lucide-react";
import { deleteLocation } from "@/lib/actions";
import ActionsMenu from "@/components/admin/ActionsMenu";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";

export default async function EmployeeLocationsPage() {
  await requireEmployee("locations");
  const locations = await prisma.locationPage.findMany({ orderBy: { location: "asc" } });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-slate-800 tracking-tight">Locations</h1>
        <Link href="/employee/dashboard/locations/new">
          <Button><Plus className="mr-2 h-4 w-4" /> Add Location</Button>
        </Link>
      </div>
      <div className="rounded-2xl border border-slate-200/70 shadow-[0_2px_12px_rgba(0,0,0,0.04)] overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Location Name</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead>Title</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {locations.map((loc) => (
              <TableRow key={loc.id}>
                <TableCell className="font-medium">{loc.location}</TableCell>
                <TableCell>{loc.slug}</TableCell>
                <TableCell className="max-w-md truncate">{loc.title}</TableCell>
                <TableCell className="text-right">
                  <ActionsMenu id={loc.id} editUrl={`/employee/dashboard/locations/${loc.id}`} deleteAction={deleteLocation} itemName="location" />
                </TableCell>
              </TableRow>
            ))}
            {locations.length === 0 && (
              <TableRow><TableCell colSpan={4} className="text-center py-10 text-gray-500">No locations found.</TableCell></TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
