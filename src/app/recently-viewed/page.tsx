"use client";

import { useRecentlyViewedStore } from "@/store/recentlyViewedStore";
import MovieGrid from "@/components/MovieGrid";
import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";

export default function RecentlyViewedPage() {
  const { movies, clearRecentlyViewed } = useRecentlyViewedStore();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch when reading from localStorage
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="space-y-8 pb-10">
      <div className="flex items-end justify-between border-b border-white/5 pb-8">
        <div>
          <h1 className="text-4xl md:text-3xl font-black italic uppercase tracking-tighter">
            Recently Viewed
          </h1>
          <p className="text-white/50 text-sm mt-2">
            Pick up where you left off. Showing your last <span className="text-primary font-bold">{movies.length}</span> movies
          </p>
        </div>

        {movies.length > 0 && (
          <button
            onClick={() => {
              if (confirm("Are you sure you want to clear your viewing history?")) {
                clearRecentlyViewed();
              }
            }}
            className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-red-900/20 text-white/60 hover:text-red-500 border border-white/10 hover:border-red-500/30 rounded-lg transition-all text-sm font-bold uppercase tracking-wider group"
          >
            <Trash2 size={16} className="group-hover:scale-110 transition-transform" />
            Clear History
          </button>
        )}
      </div>

      {movies.length > 0 ? (
        <MovieGrid movies={movies} />
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-white/20">
          <svg className="w-20 h-20 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-xl font-medium tracking-widest uppercase">No recently viewed movies</p>
        </div>
      )}
    </div>
  );
}
