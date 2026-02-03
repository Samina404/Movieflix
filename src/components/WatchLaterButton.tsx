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
        "flex items-center gap-2 px-8 py-4 rounded-full font-bold transition-all active:scale-95 border",
        isFavorite
          ? "bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.1)]"
          : "bg-white/5 hover:bg-white/10 text-white border-white/10 backdrop-blur-md"
      )}
    >
      <svg
        className="w-5 h-5"
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
