import prisma from "@/lib/prisma";
import BlogPostForm from "@/components/admin/BlogPostForm";
import { notFound } from "next/navigation";

interface PageProps {
  params: {
    id: string;
  };
}

export default async function EditBlogPage({ params }: PageProps) {
  const post = await prisma.blogPost.findUnique({
    where: { id: params.id },
  });

  if (!post) {
    notFound();
  }

  return <BlogPostForm post={post} />;
}
