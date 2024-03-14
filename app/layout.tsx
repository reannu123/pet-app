import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";
import { Sheet } from "@/components/ui/sheet";
import Navbar from "@/components/navbar/navbar";
import { Sidebar } from "@/components/sidebar/sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pet Manager",
  description: "Manage everything about your pets in one place.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <Sheet>
            <Navbar />
            <Sidebar />
            {children}
          </Sheet>
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
