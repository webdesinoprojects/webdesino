"use client";

import { createServiceSubtype } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NewServiceSubtypePage({ params }: { params: { categoryId: string } }) {
  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="flex items-center gap-4">
        <Link href={`/admin/services/${params.categoryId}`}>
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold text-blue-900">Add Service Page</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Service Page Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={createServiceSubtype} className="space-y-4">
            <input type="hidden" name="categoryId" value={params.categoryId} />
            
            <div className="space-y-2">
              <Label htmlFor="title">Service Title</Label>
              <Input id="title" name="title" placeholder="e.g. Web Development" required />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="slug">Slug</Label>
              <Input id="slug" name="slug" placeholder="e.g. web-development" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" name="description" placeholder="Detailed description of the service..." required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="features">Features (One per line)</Label>
              <Textarea id="features" name="features" className="min-h-[100px]" placeholder="Custom Frontend&#10;API Integration&#10;Database Design" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="benefits">Benefits (One per line)</Label>
              <Textarea id="benefits" name="benefits" className="min-h-[100px]" placeholder="Scalable Architecture&#10;High Security&#10;Fast Loading" />
            </div>

            <div className="pt-4">
              <Button type="submit" className="w-full">Create Service Page</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
