"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, MessageCircle, Send } from "lucide-react";
import { createBlogComment } from "@/lib/actions";

export type BlogCommentItem = {
  id: string;
  name: string;
  comment: string;
  createdAt: string;
};

type BlogCommentsProps = {
  postId: string;
  postSlug: string;
  comments: BlogCommentItem[];
};

export default function BlogComments({ postId, postSlug, comments }: BlogCommentsProps) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    const formData = new FormData(event.currentTarget);
    const result = await createBlogComment(formData);

    setIsSubmitting(false);
    if (!result.success) {
      setMessage({ type: "error", text: result.error || "Please check your comment details." });
      return;
    }

    setName("");
    setEmail("");
    setComment("");
    setMessage({ type: "success", text: "Comment submitted for review. It will appear after approval." });
    router.refresh();
  };

  return (
    <section className="mt-8 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm lg:p-8">
      <div className="mb-6 flex items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-[#111184]/10 p-2 text-[#111184]">
            <MessageCircle className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Comments</h2>
            <p className="text-sm text-slate-500">
              {comments.length === 0 ? "Be the first to comment." : `${comments.length} comment${comments.length === 1 ? "" : "s"}`}
            </p>
          </div>
        </div>
      </div>

      {comments.length > 0 && (
        <div className="mb-8 space-y-4">
          {comments.map((item) => (
            <article key={item.id} className="rounded-xl border border-slate-100 bg-slate-50 p-4">
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#111184] text-sm font-bold text-white">
                  {item.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">{item.name}</h3>
                  <p className="text-xs text-slate-500">
                    {new Date(item.createdAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>
              <p className="whitespace-pre-line text-sm leading-6 text-slate-700">{item.comment}</p>
            </article>
          ))}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="hidden" name="blogPostId" value={postId} />
        <input type="hidden" name="postSlug" value={postSlug} />
        <div className="hidden">
          <label htmlFor="comment-website">Website</label>
          <input id="comment-website" name="website" tabIndex={-1} autoComplete="off" />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor="comment-name" className="text-sm font-semibold text-slate-800">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              id="comment-name"
              name="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
              minLength={2}
              maxLength={80}
              className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#111184] focus:ring-2 focus:ring-[#111184]/20"
              placeholder="Your name"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="comment-email" className="text-sm font-semibold text-slate-800">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              id="comment-email"
              name="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              maxLength={255}
              className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#111184] focus:ring-2 focus:ring-[#111184]/20"
              placeholder="you@example.com"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="comment-body" className="text-sm font-semibold text-slate-800">
            Comment <span className="text-red-500">*</span>
          </label>
          <textarea
            id="comment-body"
            name="comment"
            value={comment}
            onChange={(event) => setComment(event.target.value)}
            required
            minLength={5}
            maxLength={1500}
            rows={5}
            className="w-full resize-none rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#111184] focus:ring-2 focus:ring-[#111184]/20"
            placeholder="Write your comment..."
          />
        </div>

        {message && (
          <p className={`text-sm ${message.type === "success" ? "text-green-700" : "text-red-600"}`}>
            {message.text}
          </p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#111184] px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-[#0b0b62] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          Post Comment
        </button>
      </form>
    </section>
  );
}
