import "@/app/globals.css";
import { Inter } from "next/font/google";
// import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "WebDesino Admin",
  description: "Admin Dashboard for WebDesino",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        {/* <Toaster /> */}
      </body>
    </html>
  );
}
