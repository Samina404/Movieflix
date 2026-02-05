import { getMovieDetails, getSimilarMovies } from "@/lib/tmdb";
import MovieGrid from "@/components/MovieGrid";
import RecentlyViewedHandler from "@/components/RecentlyViewedHandler";
import WatchLaterButton from "@/components/WatchLaterButton";
import Link from "next/link";
import { Play, Calendar, Star, Clapperboard, Clock } from "lucide-react";
import PlayTrailerButton from "@/components/PlayTrailerButton";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const movie = await getMovieDetails(id);

  return {
    title: movie.title,
    description: movie.overview,
    openGraph: {
      title: `${movie.title} - MovieFlix`,
      description: movie.overview,
      images: [
        {
          url: `https://image.tmdb.org/t/p/w1280${movie.backdrop_path || movie.poster_path}`,
          width: 1280,
          height: 720,
          alt: movie.title,
        },
      ],
    },
  };
}

export default async function MovieDetailsPage({ params }: { params: Promise<{ id: string }> }) {
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
    <div className="space-y-12 pb-20 min-h-screen">
      <RecentlyViewedHandler movie={movie} />

      {/* Hero Header Section */}
      <section className="relative w-full min-h-[500px] md:h-[600px] flex items-center justify-center overflow-hidden rounded-[2.5rem] shadow-2xl mx-auto max-w-[98%] mt-4">
        {/* Cinematic Backdrop */}
        <div className="absolute inset-0">
          <img
            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path || movie.poster_path}`}
            alt=""
            className="w-full h-full object-cover transform scale-105 opacity-40 dark:opacity-60 transition-transform duration-1000"
          />
          {/* Subtle Overlays for readability without "blur" */}
          <div className="absolute inset-0 dark:bg-gradient-to-t dark:from-background dark:via-transparent dark:to-background/20" />
          <div className="absolute inset-0 dark:bg-gradient-to-r dark:from-background/40 dark:via-transparent dark:to-transparent hidden md:block" />
        </div>

        {/* Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto w-full px-6 md:px-12 py-12 flex flex-col md:flex-row gap-12 items-center">
          {/* Elevated Poster */}
          <div className="shrink-0 w-[240px] md:w-[320px] shadow-[0_20px_50px_rgba(0,0,0,0.3)] rounded-[2rem] overflow-hidden border-4 border-white/10 aspect-[2/3] transform hover:scale-[1.02] transition-transform duration-500">
             {movie.poster_path ? (
               <img
                  src={`https://image.tmdb.org/t/p/w780${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full h-full object-cover"
               />
             ) : (
               <div className="w-full h-full flex flex-col items-center justify-center gap-4 bg-foreground/5 transition-all">
                 <Clapperboard className="text-primary/40" size={48} />
               </div>
             )}
          </div>

          {/* Detailed Info Area */}
          <div className="flex-1 space-y-8 text-center md:text-left">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-7xl font-[900] tracking-tighter leading-[1.1] text-foreground">
                {movie.title}
              </h1>
              
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                {movie.genres.map((g) => (
                  <span key={g.id} className="genre-tag">
                    {g.name}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 md:gap-6">
               <div className="info-chip gap-2.5">
                  <span className="text-[#f59e0b] font-black tracking-tighter text-xl">IMDb</span>
                  <span className="text-xl font-black text-foreground">{movie.vote_average.toFixed(1)}</span>
               </div>
               
               <div className="info-chip gap-3 text-foreground font-bold">
                 <Clock size={18} className="text-primary" />
                 <span>{movie.runtime} min</span>
               </div>

               <div className="info-chip gap-3 text-foreground font-bold">
                 <Calendar size={18} className="text-primary" />
                 <span>{movie.release_date.split('-')[0]}</span>
               </div>
            </div>

            <p className="text-lg md:text-xl text-foreground font-medium leading-relaxed max-w-3xl line-clamp-4 md:line-clamp-none opacity-90">
              {movie.overview}
            </p>

            <div className="pt-6 flex flex-wrap justify-center md:justify-start gap-6">
               <PlayTrailerButton videoKey={trailer?.key || null} />
               <WatchLaterButton movie={movie} />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Sections */}
      <div className="max-w-7xl mx-auto px-6 space-y-16">
        {/* Cast List Section */}
        <section className="space-y-10">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <h2 className="text-3xl font-black tracking-tighter uppercase italic primary-gradient-text leading-tight pr-2">Top Cast</h2>
              <div className="h-1 w-20 bg-primary/30 rounded-full" />
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-10">
            {movie.credits.cast.slice(0, 8).map((person) => (
              <div key={person.id} className="group space-y-4">
                <div className="cast-avatar group-hover:border-primary">
                  {person.profile_path ? (
                    <img
                      src={`https://image.tmdb.org/t/p/w300${person.profile_path}`}
                      alt={person.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  ) : (
                    <div className="w-full h-full bg-foreground/5 flex items-center justify-center text-foreground-dim text-3xl font-black">
                      {person.name.charAt(0)}
                    </div>
                  )}
                </div>
                <div className="text-center space-y-1">
                  <h4 className="font-black text-sm line-clamp-1 text-foreground leading-none">{person.name}</h4>
                  <p className="text-[11px] font-bold text-foreground-dim uppercase tracking-wider line-clamp-1">{person.character}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Recommended Section */}
        <section className="space-y-10">
           <div className="flex items-center justify-between">
              <div className="space-y-2">
                <h2 className="text-3xl font-black tracking-tighter uppercase italic primary-gradient-text leading-tight pr-2">Similar Movies</h2>
                <div className="h-1 w-20 bg-primary/30 rounded-full" />
              </div>
           </div>
          <MovieGrid movies={similarMovies} />
        </section>
      </div>
    </div>
  );
}
