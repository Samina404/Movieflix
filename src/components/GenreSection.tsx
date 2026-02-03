import { Movie } from "@/types/movie";
import MovieCard from "./MovieCard";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface GenreSectionProps {
  genreId: number;
  genreName: string;
  movies: Movie[];
}

export default function GenreSection({ genreId, genreName, movies }: GenreSectionProps) {
  if (movies.length === 0) return null;

  return (
    <section className="space-y-8">
      <div className="flex items-end justify-between border-l-4 border-primary/50 pl-6 py-2">
        <div>
          <h2 className="text-3xl font-black italic uppercase tracking-tighter primary-gradient-text leading-tight">{genreName}</h2>
          <p className="text-white/40 text-xs mt-1 font-bold uppercase tracking-[0.1em]">Top picks for you</p>
        </div>
        <Link 
          href={`/genre/${genreId}`} 
          className="flex items-center gap-2 text-primary/80 text-xs font-black uppercase tracking-widest hover:text-primary transition-all group"
        >
          View All
          <ChevronRight size={14} className="transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 md:gap-8">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  );
}

