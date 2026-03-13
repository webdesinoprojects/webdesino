import BlogPostForm from "@/components/admin/BlogPostForm";
import { requireEmployee } from "@/lib/employee-session";

export default async function EmployeeNewBlogPage() {
  await requireEmployee("blogs");
  return <BlogPostForm returnPath="/employee/dashboard/blogs" />;
}
