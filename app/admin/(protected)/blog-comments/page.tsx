import Link from "next/link";
import prisma from "@/lib/prisma";
import BlogCommentModerationActions from "@/components/admin/BlogCommentModerationActions";
import { MessageSquare } from "lucide-react";

const STATUS_FILTERS = ["pending", "approved", "rejected", "all"] as const;

type StatusFilter = (typeof STATUS_FILTERS)[number];

type BlogCommentsAdminPageProps = {
  searchParams?: {
    status?: string;
  };
};

function getStatusBadgeClass(status: string) {
  if (status === "approved") return "bg-green-50 text-green-700 border-green-200";
  if (status === "rejected") return "bg-amber-50 text-amber-700 border-amber-200";
  return "bg-blue-50 text-blue-700 border-blue-200";
}

export default async function BlogCommentsAdminPage({ searchParams }: BlogCommentsAdminPageProps) {
  const requestedStatus = searchParams?.status;
  const activeStatus: StatusFilter = STATUS_FILTERS.includes(requestedStatus as StatusFilter)
    ? (requestedStatus as StatusFilter)
    : "pending";

  const [comments, pendingCount, approvedCount, rejectedCount] = await Promise.all([
    prisma.blogComment.findMany({
      where: activeStatus === "all" ? {} : { status: activeStatus },
      orderBy: { createdAt: "desc" },
      take: 100,
    }),
    prisma.blogComment.count({ where: { status: "pending" } }),
    prisma.blogComment.count({ where: { status: "approved" } }),
    prisma.blogComment.count({ where: { status: "rejected" } }),
  ]);

  const counts: Record<StatusFilter, number> = {
    pending: pendingCount,
    approved: approvedCount,
    rejected: rejectedCount,
    all: pendingCount + approvedCount + rejectedCount,
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-800">Blog Comments</h1>
          <p className="mt-1 text-sm text-slate-500">
            Review submitted blog comments before they appear publicly.
          </p>
        </div>
        <div className="rounded-xl border border-blue-100 bg-blue-50 px-4 py-3 text-sm text-blue-800">
          <span className="font-semibold">{pendingCount}</span> pending review
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {STATUS_FILTERS.map((status) => (
          <Link
            key={status}
            href={`/admin/blog-comments?status=${status}`}
            className={`rounded-full border px-4 py-2 text-sm font-semibold capitalize transition ${
              activeStatus === status
                ? "border-[#111184] bg-[#111184] text-white"
                : "border-slate-200 bg-white text-slate-600 hover:border-[#111184]/40 hover:text-[#111184]"
            }`}
          >
            {status} ({counts[status]})
          </Link>
        ))}
      </div>

      <div className="space-y-4">
        {comments.map((comment) => (
          <article
            key={comment.id}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_2px_12px_rgba(0,0,0,0.04)]"
          >
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div className="min-w-0 flex-1">
                <div className="mb-3 flex flex-wrap items-center gap-2">
                  <span className={`rounded-full border px-2.5 py-1 text-xs font-semibold capitalize ${getStatusBadgeClass(comment.status)}`}>
                    {comment.status}
                  </span>
                  <span className="text-xs text-slate-500">
                    {new Date(comment.createdAt).toLocaleString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                      hour: "numeric",
                      minute: "2-digit",
                    })}
                  </span>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#111184]/10 text-[#111184]">
                    <MessageSquare className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <h2 className="font-semibold text-slate-900">{comment.name}</h2>
                    <p className="text-sm text-slate-500">{comment.email}</p>
                    <Link
                      href={`/blog/${comment.postSlug}`}
                      target="_blank"
                      className="mt-1 block truncate text-sm font-medium text-[#111184] hover:underline"
                    >
                      {comment.postTitle}
                    </Link>
                  </div>
                </div>

                <p className="mt-4 whitespace-pre-line rounded-xl bg-slate-50 p-4 text-sm leading-6 text-slate-700">
                  {comment.comment}
                </p>
              </div>

              <div className="lg:w-72">
                <BlogCommentModerationActions id={comment.id} status={comment.status} />
              </div>
            </div>
          </article>
        ))}

        {comments.length === 0 && (
          <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-10 text-center text-sm text-slate-500">
            No {activeStatus === "all" ? "" : activeStatus} comments found.
          </div>
        )}
      </div>
    </div>
  );
}
