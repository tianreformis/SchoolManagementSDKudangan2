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
  title: "SD Kudangan 2 Sistem",
  description: "SD Kudangan 2 Sistem",
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
          {/* <ThemeProvider> */}
          {children}
          {/* </ThemeProvider> */}
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
