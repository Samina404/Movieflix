import { getNewMovies } from "@/lib/tmdb";
import MovieGrid from "@/components/MovieGrid";
import { Suspense } from "react";
import Link from "next/link";

export const dynamic = "force-dynamic";

interface PageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function MoviesPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const currentPage = parseInt(params.page || "1");
  const newMoviesData = await getNewMovies(currentPage);
  
  // Sort by release date descending
  const movies = [...newMoviesData.results].sort((a, b) => 
    new Date(b.release_date).getTime() - new Date(a.release_date).getTime()
  );

  const totalPages = Math.min(newMoviesData.total_pages, 500); // TMDB limits to 500 pages

  // Pagination logic
  const getPageNumbers = () => {
    const pages = [];
    const start = Math.max(1, currentPage - 2);
    const end = Math.min(totalPages, start + 4);
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      <div className="relative">
        <div className="absolute -top-24 -left-20 w-64 h-64 bg-primary/10 rounded-full blur-[100px] -z-10" />
        <div className="border-b border-white/5 pb-12">
          <h1 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter primary-gradient-text leading-none mb-4">
            New Releases
          </h1>
          <p className="text-white/50 text-base md:text-lg max-w-2xl font-medium leading-relaxed">
            Discover the latest movies in theaters and online. Our list is constantly updated with the freshest content from around the world.
          </p>
        </div>
      </div>

      <Suspense fallback={<div className="h-96 animate-pulse bg-white/5 rounded-2xl" />}>
        <MovieGrid movies={movies} />
      </Suspense>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-2 mt-12 pb-10">
        <Link
          href={`/movies?page=${Math.max(1, currentPage - 1)}`}
          className={`px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors ${currentPage === 1 ? 'pointer-events-none opacity-50' : ''}`}
        >
          Previous
        </Link>
        
        {getPageNumbers().map((pageNum) => (
          <Link
            key={pageNum}
            href={`/movies?page=${pageNum}`}
            className={`w-10 h-10 flex items-center justify-center rounded-lg border transition-all ${
              currentPage === pageNum 
                ? 'bg-primary text-white border-primary font-bold shadow-lg shadow-primary/25' 
                : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10 hover:text-white'
            }`}
          >
            {pageNum}
          </Link>
        ))}

        <Link
          href={`/movies?page=${Math.min(totalPages, currentPage + 1)}`}
          className={`px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors ${currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}`}
        >
          Next
        </Link>
      </div>
    </div>
  );
}
