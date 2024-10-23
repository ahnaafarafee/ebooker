// components/NavbarWrapper.tsx
"use client";

import { usePathname } from "next/navigation";
import Navbar from "./navbar";

const NavbarWrapper = () => {
  const pathname = usePathname();

  // Define routes where the navbar should be hidden
  const hideNavbarRoutes = ["/sign-in", "/sign-up"];

  // Conditionally render the Navbar based on the current path
  if (hideNavbarRoutes.includes(pathname)) {
    return null;
  }

  return <Navbar />;
};

export default NavbarWrapper;
