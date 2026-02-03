"use client";

import Link from "next/link";
import { Movie } from "@/types/movie";
import { useWatchLaterStore } from "@/store/watchLaterStore";
import { clsx } from "clsx";
import { Star, Bookmark, Play } from "lucide-react";

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  const { toggleWatchLater, isInWatchLater } = useWatchLaterStore();
  const isFavorite = isInWatchLater(movie.id);

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
          <div className="w-full h-full bg-slate-900 flex items-center justify-center">
            <span className="text-white/20 text-xs font-bold uppercase tracking-widest">No Poster</span>
          </div>
        )}
        
        {/* Rating Badge */}
        <div className="absolute top-3 left-3 px-2 py-1 bg-black/60 backdrop-blur-md rounded-lg border border-white/10 flex items-center gap-1.5 z-10">
          <Star size={12} className="text-yellow-500 fill-yellow-500" />
          <span className="text-[10px] font-bold text-white">{movie.vote_average.toFixed(1)}</span>
        </div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-5 translate-y-4 group-hover:translate-y-0">
          <div className="flex items-center justify-center mb-4">
             <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center shadow-lg shadow-primary/40 transform scale-75 group-hover:scale-100 transition-transform duration-500">
                <Play size={20} className="text-white ml-1" fill="currentColor" />
             </div>
          </div>
          <p className="text-[11px] text-white/80 line-clamp-3 leading-relaxed font-medium mb-1">
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
          "absolute top-3 right-3 p-2.5 rounded-xl backdrop-blur-md transition-all duration-300 z-20 border border-white/10 shadow-lg",
          isFavorite 
            ? "bg-primary text-white scale-110 border-primary/20" 
            : "bg-black/60 text-white/70 hover:bg-primary hover:text-white"
        )}
      >
        <Bookmark size={18} fill={isFavorite ? "currentColor" : "none"} />
      </button>

      {/* Content */}
      <div className="p-4 bg-gradient-to-b from-white/[0.02] to-transparent">
        <h3 className="font-bold text-sm line-clamp-1 group-hover:text-primary transition-colors tracking-tight">
          {movie.title}
        </h3>
        <div className="flex items-center gap-3 mt-1.5">
          <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">
            {movie.release_date?.split("-")[0] || "N/A"}
          </span>
          <div className="w-1 h-1 rounded-full bg-white/20" />
          <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">
            {movie.original_language || "en"}
          </span>
        </div>
      </div>
    </div>
  );
}
