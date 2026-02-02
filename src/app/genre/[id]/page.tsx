import { getMoviesByGenre, getGenres, getTopRatedMovies } from "@/lib/tmdb";
import MovieGrid from "@/components/MovieGrid";
import SortSelector from "@/components/SortSelector";
import Pagination from "@/components/Pagination";

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
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/5 pb-8">
        <div>
          <h1 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter">
            {title}
          </h1>
          <p className="text-white/50 text-sm mt-2">
            Explore the best of <span className="text-primary font-bold">{title}</span> movies
          </p>
        </div>
        <SortSelector currentSort={sortBy} />
      </div>

      <MovieGrid movies={moviesData.results} />
      
      <Pagination 
        currentPage={moviesData.page} 
        totalPages={Math.min(moviesData.total_pages, 500)} // TMDB limits to 500 pages for discover
      />
    </div>
  );
}
