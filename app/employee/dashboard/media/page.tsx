import { requireEmployee } from "@/lib/employee-session";
import MediaGallery from "@/components/admin/MediaGallery";

export default async function EmployeeMediaPage() {
  await requireEmployee("media");
  return <MediaGallery />;
}
