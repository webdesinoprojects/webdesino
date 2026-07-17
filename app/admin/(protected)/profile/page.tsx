import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { redirect } from "next/navigation";
import { isAllowedAdminEmail } from "@/lib/admin-auth";

export default async function ProfilePage() {
  const supabase = createClient();
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user || !isAllowedAdminEmail(user.email)) {
    redirect("/admin");
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-blue-900">My Profile</h1>
      
      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Account Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Email</Label>
            <Input value={user.email || ""} disabled />
          </div>
          <div className="space-y-2">
            <Label>User ID</Label>
            <Input value={user.id} disabled className="font-mono text-xs" />
          </div>
           <div className="space-y-2">
            <Label>Last Sign In</Label>
            <Input value={user.last_sign_in_at ? new Date(user.last_sign_in_at).toLocaleString() : "N/A"} disabled />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
