import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { SessionProvider } from "next-auth/react";
import AuthGuard from "@/components/features/AuthGuard";
import { CartProvider } from "@/contexts/CartContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Silicon Shelf - Premium Computer Hardware Store",
  description:
    "Shop the latest computer hardware, gaming peripherals, monitors, and accessories. Find top brands like Logitech, Razer, Dell, and more at Silicon Shelf.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="overflow-x-hidden">
      <body
        className={`${inter.variable} antialiased bg-[#1A1A1A] overflow-x-hidden`}
      >
        <SessionProvider>
          <CartProvider>
            <Header />
            <AuthGuard>{children}</AuthGuard>
            <Footer />
          </CartProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
