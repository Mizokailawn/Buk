import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/shared/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { Suspense } from "react";
import { SpeedInsights } from "@vercel/speed-insights/next"
import Navbar from "@/components/navbar/navbar";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata = {
  title: "BUK",
  description: "Used car marketplace for Mizoram",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.className}`} suppressHydrationWarning>
      <body className="min-h-full w-screen flex flex-col antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Suspense>
            <Navbar />
          </Suspense>
          <main className="overflow-y-auto">
            {children}
            <SpeedInsights />
          </main>
          <Toaster richColors position="top-center" />
        </ThemeProvider>
      </body>
    </html>
  );
}
