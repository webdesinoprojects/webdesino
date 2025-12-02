import { cookies } from "next/headers";
import { verifyToken } from "@/lib/jwt";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default async function ProfilePage() {
  const cookieStore = cookies();
  const token = cookieStore.get("session")?.value;
  const session = token ? await verifyToken(token) : null;

  if (!session) return null;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-blue-900">My Profile</h1>
      
      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Account Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Name</Label>
            <Input value={session.name as string} disabled />
          </div>
          <div className="space-y-2">
            <Label>Email</Label>
            <Input value={session.email as string} disabled />
          </div>
          <div className="space-y-2">
            <Label>User ID</Label>
            <Input value={session.id as string} disabled className="font-mono text-xs" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
