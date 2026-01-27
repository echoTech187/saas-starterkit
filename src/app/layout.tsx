import { NextAuthProvider } from "./providers";
import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import NextTopLoader from 'nextjs-toploader';

export const metadata: Metadata = {
  title: "SaaS Template with Next.js 15",
  description: "SaaS Template with Next.js 15",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        <NextTopLoader
          color="#06b6d4"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={false}
          easing="ease"
          speed={200}
          shadow="0 0 10px #06b6d4,0 0 5px #06b6d4"
        />
        <NextAuthProvider>
          {children}
        </NextAuthProvider>
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
