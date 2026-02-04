"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { Genre } from "@/types/movie";
import { ChevronLeft, ChevronRight, Zap } from "lucide-react";

interface GenreBarProps {
  genres: Genre[];
}

export default function GenreBar({ genres }: GenreBarProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 5);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = 400;
      current.scrollBy({ 
        left: direction === "left" ? -scrollAmount : scrollAmount, 
        behavior: "smooth" 
      });
    }
  };

  return (
    <div className="relative group/bar py-4">
      {/* Left Arrow */}
      {showLeftArrow && (
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center bg-secondary/80 backdrop-blur-xl border border-card-border rounded-2xl text-foreground shadow-2xl hover:bg-primary hover:text-white transition-all duration-300 -ml-6 md:-ml-4 group-hover/bar:scale-110"
        >
          <ChevronLeft size={24} />
        </button>
      )}

      {/* Gradient Fades */}
      <div className={`absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none transition-opacity duration-300 ${showLeftArrow ? "opacity-100" : "opacity-0"}`} />
      <div className={`absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none transition-opacity duration-300 ${showRightArrow ? "opacity-100" : "opacity-0"}`} />

      {/* Scrollable Container */}
      <div
        ref={scrollRef}
        onScroll={checkScroll}
        className="flex items-center gap-3 overflow-x-auto scrollbar-hide py-2 px-1 scroll-smooth"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <Link
          href="/genre/trending"
          className="flex-shrink-0 flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-2xl text-sm font-bold shadow-lg shadow-primary/25 hover:scale-105 transition-all"
        >
          <Zap size={16} fill="white" />
          Trending
        </Link>
        {genres.map((genre) => (
          <Link
            key={genre.id}
            href={`/genre/${genre.id}`}
            className="flex-shrink-0 px-6 py-3 bg-foreground/5 border border-card-border rounded-2xl text-sm font-bold text-foreground-muted hover:bg-primary/20 hover:text-primary hover:border-primary/30 hover:scale-105 shadow-sm hover:shadow-primary/10 transition-all whitespace-nowrap"
          >
            {genre.name}
          </Link>
        ))}
      </div>

      {/* Right Arrow */}
      {showRightArrow && (
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center bg-secondary/80 backdrop-blur-xl border border-card-border rounded-2xl text-foreground shadow-2xl hover:bg-primary hover:text-white transition-all duration-300 -mr-6 md:-mr-4 group-hover/bar:scale-110"
        >
          <ChevronRight size={24} />
        </button>
      )}
    </div>
  );
}

