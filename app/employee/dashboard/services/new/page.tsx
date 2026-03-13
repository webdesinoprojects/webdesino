"use client";

import { createServiceCategory } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function EmployeeNewServiceCategoryPage() {
  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="flex items-center gap-4">
        <Link href="/employee/dashboard/services">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold text-blue-900">Add Service Category</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Category Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={createServiceCategory} className="space-y-4">
            <input type="hidden" name="_returnPath" value="/employee/dashboard/services" />
            <div className="space-y-2">
              <Label htmlFor="title">Category Title</Label>
              <Input id="title" name="title" placeholder="e.g. Website Solutions" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="slug">Slug</Label>
              <Input id="slug" name="slug" placeholder="e.g. website-solutions" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="icon">Icon Name (Lucide)</Label>
              <Input id="icon" name="icon" placeholder="e.g. Layout" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" name="description" placeholder="Brief description of this category..." required />
            </div>

            <div className="pt-4">
              <Button type="submit" className="w-full">Create Category</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
