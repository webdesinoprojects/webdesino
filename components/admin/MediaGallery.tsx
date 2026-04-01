"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Loader2, Trash2, Copy, Check } from "lucide-react";
import Image from "next/image";
import ImageUpload from "./ImageUpload";
import { getMedia, deleteMedia } from "@/lib/media-actions";
import useSWR from "swr";

const PAGE_SIZE = 24;

const fetcher = async ([_, page]: [string, number]) => {
  return await getMedia(page, PAGE_SIZE);
};

export default function MediaGallery() {
  const [page, setPage] = useState(1);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // CRITICAL FIX: Use SWR for caching and deduplication
  const { data, error, mutate } = useSWR(
    ['media', page],
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 60000, // 1 minute deduplication
      revalidateOnReconnect: false,
    }
  );

  const loading = !data && !error;
  const images = data?.media || [];
  const total = data?.total || 0;

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this image?")) return;
    
    await deleteMedia(id);
    mutate(); // Revalidate after delete
  };

  const copyUrl = (id: string, url: string) => {
    navigator.clipboard.writeText(url).catch(() => {});
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleUploadComplete = () => {
    mutate(); // Revalidate after upload
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-blue-900">Media Library</h2>
        <div className="w-auto">
             <ImageUpload name="new_image" label="Upload New Image" onUploadComplete={handleUploadComplete} />
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
        </div>
      ) : (
        <>
        <div className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-8 gap-4">
          {images.map((file) => {
             return (
                <Card key={file.id} className="overflow-hidden group relative">
                  <div className="aspect-square relative bg-slate-100">
                    <Image 
                      src={file.url} 
                      alt={file.filename} 
                      fill 
                      sizes="(max-width: 640px) 25vw, 12.5vw"
                      quality={60}
                      className="object-contain"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <Button size="icon" variant="secondary" onClick={() => copyUrl(file.id, file.url)} title="Copy URL">
                        {copiedId === file.id ? <Check className="h-4 w-4 text-green-400" /> : <Copy className="h-4 w-4" />}
                      </Button>
                      <Button size="icon" variant="destructive" onClick={() => handleDelete(file.id)} title="Delete">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="p-2 text-xs truncate text-slate-500 bg-white border-t">
                    {file.filename}
                  </div>
                </Card>
             );
          })}
          {images.length === 0 && (
            <div className="col-span-full text-center py-12 text-slate-500">
              No images found. Upload one to get started.
            </div>
          )}
        </div>
        <div className="flex justify-center gap-2 mt-4">
            <Button 
                variant="outline" 
                disabled={page === 1} 
                onClick={() => setPage(p => p - 1)}
            >
                Previous
            </Button>
            <Button 
                variant="outline" 
                disabled={page * PAGE_SIZE >= total} 
                onClick={() => setPage(p => p + 1)}
            >
                Next
            </Button>
        </div>
        </>
      )}
    </div>
  );
}
