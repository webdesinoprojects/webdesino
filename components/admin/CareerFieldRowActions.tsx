"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Pencil, Trash2, Loader2 } from "lucide-react";
import { deleteCareerField } from "@/lib/career-actions";

export default function CareerFieldRowActions({
  id,
  isSystem,
}: {
  id: string;
  isSystem: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!confirm("Delete this field? Existing applications will keep their data.")) return;
    setOpen(false);
    startTransition(async () => {
      const result = await deleteCareerField(id);
      if (!result?.success) {
        alert(result?.error || "Failed to delete field");
      }
    });
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <MoreHorizontal className="h-4 w-4" />}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Field</DropdownMenuLabel>
        <DropdownMenuItem asChild>
          <Link href={`/admin/careers/cms/fields/${id}`} className="flex items-center cursor-pointer">
            <Pencil className="mr-2 h-4 w-4" />
            <span>Edit</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={handleDelete}
          disabled={isPending || isSystem}
          className={`cursor-pointer ${
            isSystem ? "text-slate-400" : "text-red-600 focus:text-red-600 focus:bg-red-50"
          }`}
        >
          <Trash2 className="mr-2 h-4 w-4" />
          <span>{isSystem ? "System field" : "Delete"}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
