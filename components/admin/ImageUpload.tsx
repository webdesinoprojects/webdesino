"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { Loader2, X, Upload } from "lucide-react";
import { uploadMedia } from "@/lib/media-actions";

interface ImageUploadProps {
  name: string;
  defaultValue?: string;
  label?: string;
  onUploadComplete?: (url: string) => void;
}

export default function ImageUpload({ name, defaultValue, label = "Image", onUploadComplete }: ImageUploadProps) {
  const [imageUrl, setImageUrl] = useState(defaultValue || "");
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const media = await uploadMedia(formData);
      
      setImageUrl(media.url);
      if (onUploadComplete) {
        onUploadComplete(media.url);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Error uploading image");
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemove = () => {
    setImageUrl("");
    if (onUploadComplete) {
      onUploadComplete("");
    }
  };

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <Input type="hidden" name={name} value={imageUrl} />
      
      {imageUrl ? (
        <div className="relative w-full h-48 bg-slate-100 rounded-lg overflow-hidden border">
          <Image 
            src={imageUrl} 
            alt="Uploaded image" 
            fill 
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-contain"
          />
          <Button
            type="button"
            variant="destructive"
            size="icon"
            className="absolute top-2 right-2 h-8 w-8"
            onClick={handleRemove}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div className="flex items-center gap-4">
          <Input 
            type="file" 
            accept="image/*" 
            onChange={handleUpload} 
            disabled={isUploading}
          />
          {isUploading && <Loader2 className="h-4 w-4 animate-spin" />}
        </div>
      )}
    </div>
  );
}
