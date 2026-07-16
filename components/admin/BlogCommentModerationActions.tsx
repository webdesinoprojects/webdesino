"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Check, Loader2, Trash2, X } from "lucide-react";
import { deleteBlogComment, updateBlogCommentStatus } from "@/lib/actions";
import { Button } from "@/components/ui/button";

type BlogCommentModerationActionsProps = {
  id: string;
  status: string;
};

export default function BlogCommentModerationActions({ id, status }: BlogCommentModerationActionsProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const updateStatus = (nextStatus: string) => {
    setErrorMessage(null);
    startTransition(async () => {
      const result = await updateBlogCommentStatus(id, nextStatus);
      if (!result.success) {
        setErrorMessage(result.error || "Failed to update comment.");
        return;
      }
      router.refresh();
    });
  };

  const handleDelete = () => {
    setErrorMessage(null);
    startTransition(async () => {
      const result = await deleteBlogComment(id);
      if (!result.success) {
        setErrorMessage(result.error || "Failed to delete comment.");
        setIsConfirmingDelete(false);
        return;
      }
      router.refresh();
    });
  };

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap items-center justify-end gap-2">
        {status !== "approved" && (
          <Button
            type="button"
            size="sm"
            className="bg-green-600 hover:bg-green-700"
            onClick={() => updateStatus("approved")}
            disabled={isPending}
          >
            {isPending ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Check className="h-3.5 w-3.5" />}
            Approve
          </Button>
        )}
        {status !== "rejected" && (
          <Button
            type="button"
            size="sm"
            variant="outline"
            className="border-amber-200 text-amber-700 hover:bg-amber-50 hover:text-amber-800"
            onClick={() => updateStatus("rejected")}
            disabled={isPending}
          >
            <X className="h-3.5 w-3.5" />
            Hide
          </Button>
        )}
        {status !== "pending" && (
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => updateStatus("pending")}
            disabled={isPending}
          >
            Pending
          </Button>
        )}
        <Button
          type="button"
          size="sm"
          variant="destructive"
          onClick={() => setIsConfirmingDelete(true)}
          disabled={isPending}
        >
          <Trash2 className="h-3.5 w-3.5" />
          Delete
        </Button>
      </div>

      {isConfirmingDelete && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-left">
          <p className="text-sm font-semibold text-red-800">Delete this comment?</p>
          <p className="mt-1 text-xs text-red-700">This cannot be undone.</p>
          <div className="mt-3 flex justify-end gap-2">
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={() => setIsConfirmingDelete(false)}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button type="button" size="sm" variant="destructive" onClick={handleDelete} disabled={isPending}>
              {isPending ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Trash2 className="h-3.5 w-3.5" />}
              Delete
            </Button>
          </div>
        </div>
      )}

      {errorMessage && <p className="text-right text-xs text-red-600">{errorMessage}</p>}
    </div>
  );
}
