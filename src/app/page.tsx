import { getTopRatedMovies, getGenres } from "@/lib/tmdb";
import MovieGrid from "@/components/MovieGrid";
import Link from "next/link";
import { Suspense } from "react";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import GenreRowsContainer from "@/components/GenreRowsContainer";

export default async function HomePage() {
  const [topRatedData, genresData] = await Promise.all([
    getTopRatedMovies(),
    getGenres(),
  ]);

  const heroMovie = topRatedData.results[0];
  const genres = genresData.genres;

  return (
    <div className="space-y-12 pb-10">
      {/* Hero Section */}
      {heroMovie && (
        <section className="relative h-[60vh] min-h-[400px] w-full rounded-3xl overflow-hidden group">
          <img
            src={`https://image.tmdb.org/t/p/original${heroMovie.backdrop_path}`}
            alt={heroMovie.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
          <div className="absolute bottom-0 left-0 p-8 md:p-12 space-y-4 max-w-2xl">
            <span className="px-3 py-1 bg-primary/20 border border-primary/30 rounded-full text-primary text-xs font-bold uppercase tracking-wider">
              Featured Top Rated
            </span>
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter leading-none">
              {heroMovie.title}
            </h1>
            <p className="text-white/70 line-clamp-3 md:line-clamp-none text-sm md:text-base">
              {heroMovie.overview}
            </p>
            <div className="flex gap-4 pt-4">
              <Link
                href={`/movie/${heroMovie.id}`}
                className="px-8 py-3 bg-white text-black font-bold rounded-full hover:bg-white/90 transition-colors"
              >
                View Details
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Genres List */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight">Browse by Genre</h2>
        <div className="flex flex-wrap gap-3">
          {genres.map((genre) => (
            <Link
              key={genre.id}
              href={`/genre/${genre.id}`}
              className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm font-medium hover:bg-primary transition-all hover:border-primary"
            >
              {genre.name}
            </Link>
          ))}
        </div>
      </section>

      {/* Top Rated Section */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight">Top Rated Movies</h2>
          <Link href="/genre/top-rated" className="text-sm font-medium text-primary hover:underline">
            See more
          </Link>
        </div>
        <MovieGrid movies={topRatedData.results.slice(0, 12)} />
      </section>

      {/* Popular Movies by Genre (Display first 5 genres) */}
      <Suspense
        fallback={
          <div className="space-y-12">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-64 animate-pulse bg-white/5 rounded-2xl" />
            ))}
          </div>
        }
      >
        <GenreRowsContainer genres={genres.slice(0, 5)} />
      </Suspense>
    </div>
  );
}
