"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

type Theme = "light" | "dark";

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  // Sync with DOM + localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("rubynox-theme") as Theme | null;

    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    const initialTheme: Theme =
      stored === "dark" || stored === "light"
        ? stored
        : systemPrefersDark
        ? "dark"
        : "light";

    document.documentElement.setAttribute("data-theme", initialTheme);
    setTheme(initialTheme);
    setMounted(true);
  }, []);

  function toggleTheme() {
    const nextTheme: Theme = theme === "dark" ? "light" : "dark";

    document.documentElement.setAttribute("data-theme", nextTheme);
    localStorage.setItem("rubynox-theme", nextTheme);
    setTheme(nextTheme);
  }

  // Prevent hydration mismatch flicker
  if (!mounted) return null;

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="focus-ring inline-flex h-10 w-10 items-center justify-center rounded-full border border-line bg-card/70 text-ink shadow-sm transition hover:-translate-y-0.5 hover:border-accent/50 hover:text-accent"
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      title={isDark ? "Light theme" : "Dark theme"}
    >
      {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
}