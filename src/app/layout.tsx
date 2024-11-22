import type { Metadata } from "next";
import { Poppins} from "next/font/google";
import "./globals.css";

const inter = Poppins({ subsets: ["latin"],
  weight: "400",
  style: "normal",
 });

export const metadata: Metadata = {
  title: "Kudangan 2 School Management Dashboard",
  description: "Next.js School Management System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
