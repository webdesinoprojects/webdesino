import prisma from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, FileText, Mail, Users } from "lucide-react";

export default async function DashboardPage() {
  try {
    const projectCount = await prisma.project.count();
    const blogCount = await prisma.blogPost.count();
    const enquiryCount = await prisma.enquiry.count();

    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-blue-900">Dashboard</h1>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard title="Total Projects" value={projectCount.toString()} icon={<Briefcase className="h-4 w-4 text-muted-foreground" />} />
          <StatCard title="Active Blogs" value={blogCount.toString()} icon={<FileText className="h-4 w-4 text-muted-foreground" />} />
          <StatCard title="Enquiries" value={enquiryCount.toString()} icon={<Mail className="h-4 w-4 text-muted-foreground" />} />
          <StatCard title="Clients" value="0" icon={<Users className="h-4 w-4 text-muted-foreground" />} />
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Welcome to WebDesino Admin</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Select an option from the sidebar to manage your website content.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  } catch (error) {
    console.error("Dashboard Error:", error);
    return (
      <div className="p-6 text-red-500">
        <h1 className="text-2xl font-bold">Error Loading Dashboard</h1>
        <p>Please check the server logs for more details.</p>
        <pre className="mt-4 bg-gray-100 p-4 rounded text-sm text-black overflow-auto">
          {JSON.stringify(error, null, 2)}
        </pre>
      </div>
    );
  }
}

function StatCard({ title, value, icon }: { title: string; value: string; icon: React.ReactNode }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
      </CardContent>
    </Card>
  );
}
