import type { Metadata } from "next";
import { Anton, Inter } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import Nav from "@/components/Nav";

const anton = Anton({
  variable: "--font-anton",
  weight: "400",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Erik Jashari — Portfolio",
  description: "Software engineer portfolio — cinematic scroll-driven hero prototype.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${anton.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-background text-foreground">
        <SmoothScrollProvider>
          <Nav />
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
