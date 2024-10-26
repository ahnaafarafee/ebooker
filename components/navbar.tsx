"use client";

import { brunoAceSc } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import MobileNav from "./mobile-nav";
import ModeToggle from "./theme-controller";
import { ClerkLoading, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Spinner from "./spinner";

const navLinks = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Dashboard",
    href: "/dashboard",
  },
  {
    name: "Create",
    href: "/create",
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

        <div className="hidden md:block ml-auto">
          <ClerkLoading>
            <Spinner />
          </ClerkLoading>
        </div>
        {/* Right Side: Nav Links and Theme Toggle */}
        <div className="hidden md:flex items-center space-x-6">
          <SignedIn>
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "tracking-wider text-gray-900 dark:text-white",
                  pathname === link.href ? "font-bold border-b-2" : ""
                )}
              >
                {link.name}
              </Link>
            ))}

            {/* Theme Toggle */}
            <ModeToggle />
            <UserButton />
          </SignedIn>

          <SignedOut>
            <Link
              href="/sign-in"
              className={cn(
                "tracking-wider text-gray-900 dark:text-white",
                pathname === "/sign-in" ? "font-bold border-b-2" : ""
              )}
            >
              Login
            </Link>
            <Link
              href="/sign-up"
              className={cn(
                "tracking-wider text-gray-900 dark:text-white",
                pathname === "/sign-in" ? "font-bold border-b-2" : ""
              )}
            >
              Sign Up
            </Link>

            {/* Theme Toggle */}
            <ModeToggle />
          </SignedOut>
        </div>
        <MobileNav navLinks={navLinks} />
      </div>
    </nav>
  );
}
