import { getMovieDetails, getSimilarMovies } from "@/lib/tmdb";
import MovieGrid from "@/components/MovieGrid";
import RecentlyViewedHandler from "@/components/RecentlyViewedHandler";
import { useWatchLaterStore } from "@/store/watchLaterStore";
import Image from "next/image";
import Link from "next/link";
import WatchLaterButton from "@/components/WatchLaterButton";

export default async function MovieDetailsPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  const movie = await getMovieDetails(id);
  const similarData = await getSimilarMovies(id);

  // Sort similar movies by popularity as required
  const similarMovies = similarData.results
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, 12);

  const formatRuntime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  return (
    <div className="space-y-12 pb-20">
      <RecentlyViewedHandler movie={movie} />

      {/* Backdrop & Main Info */}
      <div className="relative min-h-[50vh] flex items-end rounded-3xl overflow-hidden mt-6">
        <div className="absolute inset-0">
          <img
            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
            alt={movie.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        </div>

        <div className="relative z-10 w-full p-8 md:p-12 flex flex-col md:flex-row gap-8 items-end">
          <div className="hidden md:block w-64 shrink-0 shadow-2xl rounded-2xl overflow-hidden border border-white/10">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-full aspect-[2/3] object-cover"
            />
          </div>

          <div className="flex-1 space-y-4">
            <div className="flex flex-wrap gap-2">
              {movie.genres.map((g) => (
                <span key={g.id} className="px-3 py-1 bg-white/10 border border-white/10 rounded-full text-xs font-semibold">
                  {g.name}
                </span>
              ))}
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter leading-none italic uppercase">
              {movie.title}
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-sm font-medium text-white/70">
              <div className="flex items-center gap-1.5">
                <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="text-white font-bold">{movie.vote_average.toFixed(1)}</span>
                <span className="text-white/40">({movie.vote_count.toLocaleString()})</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span>{movie.release_date}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span>{formatRuntime(movie.runtime)}</span>
              </div>
            </div>
            <div className="pt-4 flex gap-4">
              <WatchLaterButton movie={movie} />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Overview & Cast */}
        <div className="lg:col-span-2 space-y-10">
          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">Overview</h2>
            <p className="text-white/70 leading-relaxed text-lg italic">
              {movie.overview}
            </p>
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl font-bold tracking-tight">Top Cast</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {movie.credits.cast.slice(0, 8).map((person) => (
                <div key={person.id} className="flex flex-col gap-2">
                  <div className="aspect-square bg-white/5 rounded-2xl overflow-hidden border border-white/5">
                    {person.profile_path ? (
                      <img
                        src={`https://image.tmdb.org/t/p/w300${person.profile_path}`}
                        alt={person.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-white/20">?</div>
                    )}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm leading-tight">{person.name}</h4>
                    <p className="text-xs text-white/50">{person.character}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar info */}
        <div className="space-y-8">
           <section className="p-6 bg-white/5 border border-white/10 rounded-2xl space-y-4">
              <h3 className="font-bold text-lg">Details</h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm py-2 border-b border-white/5">
                  <span className="text-white/50 font-bold uppercase tracking-widest text-[10px]">Release Year</span>
                  <span>{movie.release_date.split('-')[0]}</span>
                </div>
                <div className="flex justify-between text-sm py-2 border-b border-white/5">
                  <span className="text-white/50 font-bold uppercase tracking-widest text-[10px]">Status</span>
                  <span className="text-primary font-bold uppercase tracking-widest text-[10px]">Released</span>
                </div>
                <div className="flex justify-between text-sm py-2">
                  <span className="text-white/50 font-bold uppercase tracking-widest text-[10px]">Rating</span>
                   <div className="flex items-center gap-1">
                     <span className="px-1.5 py-0.5 bg-yellow-500 text-black text-[10px] font-black rounded uppercase">IMDB</span>
                     <span>{movie.vote_average.toFixed(1)}</span>
                   </div>
                </div>
              </div>
           </section>
        </div>
      </div>

      {/* Similar Movies */}
      <section className="max-w-7xl mx-auto px-4 space-y-8">
        <h2 className="text-2xl font-bold tracking-tight">Similar Movies</h2>
        <MovieGrid movies={similarMovies} />
      </section>
    </div>
  );
}
