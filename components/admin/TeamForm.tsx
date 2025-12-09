"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { createTeamMember, updateTeamMember } from "@/lib/actions";
import ImageUpload from "@/components/admin/ImageUpload";
import { useRouter } from "next/navigation";

interface TeamFormProps {
  member?: {
    id: string;
    name: string;
    role: string;
    image: string;
    order: number;
  };
}

export default function TeamForm({ member }: TeamFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    name: member?.name || "",
    role: member?.role || "",
    image: member?.image || "",
    order: member?.order || 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (member) {
        await updateTeamMember(member.id, formData);
      } else {
        await createTeamMember(formData);
      }
      router.push("/admin/team");
    } catch (error) {
      console.error("Error saving team member:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="flex items-center gap-4">
        <Link href="/admin/team">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold text-blue-900">
          {member ? "Edit Team Member" : "Add Team Member"}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Member Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Input
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="order">Display Order</Label>
              <Input
                id="order"
                name="order"
                type="number"
                value={formData.order}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label>Profile Image</Label>
              <ImageUpload 
                name="image" 
                label="Upload Profile Image"
                defaultValue={formData.image}
                onUploadComplete={(url) => setFormData(prev => ({ ...prev, image: url }))}
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4">
          <Link href="/admin/team">
            <Button variant="outline" type="button">
              Cancel
            </Button>
          </Link>
          <Button type="submit" disabled={loading}>
            {loading ? "Saving..." : (member ? "Update Member" : "Add Member")}
          </Button>
        </div>
      </form>
    </div>
  );
}
