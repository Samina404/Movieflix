import { getMoviesByGenre, getGenres, getTopRatedMovies } from "@/lib/tmdb";
import MovieGrid from "@/components/MovieGrid";
import SortSelector from "@/components/SortSelector";
import Pagination from "@/components/Pagination";
import Link from "next/link";

export default async function GenrePage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { sort?: string; page?: string };
}) {
  const { id } = await params;
  const sParams = await searchParams;
  const sortBy = sParams.sort || "popularity.desc";
  const page = parseInt(sParams.page || "1");

  const [genresData, moviesData] = await Promise.all([
    getGenres(),
    id === "top-rated" 
      ? getTopRatedMovies(page) 
      : getMoviesByGenre(id, page, sortBy),
  ]);

  const genre = genresData.genres.find((g) => g.id.toString() === id);
  const title = genre ? genre.name : id === "top-rated" ? "Top Rated Movies" : "Movies";

  return (
    <div className="space-y-8 pb-10">
      <div className="relative">
        {/* Background Decorative Glow */}
        <div className="absolute -top-24 -left-20 w-64 h-64 bg-primary/10 rounded-full blur-[100px] -z-10" />
        
        <div className="flex flex-col gap-6 border-b border-white/5 pb-12">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <span className="text-white/60">Genres</span>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <span className="text-primary">{title}</span>
          </nav>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter primary-gradient-text leading-none">
                {title}
              </h1>
              <p className="text-white/50 text-base md:text-lg mt-4 max-w-2xl font-medium leading-relaxed">
                Discover the most popular and highly-rated <span className="text-white font-bold">{title.toLowerCase()}</span> movies. 
                Our curated selection brings you the best of cinema in this category.
              </p>
            </div>
            <div className="flex-shrink-0">
              <SortSelector currentSort={sortBy} />
            </div>
          </div>
        </div>
      </div>

      <MovieGrid movies={moviesData.results} />
      
      <Pagination 
        currentPage={moviesData.page} 
        totalPages={Math.min(moviesData.total_pages, 500)} // TMDB limits to 500 pages for discover
      />
    </div>
  );
}
