"use client";

import Link from "next/link";
import { Movie } from "@/types/movie";
import { useWatchLaterStore } from "@/store/watchLaterStore";
import { clsx } from "clsx";
import { Star, Bookmark, Play, Clapperboard } from "lucide-react";

interface MovieCardProps {
  movie: Movie;
}

import { useStore } from "@/hooks/useStore";

export default function MovieCard({ movie }: MovieCardProps) {
  const { toggleWatchLater } = useWatchLaterStore();
  const isFavorite = useStore(useWatchLaterStore, (state) => 
    state.movies.find((m) => m.id === movie.id)
  );

  const isFavoriteBool = !!isFavorite;

  return (
    <div className="group relative movie-card">
      <Link href={`/movie/${movie.id}`} className="block relative aspect-[2/3] overflow-hidden">
        {movie.poster_path ? (
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-foreground/5 dark:bg-gradient-to-br dark:from-card dark:to-background flex flex-col items-center justify-center gap-3 border-b border-primary/10">
            <div className="w-16 h-16 rounded-2xl bg-primary/5 flex items-center justify-center border border-primary/10 transition-transform group-hover:scale-110">
              <Clapperboard className="text-primary/20" size={32} />
            </div>
          </div>
        )}
        


        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-background/90 dark:bg-gradient-to-t dark:from-background dark:via-background/40 dark:to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-5 translate-y-4 group-hover:translate-y-0">
          <div className="flex items-center justify-center mb-4">
             <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center shadow-lg shadow-primary/40 transform scale-75 group-hover:scale-100 transition-transform duration-500">
                <Play size={20} className="text-white ml-1" fill="currentColor" />
             </div>
          </div>
          <p className="text-[11px] text-foreground line-clamp-3 leading-relaxed font-medium mb-1">
            {movie.overview}
          </p>
        </div>
      </Link>

      {/* Action Button */}
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          toggleWatchLater(movie);
        }}
        className={clsx(
          "absolute top-3 right-3 p-2.5 rounded-xl backdrop-blur-md transition-all duration-300 z-20 border border-foreground/10 shadow-lg",
          isFavoriteBool 
            ? "bg-primary text-white scale-110 border-primary/20" 
            : "bg-background/60 text-foreground-muted hover:bg-primary hover:text-white"
        )}
      >
        <Bookmark size={18} fill={isFavoriteBool ? "currentColor" : "none"} />
      </button>

      {/* Content */}
      <div className="p-4 bg-foreground/[0.02] dark:bg-gradient-to-b dark:from-foreground/[0.02] dark:to-transparent">
        <div className="flex items-center justify-between gap-2">
          <h3 className="font-bold text-sm line-clamp-1 group-hover:text-primary transition-colors tracking-tight flex-1">
            {movie.title}
          </h3>
          <div className="flex items-center gap-1 shrink-0">
            <Star size={10} className="text-primary fill-primary" />
            <span className="text-[10px] font-bold text-foreground">{movie.vote_average.toFixed(1)}</span>
          </div>
        </div>
        <div className="flex items-center gap-3 mt-1.5">
          <span className="text-[10px] font-bold text-foreground-dim uppercase tracking-widest">
            {movie.release_date?.split("-")[0] || "N/A"}
          </span>
          <div className="w-1 h-1 rounded-full bg-foreground/20" />
          <span className="text-[10px] font-bold text-foreground-dim uppercase tracking-widest">
            {movie.original_language || "en"}
          </span>
        </div>
      </div>
    </div>
  );
}
