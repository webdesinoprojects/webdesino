import prisma from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { ArrowLeft, Mail, Phone, Calendar, Tag, Megaphone } from "lucide-react";
import { notFound } from "next/navigation";
import { requireEmployee } from "@/lib/employee-session";
import EnquiryStatusUpdater from "../../enquiries/EnquiryStatusUpdater";

interface PageProps {
  params: { id: string };
}

export default async function EmployeeAdsEnquiryDetailPage({ params }: PageProps) {
  await requireEmployee("ads-enquiries");

  const enquiry = await prisma.enquiry.findFirst({
    where: {
      id: params.id,
      source: "ads-landing",
    },
  });

  if (!enquiry) notFound();

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div className="flex items-center gap-4">
        <Link href="/employee/dashboard/ads-enquiries">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold text-slate-800">Ads Enquiry Details</h1>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-start flex-wrap gap-3">
            <CardTitle className="text-xl">From: {enquiry.name}</CardTitle>
            <span
              className={`px-3 py-1 rounded-full text-sm font-semibold ${
                enquiry.status === "new"
                  ? "bg-green-100 text-green-800"
                  : enquiry.status === "contacted"
                  ? "bg-blue-100 text-blue-800"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              {enquiry.status.toUpperCase()}
            </span>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-gray-600">
                <Mail className="h-4 w-4" />
                <a href={`mailto:${enquiry.email}`} className="hover:text-blue-600">
                  {enquiry.email}
                </a>
              </div>
              {enquiry.phone && (
                <div className="flex items-center gap-3 text-gray-600">
                  <Phone className="h-4 w-4" />
                  <a href={`tel:${enquiry.phone}`} className="hover:text-blue-600">
                    {enquiry.phone}
                  </a>
                </div>
              )}
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-gray-600">
                <Tag className="h-4 w-4" />
                <span>Service: {enquiry.service || "Landing Page"}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <Megaphone className="h-4 w-4" />
                <span>Source: Ads Landing Page</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <Calendar className="h-4 w-4" />
                <span>{new Date(enquiry.createdAt).toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div className="border-t pt-6">
            <h3 className="font-semibold mb-3">Message:</h3>
            <div className="bg-gray-50 p-4 rounded-lg whitespace-pre-wrap text-gray-700">
              {enquiry.message}
            </div>
          </div>

          <div className="border-t pt-6">
            <EnquiryStatusUpdater id={enquiry.id} current={enquiry.status} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
