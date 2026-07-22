import type { Metadata } from "next";
import BirthdayBuilder from "@/components/birthday/BirthdayBuilder";

export const metadata: Metadata = {
  title: "Create Birthday Wish",
  description: "Create a private shareable birthday wish page.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function BirthdayPage() {
  return <BirthdayBuilder />;
}
