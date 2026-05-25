import prisma from "@/lib/prisma";
import { requireEmployee } from "@/lib/employee-session";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import Link from "next/link";

export default async function EmployeeAdsEnquiriesPage() {
  await requireEmployee("ads-enquiries");

  const enquiries = await prisma.enquiry.findMany({
    where: { source: "ads-landing" },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold text-slate-800 tracking-tight">Ads Enquiries</h1>

      <div className="rounded-2xl border border-slate-200/70 shadow-[0_2px_12px_rgba(0,0,0,0.04)] overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Service</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {enquiries.map((enquiry) => (
              <TableRow key={enquiry.id}>
                <TableCell className="font-medium">{enquiry.name}</TableCell>
                <TableCell>{enquiry.email}</TableCell>
                <TableCell>{enquiry.service || "Landing Page"}</TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      enquiry.status === "new"
                        ? "bg-green-100 text-green-800"
                        : enquiry.status === "contacted"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {enquiry.status.toUpperCase()}
                  </span>
                </TableCell>
                <TableCell>{new Date(enquiry.createdAt).toLocaleDateString()}</TableCell>
                <TableCell className="text-right">
                  <Link href={`/employee/dashboard/ads-enquiries/${enquiry.id}`}>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-slate-400 hover:text-[#111184] hover:bg-[#111184]/5"
                    >
                      <Eye size={15} />
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
            {enquiries.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-10 text-gray-500">
                  No ads enquiries yet.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
