import prisma from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default async function BlogsPage() {
  const blogs = await prisma.blogPost.findMany({
    orderBy: { date: "desc" },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-blue-900">Blogs</h1>
        <Link href="/admin/blogs/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Add Blog Post
          </Button>
        </Link>
      </div>

      <div className="rounded-md border bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {blogs.map((blog) => (
              <TableRow key={blog.id}>
                <TableCell className="font-medium max-w-md truncate">{blog.title}</TableCell>
                <TableCell>{blog.category}</TableCell>
                <TableCell>{new Date(blog.date).toLocaleDateString()}</TableCell>
                <TableCell className="text-right">
                  <Link href={`/admin/blogs/${blog.id}`}>
                    <Button variant="ghost" size="sm">
                      Edit
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
            {blogs.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-10 text-gray-500">
                  No blog posts found. Create one to get started.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
