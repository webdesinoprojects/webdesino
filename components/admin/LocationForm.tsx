"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { createLocation, updateLocation } from "@/lib/actions";

interface LocationFormProps {
  location?: {
    id: string;
    location: string;
    slug: string;
    title: string;
    description: string | null;
  };
}

export default function LocationForm({ location }: LocationFormProps) {
  const isEditing = !!location;
  const action = isEditing ? updateLocation.bind(null, location.id) : createLocation;

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="flex items-center gap-4">
        <Link href="/admin/locations">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold text-blue-900">
          {isEditing ? "Edit Location" : "Add New Location"}
        </h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Location Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={action} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="location">Location Name</Label>
              <Input
                id="location"
                name="location"
                placeholder="e.g. New Delhi"
                defaultValue={location?.location}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="slug">Slug</Label>
              <Input
                id="slug"
                name="slug"
                placeholder="e.g. best-web-developer-in-new-delhi"
                defaultValue={location?.slug}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="title">Page Title</Label>
              <Input
                id="title"
                name="title"
                placeholder="e.g. Best Web Development Company in New Delhi"
                defaultValue={location?.title}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Meta Description</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="SEO Description..."
                defaultValue={location?.description || ""}
                rows={4}
              />
            </div>

            <div className="flex justify-end gap-4">
              <Link href="/admin/locations">
                <Button variant="outline" type="button">
                  Cancel
                </Button>
              </Link>
              <Button type="submit">
                {isEditing ? "Update Location" : "Create Location"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
