import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/layout/navbar";
import "./globals.css";
import { ThemeScript } from "@/lib/theme/theme-script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Exporto - Free Online Tools",
  description:
    "Collection of free online tools to help with your everyday tasks",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen bg-background mx-auto px-4 max-w-4xl w-full">
          <Navbar />
          {children}
        </div>
      </body>
    </html>
  );
}
