import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import NextTopLoader from 'nextjs-toploader';

const systemfont = Poppins({
  subsets: ["latin"],
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
    <ClerkProvider>
      <html lang="en">
        <body className={systemfont.className}>
        <NextTopLoader 
        height={10}
        color="#CFCEFF"
        />
          {
          children}
          <ToastContainer
            position="bottom-right"
            theme="dark"
            autoClose={3000}          
          />
        </body>
      </html>
    </ClerkProvider>
  );
}
