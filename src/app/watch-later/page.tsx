"use client";

import { useWatchLaterStore } from "@/store/watchLaterStore";
import MovieGrid from "@/components/MovieGrid";
import MovieGridSkeleton from "@/components/MovieGridSkeleton";
import MoviePageLoading from "@/components/MoviePageLoading";
import { useStore } from "@/hooks/useStore";

export default function WatchLaterPage() {
  const movies = useStore(useWatchLaterStore, (state) => state.movies) || [];

  if (movies === null) return <MoviePageLoading titleWidth="w-72" count={6} />;

  return (
    <div className="space-y-8 pb-10">
      <div className="border-b border-foreground/10 pb-8">
        <h1 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter">
          Watch Later
        </h1>
        <p className="text-foreground-muted text-sm mt-2">
          Your curated list of movies to watch at <span className="text-primary font-bold">{movies.length}</span> movies
        </p>
      </div>

      {movies.length > 0 ? (
        <MovieGrid movies={movies} />
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-foreground/20">
          <svg className="w-20 h-20 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
          </svg>
          <p className="text-xl font-medium tracking-widest uppercase">No movies in your watch later list</p>
        </div>
      )}
    </div>
  );
}
