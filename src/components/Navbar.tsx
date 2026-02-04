"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { clsx } from "clsx";
import { Search, Home, Clapperboard, Bookmark, Clock, Menu, X } from "lucide-react";

import { useUIStore } from "@/store/uiStore";
import { ThemeToggle } from "./ThemeToggle";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { searchQuery, setSearchQuery, isMobileMenuOpen, setMobileMenuOpen, closeMobileMenu } = useUIStore();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      closeMobileMenu();
    }
  };

  const navLinks = [
    { name: "Home", href: "/", icon: <Home size={18} /> },
    { name: "Movies", href: "/movies", icon: <Clapperboard size={18} /> },
    { name: "Watch Later", href: "/watch-later", icon: <Bookmark size={18} /> },
    { name: "Recent", href: "/recently-viewed", icon: <Clock size={18} /> },
  ];

  return (
    <nav className="sticky top-0 z-50 glass-morphism py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-10">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center group-hover:bg-primary/30 transition-colors">
              <Clapperboard className="text-primary" size={24} />
            </div>
            <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground-muted bg-clip-text text-transparent transition-all group-hover:text-primary">
              MOVIEFLIX
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={clsx(
                  "flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-all group/nav",
                  pathname === link.href
                    ? "bg-primary/10 text-primary"
                    : "text-foreground-muted hover:text-primary hover:bg-foreground/5"
                )}
              >
                <div className="p-1.5 rounded-lg border border-transparent transition-all group-hover/nav:border-primary/20 group-hover/nav:bg-primary/5">
                  {link.icon}
                </div>
                <span>{link.name}</span>
              </Link>
            ))}
          </div>

          {/* Search bar and Theme Toggle Container */}
          <div className="hidden md:flex items-center gap-4 flex-1 max-w-sm">
            <form onSubmit={handleSearch} className="relative group/search flex-1">
              <input
                type="text"
                placeholder="Search movies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-foreground/5 border border-primary/10 rounded-xl py-2 px-4 pl-10 text-sm focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary/50 hover:border-primary/30 transition-all text-foreground-muted placeholder:text-foreground-dim focus:text-foreground"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground-dim transition-colors pointer-events-none group-focus-within/search:text-primary group-hover/search:text-primary" size={16} />
            </form>
            <ThemeToggle />
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <button 
              className="p-2 text-foreground-muted hover:text-foreground"
              onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-foreground/10 space-y-2 animate-in fade-in slide-in-from-top-4 duration-300">
            <form onSubmit={handleSearch} className="relative mb-4 group/search">
              <input
                type="text"
                placeholder="Search movies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-foreground/5 border border-primary/10 rounded-xl py-3 px-4 pl-10 text-sm focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary/50 hover:border-primary/30 transition-all focus:text-foreground"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground-muted transition-colors group-focus-within/search:text-primary group-hover/search:text-primary" size={16} />
            </form>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={clsx(
                  "flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-all group/mob",
                  pathname === link.href
                    ? "bg-primary/15 text-primary border border-primary/20"
                    : "text-foreground-muted hover:text-primary hover:bg-primary/10"
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="transition-colors group-hover/mob:text-primary">{link.icon}</span>
                <span className="transition-colors group-hover/mob:text-primary">{link.name}</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}

