import { searchMovies } from "@/lib/tmdb";
import MovieGrid from "@/components/MovieGrid";
import Pagination from "@/components/Pagination";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { q?: string; page?: string };
}) {
  const params = await searchParams;
  const query = params.q || "";
  const page = parseInt(params.page || "1");

  let moviesData = null;
  if (query) {
    moviesData = await searchMovies(query, page);
  }

  return (
    <div className="space-y-8 pb-10">
      <div className="border-b border-white/5 pb-8">
        <h1 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter">
          {query ? `Search: ${query}` : "Search Movies"}
        </h1>
        {query && (
          <p className="text-white/50 text-sm mt-2">
            Found <span className="text-primary font-bold">{moviesData?.total_results.toLocaleString()}</span> results for your query
          </p>
        )}
      </div>

      {query ? (
        <>
          <MovieGrid movies={moviesData?.results || []} />
          {moviesData && moviesData.total_pages > 1 && (
            <Pagination 
              currentPage={moviesData.page} 
              totalPages={moviesData.total_pages} 
            />
          )}
        </>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-white/20">
          <svg className="w-20 h-20 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <p className="text-xl font-medium tracking-widest uppercase">Start typing in the navbar to search</p>
        </div>
      )}
    </div>
  );
}
