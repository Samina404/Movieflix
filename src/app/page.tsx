import { getTopRatedMovies, getGenres, getNewMovies } from "@/lib/tmdb";
import MovieGrid from "@/components/MovieGrid";
import Link from "next/link";
import { Suspense } from "react";
import GenreRowsContainer from "@/components/GenreRowsContainer";
import GenreBar from "@/components/GenreBar";
import { Play, Info, Star, Calendar, Users } from "lucide-react";

export default async function HomePage() {
  const [topRatedData, genresData, newMoviesData] = await Promise.all([
    getTopRatedMovies(),
    getGenres(),
    getNewMovies(),
  ]);

  const heroMovie = topRatedData.results[0];
  const genres = genresData.genres;
  
  const recentMovies = [...newMoviesData.results].sort((a, b) => 
    new Date(b.release_date).getTime() - new Date(a.release_date).getTime()
  );

  return (
    <div className="space-y-12 pb-20">
      {/* Hero Section */}
      {heroMovie && (
        <section className="relative w-full aspect-[21/9] min-h-[450px] rounded-3xl overflow-hidden group shadow-2xl">
          <img
            src={`https://image.tmdb.org/t/p/original${heroMovie.backdrop_path}`}
            alt={heroMovie.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#020617] via-transparent to-transparent" />
          
          <div className="absolute inset-0 p-8 md:p-16 flex flex-col justify-end max-w-4xl">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 bg-primary/20 backdrop-blur-md rounded-full text-primary text-xs font-bold uppercase tracking-wider border border-primary/20">
                  Featured Movie
                </span>
                <div className="flex items-center gap-1.5 text-white/60 text-sm font-medium">
                  <Calendar size={14} />
                  <span>{heroMovie.release_date?.split("-")[0]}</span>
                </div>
              </div>

              <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight text-white leading-tight drop-shadow-2xl">
                {heroMovie.title}
              </h1>
              
              <p className="text-white/70 text-base md:text-lg line-clamp-3 max-w-2xl font-medium leading-relaxed">
                {heroMovie.overview}
              </p>

              <div className="flex items-center gap-6 text-sm font-semibold text-white/80">
                 <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-lg border border-white/10">
                    <Star className="text-yellow-500 fill-yellow-500" size={16} />
                    <span>{heroMovie.vote_average.toFixed(1)} <span className="text-white/40 font-normal ml-0.5">Rating</span></span>
                 </div>
                 <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-lg border border-white/10">
                    <Users className="text-primary" size={16} />
                    <span>{heroMovie.vote_count.toLocaleString()} <span className="text-white/40 font-normal ml-0.5">Votes</span></span>
                 </div>
              </div>

              <div className="flex items-center gap-4 pt-4">
                <Link 
                  href={`/movie/${heroMovie.id}`} 
                  className="flex items-center gap-3 px-8 py-4 bg-primary text-white rounded-xl font-bold hover:bg-primary/90 transition-all hover:scale-105 shadow-lg shadow-primary/25"
                >
                  <Play size={20} fill="currentColor" />
                  Watch Trailer
                </Link>
                <Link 
                  href={`/movie/${heroMovie.id}`} 
                  className="flex items-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-md text-white rounded-xl font-bold hover:bg-white/20 transition-all border border-white/10"
                >
                  <Info size={20} />
                  More Details
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Genre Filter Bar */}
      <GenreBar genres={genres} />

      {/* Recent Releases Section */}
      <section className="space-y-8">
        <div className="flex items-end justify-between border-l-4 border-primary/50 pl-6 py-2">
          <div>
            <h2 className="text-3xl font-black italic uppercase tracking-tighter primary-gradient-text leading-tight">Recent Releases</h2>
            <p className="text-white/40 text-xs mt-1 font-bold uppercase tracking-[0.1em]">Discover the latest cinema</p>
          </div>
          <Link href="/movies" className="text-primary/80 text-xs font-black uppercase tracking-widest hover:text-primary transition-all">
            Browse All
          </Link>
        </div>
        <MovieGrid movies={recentMovies.slice(0, 16)} />
      </section>

      {/* Popular Movies by Genre */}
      <Suspense
        fallback={
          <div className="space-y-16">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-80 animate-pulse bg-white/5 rounded-3xl" />
            ))}
          </div>
        }
      >
        <div className="space-y-20">
          <GenreRowsContainer genres={genres.slice(0, 6)} />
        </div>
      </Suspense>
    </div>
  );
}

