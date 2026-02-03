import { getMovieDetails, getSimilarMovies } from "@/lib/tmdb";
import MovieGrid from "@/components/MovieGrid";
import RecentlyViewedHandler from "@/components/RecentlyViewedHandler";
import WatchLaterButton from "@/components/WatchLaterButton";
import Link from "next/link";
import PlayTrailerButton from "@/components/PlayTrailerButton";

export default async function MovieDetailsPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  const movie = await getMovieDetails(id);
  const similarData = await getSimilarMovies(id);

  const trailer = movie.videos.results.find(
    (video) => video.site === "YouTube" && video.type === "Trailer"
  ) || movie.videos.results[0];

  const similarMovies = similarData.results
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, 16);

  return (
    <div className="space-y-12 pb-20 bg-[#050505] min-h-screen text-white">
      <RecentlyViewedHandler movie={movie} />

      {/* Hero Header Section - Reduced complexity and height */}
      <section className="relative w-full min-h-[450px] md:h-[500px] overflow-hidden flex items-center">
        {/* Subtle Blurred Background */}
        <div className="absolute inset-0 z-0">
          <img
            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path || movie.poster_path}`}
            alt=""
            className="w-full h-full object-cover blur-xl opacity-80 transform scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
        </div>

        {/* Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto w-full px-6 flex flex-col md:flex-row gap-10 items-center md:items-center">
          {/* Smaller, Professional Poster */}
          <div className="shrink-0 w-[220px] md:w-[240px] shadow-2xl rounded-2xl overflow-hidden border border-white/10">
             <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-auto object-cover"
             />
          </div>

          {/* Right: Info Area */}
          <div className="flex-1 space-y-6 text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              {movie.title}
            </h1>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 text-sm">
              <div className="flex items-center gap-2">
                 <span className="text-[#f59e0b] font-black tracking-tighter text-xl">IMDb</span>
                 <span className="text-xl font-bold">{movie.vote_average.toFixed(1)}</span>
              </div>
              
              <div className="flex items-center gap-2 text-white/60">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{movie.runtime} min</span>
              </div>

              <div className="flex items-center gap-2 text-white/60">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>{movie.release_date.split('-')[0]}</span>
              </div>
            </div>

            <p className="text-base md:text-lg text-white/70 leading-relaxed max-w-3xl line-clamp-3 md:line-clamp-none">
              {movie.overview}
            </p>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
              {movie.genres.map((g) => (
                <span
                  key={g.id}
                  className="px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-xs font-semibold text-white/80"
                >
                  {g.name}
                </span>
              ))}
            </div>

            <div className="pt-4 flex flex-wrap justify-center md:justify-start gap-4">
               <PlayTrailerButton videoKey={trailer?.key || null} />
               <WatchLaterButton movie={movie} />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Sections */}
      <div className="max-w-7xl mx-auto px-6 space-y-16">
        {/* Cast List Section - Restored and updated */}
        <section className="space-y-8">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-bold tracking-tight">Top Cast</h2>
            <div className="h-px flex-1 bg-white/10" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-6">
            {movie.credits.cast.slice(0, 8).map((person) => (
              <div key={person.id} className="group space-y-3">
                <div className="aspect-square rounded-full overflow-hidden border-2 border-white/5 group-hover:border-primary/50 transition-all">
                  {person.profile_path ? (
                    <img
                      src={`https://image.tmdb.org/t/p/w300${person.profile_path}`}
                      alt={person.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full bg-white/5 flex items-center justify-center text-white/20 text-xl font-bold">
                      {person.name.charAt(0)}
                    </div>
                  )}
                </div>
                <div className="text-center">
                  <h4 className="font-bold text-xs line-clamp-1">{person.name}</h4>
                  <p className="text-[10px] text-white/40 line-clamp-1">{person.character}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Recommended Section */}
        <section className="space-y-8">
           <div className="flex items-center gap-4">
              <h2 className="text-2xl font-bold tracking-tight">Recommended for You</h2>
              <div className="h-px flex-1 bg-white/10" />
           </div>
          <MovieGrid movies={similarMovies} />
        </section>
      </div>
    </div>
  );
}
