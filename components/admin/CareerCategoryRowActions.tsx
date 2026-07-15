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
import { deleteCareerCategory } from "@/lib/career-actions";

export default function CareerCategoryRowActions({ id }: { id: string }) {
  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [confirmingDelete, setConfirmingDelete] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen);
    if (!nextOpen) {
      setConfirmingDelete(false);
      setErrorMessage(null);
    }
  };

  const requestDelete = (event: Event) => {
    event.preventDefault();
    setErrorMessage(null);
    setConfirmingDelete(true);
  };

  const handleDelete = () => {
    setErrorMessage(null);
    startTransition(async () => {
      try {
        await deleteCareerCategory(id);
        setOpen(false);
      } catch (err: any) {
        setErrorMessage(err?.message || "Failed to delete category");
        setOpen(true);
      }
    });
  };

  return (
    <DropdownMenu open={open} onOpenChange={handleOpenChange}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <MoreHorizontal className="h-4 w-4" />}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-72">
        <DropdownMenuLabel>Category</DropdownMenuLabel>
        {errorMessage && (
          <div className="mx-2 mb-2 rounded-md border border-red-200 bg-red-50 px-2 py-1.5 text-xs text-red-700">
            {errorMessage}
          </div>
        )}
        {confirmingDelete ? (
          <div className="mx-2 mb-2 rounded-lg border border-red-200 bg-red-50 p-3">
            <p className="text-sm font-semibold text-red-800">Delete this category?</p>
            <p className="mt-1 text-xs text-red-700">
              Existing applications will keep a snapshot of the category name.
            </p>
            <div className="mt-3 flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setConfirmingDelete(false)}
                disabled={isPending}
              >
                Cancel
              </Button>
              <Button type="button" variant="destructive" size="sm" onClick={handleDelete} disabled={isPending}>
                {isPending ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Trash2 className="h-3.5 w-3.5" />}
                Delete
              </Button>
            </div>
          </div>
        ) : (
          <>
            <DropdownMenuItem asChild>
              <Link href={`/admin/careers/cms/categories/${id}`} className="flex items-center cursor-pointer">
                <Pencil className="mr-2 h-4 w-4" />
                <span>Edit</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onSelect={requestDelete}
              disabled={isPending}
              className="text-red-600 focus:text-red-600 focus:bg-red-50 cursor-pointer"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              <span>Delete</span>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
