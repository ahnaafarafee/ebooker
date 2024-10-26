import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { SignedIn, SignedOut, SignOutButton } from "@clerk/nextjs";
import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ModeToggle from "./theme-controller";

const MobileNav = ({
  navLinks,
}: {
  navLinks: { name: string; href: string }[];
}) => {
  const pathname = usePathname();
  return (
    <div className="md:hidden block">
      <Sheet>
        <SheetTrigger>
          <Menu />
        </SheetTrigger>
        <SheetContent>
          <div className="flex flex-col gap-4 mt-8">
            <SignedIn>
              {navLinks.map((link) => (
                <div key={link.name}>
                  <Link
                    href={link.href}
                    className={cn(
                      "text-2xl pl-4",
                      pathname === link.href ? "border-l-4" : ""
                    )}
                  >
                    {link.name}
                  </Link>
                </div>
              ))}
              <Link href="/user-profile" className="text-2xl pl-4">
                My Account
              </Link>
              <div className="pl-4 text-2xl">
                <SignOutButton />
              </div>
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
            </SignedOut>
            <div className="flex items-center justify-center">
              <ModeToggle />
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNav;
