"use client";

import Image from "next/image";
import Link from "next/link";
import { Movie } from "@/types/movie";
import { useWatchLaterStore } from "@/store/watchLaterStore";
import { clsx } from "clsx";

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  const { toggleWatchLater, isInWatchLater } = useWatchLaterStore();
  const isFavorite = isInWatchLater(movie.id);

  return (
    <div className="group relative movie-card-hover rounded-xl overflow-hidden bg-white/5 border border-white/10">
      <Link href={`/movie/${movie.id}`} className="block relative aspect-[2/3]">
        {movie.poster_path ? (
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-slate-800 flex items-center justify-center">
            <span className="text-white/20 text-xs">No Poster</span>
          </div>
        )}
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
          <p className="text-xs text-white/70 line-clamp-3">{movie.overview}</p>
        </div>
      </Link>

      {/* Watch Later Toggle */}
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          toggleWatchLater(movie);
        }}
        className={clsx(
          "absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all duration-300 z-10",
          isFavorite ? "bg-primary text-white scale-110" : "bg-black/40 text-white/70 hover:bg-black/60 hover:text-white"
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
      </button>

      {/* Info */}
      <div className="p-3">
        <h3 className="font-semibold text-sm line-clamp-1 group-hover:text-primary transition-colors">
          {movie.title}
        </h3>
        <div className="flex items-center justify-between mt-1 text-[10px] text-white/50 uppercase tracking-wider">
          <span>{movie.release_date?.split("-")[0] || "N/A"}</span>
          <div className="flex items-center gap-1">
            <svg className="w-3 h-3 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span>{movie.vote_average.toFixed(1)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
