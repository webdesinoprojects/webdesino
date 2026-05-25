import prisma from "@/lib/prisma";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Eye, Megaphone } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default async function AdminAdsEnquiriesPage() {
  const enquiries = await prisma.enquiry.findMany({
    where: { source: "ads-landing" },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="h-8 w-8 rounded-lg bg-[#111184]/10 text-[#111184] flex items-center justify-center">
          <Megaphone size={16} />
        </div>
        <div>
          <h1 className="text-xl font-bold text-slate-800 tracking-tight">Ads Enquiries</h1>
          <p className="text-xs text-slate-400 mt-0.5">Leads submitted through landing-page campaigns</p>
        </div>
      </div>

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
                <TableCell>{enquiry.status}</TableCell>
                <TableCell>{new Date(enquiry.createdAt).toLocaleDateString()}</TableCell>
                <TableCell className="text-right">
                  <Link href={`/admin/enquiries/ads/${enquiry.id}`}>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-[#111184] hover:bg-[#111184]/5">
                      <Eye size={15} />
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
            {enquiries.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-10 text-gray-500">
                  No ads enquiries found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
