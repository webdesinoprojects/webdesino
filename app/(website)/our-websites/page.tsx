import { redirect } from "next/navigation";

export default function OurWebsitesPage() {
  redirect("/our-clients?category=Our%20Websites");
}
