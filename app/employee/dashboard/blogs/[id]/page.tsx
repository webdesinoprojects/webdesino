import prisma from "@/lib/prisma";
import BlogPostForm from "@/components/admin/BlogPostForm";
import { requireEmployee } from "@/lib/employee-session";
import { notFound } from "next/navigation";

export default async function EmployeeEditBlogPage({ params }: { params: { id: string } }) {
  await requireEmployee("blogs");
  const post = await prisma.blogPost.findUnique({ where: { id: params.id } });
  if (!post) notFound();
  return <BlogPostForm post={post} returnPath="/employee/dashboard/blogs" />;
}
