"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { createClient, updateClient } from "@/lib/actions";
import ImageUpload from "@/components/admin/ImageUpload";

interface ClientFormProps {
  client?: {
    id: string;
    name: string;
    url: string;
    image: string;
    category: string;
  };
  returnPath?: string;
}

const CATEGORIES = [
  "Our Clients",
  "Querky",
  "Shopify Websites",
  "Our Apps",
  "Digital Marketing",
  "Graphic Designing",
];

export default function ClientForm({ client, returnPath }: ClientFormProps) {
  const isEditing = !!client;
  const action = isEditing ? updateClient.bind(null, client.id) : createClient;
  const [imageUrl, setImageUrl] = useState(client?.image || "");
  const back = returnPath || "/admin/clients";

  return (
    <div className="admin-form-shell space-y-6">
      <div className="flex items-center space-x-4">
        <Link href={back}>
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold text-blue-900">
          {isEditing ? "Edit Client" : "Add New Client"}
        </h1>
      </div>

      <Card className="admin-form-card">
        <CardHeader>
          <CardTitle>Client Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={action} className="admin-premium-form space-y-6">
            {returnPath && <input type="hidden" name="_returnPath" value={returnPath} />}
            <div className="space-y-2">
              <Label htmlFor="name">Client Name</Label>
              <Input
                id="name"
                name="name"
                defaultValue={client?.name}
                required
                placeholder="e.g. BookBuzzz"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="url">Website URL</Label>
              <Input
                id="url"
                name="url"
                defaultValue={client?.url}
                required
                placeholder="https://..."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select name="category" defaultValue={client?.category || "Our Clients"}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Client Logo / Screenshot</Label>
              <ImageUpload
                name="client-image"
                defaultValue={client?.image}
                onUploadComplete={(url) => setImageUrl(url)}
              />
              <input type="hidden" name="image" value={imageUrl} />
            </div>

            <div className="flex justify-end space-x-4">
              <Link href={back}>
                <Button variant="outline" type="button">
                  Cancel
                </Button>
              </Link>
              <Button type="submit" disabled={!imageUrl}>
                {isEditing ? "Update Client" : "Create Client"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
