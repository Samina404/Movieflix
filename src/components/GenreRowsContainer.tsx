import { getMoviesByGenre } from "@/lib/tmdb";
import { Genre } from "@/types/movie";
import GenreSection from "./GenreSection";

export default async function GenreRowsContainer({ genres }: { genres: Genre[] }) {
  // Fetch movies for all genres in parallel
  const genresWithMovies = await Promise.all(
    genres.map(async (genre) => {
      // Fetching page 1 (default 20 items) to have enough candidates for deduplication
      const response = await getMoviesByGenre(genre.id);
      return { ...genre, movies: response.results };
    })
  );

  const seenMovieIds = new Set<number>();
  
  const processedGenres = genresWithMovies.map((genre) => {
    // Filter duplicates
    const uniqueMovies = genre.movies.filter((movie) => {
      if (seenMovieIds.has(movie.id)) return false;
      seenMovieIds.add(movie.id);
      return true;
    });
    
    // Take top 8
    return {
      ...genre,
      displayMovies: uniqueMovies.slice(0, 8)
    };
  });

  return (
    <div className="space-y-12">
      {processedGenres.map((genre) => (
        <GenreSection 
            key={genre.id} 
            genreId={genre.id} 
            genreName={genre.name} 
            movies={genre.displayMovies} 
        />
      ))}
    </div>
  );
}
