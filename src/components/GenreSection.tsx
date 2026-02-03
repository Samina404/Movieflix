import { Movie } from "@/types/movie";
import MovieCard from "./MovieCard";
import Link from "next/link";

interface GenreSectionProps {
  genreId: number;
  genreName: string;
  movies: Movie[];
}

export default function GenreSection({ genreId, genreName, movies }: GenreSectionProps) {
  if (movies.length === 0) return null;

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold tracking-wide text-white/90">{genreName}</h2>
        {/* <Link
          href={`/genre/${genreId}`}
          className="text-sm font-medium text-white/50 hover:text-white transition-colors"
        >
          View All
        </Link> */}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-6">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  );
}
