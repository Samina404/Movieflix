"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { clsx } from "clsx";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Watch Later", href: "/watch-later" },
    { name: "Recently Viewed", href: "/recently-viewed" },
  ];

  return (
    <nav className="sticky top-0 z-50 glass-morphism border-b border-white/10 px-4 py-3">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold gradient-text tracking-tighter">MOVIEFLIX</span>
        </Link>

        <div className="flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={clsx(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === link.href ? "text-primary" : "text-white/70"
              )}
            >
              {link.name}
            </Link>
          ))}
        </div>

        <form onSubmit={handleSearch} className="relative w-full md:w-64">
          <input
            type="text"
            placeholder="Search movies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-full py-1.5 px-4 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          />
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </form>
      </div>
    </nav>
  );
}
