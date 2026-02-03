import { Movie } from "@/types/movie";
import MovieCard from "./MovieCard";
import { Film } from "lucide-react";

interface MovieGridProps {
  movies: Movie[];
}

export default function MovieGrid({ movies }: MovieGridProps) {
  if (movies.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-center space-y-6">
        <div className="w-24 h-24 bg-white/5 rounded-3xl flex items-center justify-center border border-white/10 text-white/20">
          <Film size={48} />
        </div>
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-white tracking-tight uppercase tracking-widest">No movies found</h3>
          <p className="text-white/40 max-w-md mx-auto font-medium lowercase italic">
            Try adjusting your search or filters to find what you're looking for.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-6 md:gap-8">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}

