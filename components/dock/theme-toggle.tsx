"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { flushSync } from "react-dom";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  const handleThemeChange = () => {
    const next = resolvedTheme === "light" ? "dark" : "light";
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (!document.startViewTransition || reducedMotion) {
      setTheme(next);
      return;
    }

    // flushSync so the html class flips inside the transition snapshot
    document.startViewTransition(() => {
      flushSync(() => setTheme(next));
    });
  };

  return (
    <Button variant="ghost" size="icon" onClick={handleThemeChange}>
      <Sun className="scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
      <Moon className="absolute scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
    </Button>
  );
}
