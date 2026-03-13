"use client";

import { useId, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { ImagePlus, Loader2, UploadCloud, X } from "lucide-react";
import { uploadMedia } from "@/lib/media-actions";

interface ImageUploadProps {
  name: string;
  defaultValue?: string;
  defaultValues?: string[];
  label?: string;
  onUploadComplete?: (url: string) => void;
  onUploadCompleteMultiple?: (urls: string[]) => void;
  multiple?: boolean;
  maxFiles?: number;
}

export default function ImageUpload({
  name,
  defaultValue,
  defaultValues = [],
  label = "Image",
  onUploadComplete,
  onUploadCompleteMultiple,
  multiple = false,
  maxFiles = 10,
}: ImageUploadProps) {
  const inputId = useId();
  const [imageUrl, setImageUrl] = useState(defaultValue || "");
  const [imageUrls, setImageUrls] = useState<string[]>(defaultValues);
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    try {
      if (!multiple) {
        const formData = new FormData();
        formData.append("file", files[0]);

        const media = await uploadMedia(formData);

        setImageUrl(media.url);
        if (onUploadComplete) {
          onUploadComplete(media.url);
        }
      } else {
        const selectedFiles = Array.from(files).slice(0, maxFiles);
        const uploadedUrls: string[] = [];

        for (const file of selectedFiles) {
          const formData = new FormData();
          formData.append("file", file);
          const media = await uploadMedia(formData);
          uploadedUrls.push(media.url);
        }

        const merged = [...imageUrls, ...uploadedUrls].slice(0, maxFiles);
        setImageUrls(merged);
        if (onUploadCompleteMultiple) {
          onUploadCompleteMultiple(merged);
        }
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Error uploading image");
    } finally {
      setIsUploading(false);
      e.target.value = "";
    }
  };

  const handleRemove = () => {
    setImageUrl("");
    if (onUploadComplete) {
      onUploadComplete("");
    }
  };

  const handleRemoveAtIndex = (index: number) => {
    const next = imageUrls.filter((_, i) => i !== index);
    setImageUrls(next);
    if (onUploadCompleteMultiple) {
      onUploadCompleteMultiple(next);
    }
  };

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      {!multiple && <Input type="hidden" name={name} value={imageUrl} />}

      <Input
        id={inputId}
        type="file"
        accept="image/*"
        multiple={multiple}
        onChange={handleUpload}
        disabled={isUploading || (multiple && imageUrls.length >= maxFiles)}
        className="sr-only"
      />

      {multiple ? (
        <>
          {imageUrls.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {imageUrls.map((url, index) => (
                <div key={`${url}-${index}`} className="relative w-full h-28 bg-slate-100 rounded-lg overflow-hidden border border-slate-200">
                  <Image
                    src={url}
                    alt={`Uploaded image ${index + 1}`}
                    fill
                    sizes="(max-width: 768px) 50vw, 20vw"
                    className="object-cover"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute top-1.5 right-1.5 h-6 w-6"
                    onClick={() => handleRemoveAtIndex(index)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          )}

          <label
            htmlFor={inputId}
            className={`group flex flex-col items-center justify-center rounded-xl border border-dashed px-5 py-7 transition-all ${
              isUploading || imageUrls.length >= maxFiles
                ? "border-slate-200 bg-slate-50 text-slate-400 cursor-not-allowed"
                : "border-slate-300 bg-white hover:border-[#111184]/50 hover:bg-[#111184]/5 cursor-pointer"
            }`}
          >
            {isUploading ? (
              <Loader2 className="h-5 w-5 animate-spin mb-2 text-[#111184]" />
            ) : (
              <UploadCloud className="h-5 w-5 mb-2 text-slate-500 group-hover:text-[#111184]" />
            )}
            <p className="text-sm font-medium text-slate-700 group-hover:text-[#111184]">
              {isUploading ? "Uploading images..." : "Click to upload gallery images"}
            </p>
            <p className="text-xs text-slate-500 mt-1">PNG, JPG, WebP up to 10MB each</p>
          </label>
          <p className="text-xs text-slate-500">
            Upload up to {maxFiles} images. Uploaded: {imageUrls.length}
          </p>
        </>
      ) : imageUrl ? (
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
        <label
          htmlFor={inputId}
          className={`group flex flex-col items-center justify-center rounded-xl border border-dashed px-5 py-9 transition-all ${
            isUploading
              ? "border-slate-200 bg-slate-50 text-slate-400 cursor-not-allowed"
              : "border-slate-300 bg-white hover:border-[#111184]/50 hover:bg-[#111184]/5 cursor-pointer"
          }`}
        >
          {isUploading ? (
            <Loader2 className="h-6 w-6 animate-spin mb-2 text-[#111184]" />
          ) : (
            <ImagePlus className="h-6 w-6 mb-2 text-slate-500 group-hover:text-[#111184]" />
          )}
          <p className="text-sm font-medium text-slate-700 group-hover:text-[#111184]">
            {isUploading ? "Uploading image..." : "Click to upload featured image"}
          </p>
          <p className="text-xs text-slate-500 mt-1">PNG, JPG, WebP up to 10MB</p>
        </label>
      )}
    </div>
  );
}
