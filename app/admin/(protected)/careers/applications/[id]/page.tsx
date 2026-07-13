import prisma from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { ArrowLeft, Mail, Phone, Tag, Calendar, Download, FileText } from "lucide-react";
import { notFound } from "next/navigation";
import CareerApplicationStatus from "@/components/admin/CareerApplicationStatus";

export const dynamic = "force-dynamic";

export default async function AdminCareerApplicationDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const application = (await prisma.careerApplication.findUnique({
    where: { id: params.id },
  })) as any;

  if (!application) notFound();

  const fields = (await prisma.careerFormField.findMany({
    orderBy: { order: "asc" },
  })) as any[];

  const data = application.data || {};
  const shownKeys = new Set(fields.map((f) => f.key));
  const extraEntries = Object.entries(data).filter(([k]) => !shownKeys.has(k));

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div className="flex items-center gap-4">
        <Link href="/admin/careers/applications">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold text-blue-900">Application Details</h1>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-start gap-3 flex-wrap">
            <CardTitle className="text-xl">From: {application.name}</CardTitle>
            <span className="px-3 py-1 rounded-full text-sm font-semibold bg-slate-100 text-slate-700">
              {String(application.status || "new").toUpperCase()}
            </span>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <CareerApplicationStatus id={application.id} current={application.status || "new"} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-600">
                <Mail className="h-4 w-4" />
                <a href={`mailto:${application.email}`} className="hover:text-blue-600">
                  {application.email}
                </a>
              </div>
              {application.phone && (
                <div className="flex items-center gap-3 text-gray-600">
                  <Phone className="h-4 w-4" />
                  <a href={`tel:${application.phone}`} className="hover:text-blue-600">
                    {application.phone}
                  </a>
                </div>
              )}
              {application.cvUrl && (
                <div className="flex items-center gap-3 text-gray-600">
                  <FileText className="h-4 w-4" />
                  <a
                    href={application.cvUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[#111184] font-medium hover:underline"
                  >
                    {application.cvName || "Download CV"} <Download className="h-3.5 w-3.5" />
                  </a>
                </div>
              )}
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-600">
                <Tag className="h-4 w-4" />
                <span>Category: {application.categoryName || "—"}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <Calendar className="h-4 w-4" />
                <span>{new Date(application.createdAt).toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div className="border-t pt-6">
            <h3 className="font-semibold mb-3">Submitted Details</h3>
            <div className="rounded-xl border border-slate-200 overflow-hidden">
              <table className="w-full text-sm">
                <tbody>
                  {fields.map((f) => {
                    const raw = data[f.key];
                    let value: string;
                    if (f.type === "file") {
                      value = application.cvName || (raw ? "Attached" : "—");
                    } else {
                      value = raw == null || raw === "" ? "—" : String(raw);
                    }
                    return (
                      <tr key={f.key} className="border-b last:border-b-0">
                        <td className="w-1/3 bg-slate-50 px-4 py-3 text-slate-500 align-top">{f.label}</td>
                        <td className="px-4 py-3 text-slate-800 whitespace-pre-wrap">{value}</td>
                      </tr>
                    );
                  })}
                  {extraEntries.map(([k, v]) => (
                    <tr key={k} className="border-b last:border-b-0">
                      <td className="w-1/3 bg-slate-50 px-4 py-3 text-slate-400 align-top italic">{k}</td>
                      <td className="px-4 py-3 text-slate-500 italic whitespace-pre-wrap">
                        {v == null || v === "" ? "—" : String(v)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {application.note && (
              <div className="mt-4">
                <h4 className="text-sm font-medium text-slate-700 mb-2">Cover note</h4>
                <div className="bg-slate-50 p-4 rounded-lg whitespace-pre-wrap text-slate-700 text-sm">
                  {application.note}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
