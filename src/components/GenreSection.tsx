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
      <div className="flex items-end justify-between border-l-4 border-primary pl-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-white">{genreName}</h2>
          <p className="text-white/40 text-sm mt-1 font-medium">Top picks in {genreName.toLowerCase()} for you</p>
        </div>
        <Link 
          href={`/genre/${genreId}`} 
          className="flex items-center gap-1 text-primary text-sm font-bold hover:underline underline-offset-4 group"
        >
          Explore All
          <ChevronRight size={16} className="transition-transform group-hover:translate-x-1" />
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

