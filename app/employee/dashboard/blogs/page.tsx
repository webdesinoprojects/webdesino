import prisma from "@/lib/prisma";
import { requireEmployee } from "@/lib/employee-session";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus } from "lucide-react";
import { deleteBlogPost } from "@/lib/actions";
import ActionsMenu from "@/components/admin/ActionsMenu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default async function EmployeeBlogsPage() {
  await requireEmployee("blogs");
  const blogs = await prisma.blogPost.findMany({ orderBy: { date: "desc" } });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-slate-800 tracking-tight">Blogs</h1>
        <Link href="/employee/dashboard/blogs/new">
          <Button><Plus className="mr-2 h-4 w-4" /> Add Blog Post</Button>
        </Link>
      </div>
      <div className="rounded-2xl border border-slate-200/70 shadow-[0_2px_12px_rgba(0,0,0,0.04)] overflow-hidden">
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
                  <ActionsMenu
                    id={blog.id}
                    editUrl={`/employee/dashboard/blogs/${blog.id}`}
                    deleteAction={deleteBlogPost}
                  />
                </TableCell>
              </TableRow>
            ))}
            {blogs.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-10 text-gray-500">No blog posts found.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
