"use client";

import { useRef } from "react";
import Link from "next/link";
import { Genre } from "@/types/movie";

interface GenreBarProps {
  genres: Genre[];
}

export default function GenreBar({ genres }: GenreBarProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = 300;
      if (direction === "left") {
        current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      } else {
        current.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    }
  };

  return (
    <div className="relative group">
      {/* Left Arrow */}
      <button
        onClick={() => scroll("left")}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center bg-[#1A1A1A]/90 backdrop-blur-sm border border-white/10 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-0"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Scrollable Container */}
      <div
        ref={scrollRef}
        className="flex items-center gap-3 overflow-x-auto scrollbar-hide py-2 px-1 scroll-smooth"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <Link
          href="/genre/trending"
          className="flex-shrink-0 px-6 py-2.5 bg-[#2A2A2A] border border-white/10 rounded-full text-sm font-medium text-white hover:bg-white hover:text-black transition-all"
        >
          Trending
        </Link>
        {genres.map((genre) => (
          <Link
            key={genre.id}
            href={`/genre/${genre.id}`}
            className="flex-shrink-0 px-6 py-2.5 bg-[#1A1A1A] border border-white/10 rounded-full text-sm font-medium text-white hover:bg-white hover:text-black transition-all whitespace-nowrap"
          >
            {genre.name}
          </Link>
        ))}
      </div>

      {/* Right Arrow */}
      <button
        onClick={() => scroll("right")}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center bg-[#1A1A1A]/90 backdrop-blur-sm border border-white/10 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}
