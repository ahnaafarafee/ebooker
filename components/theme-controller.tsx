"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Toggle } from "@/components/ui/toggle";
import { useEffect } from "react";

export default function ModeToggle() {
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => setTheme(mediaQuery.matches ? "dark" : "light");

    mediaQuery.addEventListener("change", handleChange);
    setTheme(mediaQuery.matches ? "dark" : "light");

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [setTheme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <Toggle
      aria-label="Toggle theme"
      onClick={toggleTheme}
      className="w-10 h-10 p-2"
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </Toggle>
  );
}
