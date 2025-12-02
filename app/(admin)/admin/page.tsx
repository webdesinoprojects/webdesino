import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, FileText, Mail, Users } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* STATS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Projects" value="12" icon={<Briefcase className="h-4 w-4 text-muted-foreground" />} />
        <StatCard title="Active Blogs" value="24" icon={<FileText className="h-4 w-4 text-muted-foreground" />} />
        <StatCard title="Enquiries" value="5" icon={<Mail className="h-4 w-4 text-muted-foreground" />} />
        <StatCard title="Clients" value="8" icon={<Users className="h-4 w-4 text-muted-foreground" />} />
      </div>

      {/* WELCOME SECTION */}
      <Card>
        <CardHeader>
          <CardTitle>Welcome Back</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">
            Select a module from the sidebar to start managing your content. 
            You can add new portfolio items, write blog posts, or check your latest messages.
          </p>
        </CardContent>
      </Card>
    </div>
  );
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