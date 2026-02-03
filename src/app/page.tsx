import { getTopRatedMovies, getGenres, getNewMovies } from "@/lib/tmdb";
import MovieGrid from "@/components/MovieGrid";
import Link from "next/link";
import { Suspense } from "react";
import GenreRowsContainer from "@/components/GenreRowsContainer";
import GenreBar from "@/components/GenreBar";

export default async function HomePage() {
  const [topRatedData, genresData, newMoviesData] = await Promise.all([
    getTopRatedMovies(),
    getGenres(),
    getNewMovies(),
  ]);

  const heroMovie = topRatedData.results[0];
  const genres = genresData.genres;
  
  // Sort new movies by release date descending
  const recentMovies = [...newMoviesData.results].sort((a, b) => 
    new Date(b.release_date).getTime() - new Date(a.release_date).getTime()
  );

  return (
    <div className="space-y-12 pb-10">
      {/* Hero Section */}
      {heroMovie && (
        <section className="relative w-full aspect-[21/7] min-h-[300px] max-h-[400px] rounded-[48px] overflow-hidden group">
          <img
            src={`https://image.tmdb.org/t/p/original${heroMovie.backdrop_path}`}
            alt={heroMovie.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />
          
          {/* Content */}
          <div className="absolute inset-0 p-8 flex items-end justify-between">
            <div className="space-y-3 max-w-3xl">
              <span className="text-white/80 text-base font-medium tracking-wide">
                {heroMovie.release_date?.split("-")[0]}
              </span>
              <h1 className="text-3xl md:text-5xl font-medium tracking-tight text-white leading-tight">
                {heroMovie.title}
              </h1>
              
              <div className="flex items-center gap-6 text-xs font-medium text-white/70">
                 <div className="flex items-center gap-2">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span>{heroMovie.vote_count}</span>
                 </div>
                 <div className="flex items-center gap-2">
                    <svg className="w-3 h-3 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                       <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span>{heroMovie.vote_average.toFixed(1)} iMDB</span>
                 </div>
                 <div className="flex items-center gap-2">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    <span>18</span>
                 </div>
              </div>
            </div>

            {/* Play Button */}
            <div className="hidden md:block">
               <Link href={`/movie/${heroMovie.id}`} className="flex items-center justify-center w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all group-play">
                  <svg className="w-8 h-8 text-white fill-white ml-1" viewBox="0 0 24 24">
                     <path d="M8 5v14l11-7z" />
                  </svg>
               </Link>
            </div>
          </div>
        </section>
      )}

      {/* Genre Filter Bar */}
      <GenreBar genres={genres} />

      {/* Recent Releases Section */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold tracking-wide text-white/90">Recent Releases</h2>
        </div>
        <MovieGrid movies={recentMovies.slice(0, 16)} />
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
