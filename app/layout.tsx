import { ThemeProvider } from "@/components/theme-provider";
import { poppins } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import "./globals.css";

import ClientClerkProvider from "@/components/client-clerk-provider";
import NavbarWrapper from "@/components/navbar-wrapper";
import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/toaster";

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
    <ClientClerkProvider>
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
            <Toaster />;
          </ThemeProvider>
        </body>
      </html>
    </ClientClerkProvider>
  );
}
