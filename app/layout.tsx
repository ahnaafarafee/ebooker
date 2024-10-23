import Navbar from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { poppins } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import "./globals.css";

import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import NavbarWrapper from "@/components/navbar-wrapper";

export const metadata: Metadata = {
  title: "Ebooker",
  description: "AI powered ebook generator",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={cn("min-h-screen", poppins.className)}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <NavbarWrapper />
            <div className="mx-auto container px-4 md:px-8">{children}</div>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
