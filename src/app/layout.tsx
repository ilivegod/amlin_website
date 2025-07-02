import type { Metadata } from "next";

import { Toaster } from "@/components/ui/sonner";
import { Inter, Playfair_Display } from "next/font/google";
import { ReactNode } from "react";
import "./globals.css";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import localFont from "next/font/local";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  style: "italic",
});

const polysans = localFont({
  src: "../../public/fonts/PolySansNeutralWide.woff2",
  variable: "--font-polysans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "amlin Technologies",
  description: "amlinTechCo",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar />

        <main
          className={`${inter.variable} ${playfair.variable} ${polysans.variable}`}
        >
          {children}
        </main>
        <Toaster />
        <Footer />
      </body>
    </html>
  );
}
