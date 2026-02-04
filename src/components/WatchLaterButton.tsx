"use client";

import { Movie } from "@/types/movie";
import { useWatchLaterStore } from "@/store/watchLaterStore";
import { clsx } from "clsx";

export default function WatchLaterButton({ movie }: { movie: Movie }) {
  const { toggleWatchLater, isInWatchLater } = useWatchLaterStore();
  const isFavorite = isInWatchLater(movie.id);

  return (
    <button
      onClick={() => toggleWatchLater(movie)}
      className={clsx(
        "flex items-center gap-3 px-8 py-4 rounded-xl font-bold transition-all duration-300 active:scale-95 border group/watch",
        isFavorite
          ? "bg-foreground text-background border-foreground shadow-[0_10px_20px_rgba(0,0,0,0.2)] dark:shadow-primary/20 hover:scale-105"
          : "bg-foreground/5 hover:bg-foreground/10 text-foreground border-foreground/10 hover:border-primary/50 hover:scale-105"
      )}
    >
      <svg
        className="w-5 h-5 transition-transform duration-300 group-hover/watch:scale-125 group-hover/watch:-rotate-12"
        fill={isFavorite ? "currentColor" : "none"}
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
        />
      </svg>
      {isFavorite ? "In Watch Later" : "Add to Watch Later"}
    </button>
  );
}
