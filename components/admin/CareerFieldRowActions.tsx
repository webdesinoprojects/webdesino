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
      const result = await deleteCareerField(id);
      if (!result?.success) {
        setErrorMessage(result?.error || "Failed to delete field");
        setOpen(true);
        return;
      }
      setOpen(false);
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
        <DropdownMenuLabel>Field</DropdownMenuLabel>
        {errorMessage && (
          <div className="mx-2 mb-2 rounded-md border border-red-200 bg-red-50 px-2 py-1.5 text-xs text-red-700">
            {errorMessage}
          </div>
        )}
        {confirmingDelete ? (
          <div className="mx-2 mb-2 rounded-lg border border-red-200 bg-red-50 p-3">
            <p className="text-sm font-semibold text-red-800">Delete this field?</p>
            <p className="mt-1 text-xs text-red-700">Existing applications will keep their data.</p>
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
              <Link href={`/admin/careers/cms/fields/${id}`} className="flex items-center cursor-pointer">
                <Pencil className="mr-2 h-4 w-4" />
                <span>Edit</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onSelect={isSystem ? undefined : requestDelete}
              disabled={isPending || isSystem}
              className={`cursor-pointer ${
                isSystem ? "text-slate-400" : "text-red-600 focus:text-red-600 focus:bg-red-50"
              }`}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              <span>{isSystem ? "System field" : "Delete"}</span>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
