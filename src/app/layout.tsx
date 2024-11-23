import type { Metadata } from "next";
import { Montserrat} from "next/font/google";
import "./globals.css";

const systemfont = Montserrat({ subsets: ["latin"],
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
      <body className={systemfont.className}>{children}</body>
    </html>
  );
}
