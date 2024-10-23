"use client";

import { brunoAceSc } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ModeToggle from "./theme-controller";
import { Button } from "./ui/button";
import MobileNav from "./mobile-nav";

const navLinks = [
  {
    name: "Dashboard",
    href: "/",
  },
  {
    name: "Books",
    href: "/books",
  },
];

export default function Navbar() {
  const pathname = usePathname();
  return (
    <nav className="bg-transparent backdrop-blur-md dark:bg-gray-900/80 top-0 w-full z-50 shadow-md transition-all duration-300 ease-in-out">
      <div className="container mx-auto flex items-center justify-between h-16 px-4 md:px-8">
        {/* Left Side: Logo + Brand */}
        <div className="flex items-center space-x-4">
          <Link href="/">
            <Image src="/logo.svg" alt="logo" width={60} height={60} />
          </Link>
          <Link
            href="/"
            className={cn(
              "text-2xl font-semibold tracking-wider text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-gray-400 transition-colors duration-300 ease-in-out",
              brunoAceSc.className
            )}
          >
            Ebooker
          </Link>
        </div>

        {/* Right Side: Nav Links and Theme Toggle */}
        <div className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link key={link.name} href={link.href}>
              <Button
                variant="ghost"
                className={cn(
                  "tracking-wider text-gray-900 dark:text-white",
                  pathname === link.href ? "font-bold" : ""
                )}
              >
                {link.name}
              </Button>
            </Link>
          ))}

          {/* Theme Toggle */}
          <ModeToggle />
        </div>
        <MobileNav navLinks={navLinks} />
      </div>
    </nav>
  );
}
