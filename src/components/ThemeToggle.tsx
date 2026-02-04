"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // Avoid hydration mismatch
  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 animate-pulse" />
    );
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="relative w-10 h-10 flex items-center justify-center rounded-xl bg-secondary border border-card-border hover:border-primary/50 transition-all duration-300 group overflow-hidden"
      aria-label="Toggle theme"
    >
      <div className="relative w-5 h-5 overflow-hidden">
        <Sun
          className={`absolute inset-0 transition-transform duration-500 ${
            theme === "dark" ? "-translate-y-full opacity-0" : "translate-y-0 opacity-100"
          }`}
          size={20}
        />
        <Moon
          className={`absolute inset-0 transition-transform duration-500 ${
            theme === "dark" ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
          }`}
          size={20}
        />
      </div>
      
      {/* Subtle background glow on hover */}
      <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors duration-300" />
    </button>
  );
}
