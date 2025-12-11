// import { Toaster } from "@/components/ui/toaster";

export const metadata = {
  title: "WebDesino Admin",
  description: "Admin Dashboard for WebDesino",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      {/* <Toaster /> */}
    </>
  );
}
