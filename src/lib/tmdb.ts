import axios from "axios";
import { Movie, Genre, TMDBResponse, MovieDetails } from "@/types/movie";

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_BASE_URL = process.env.NEXT_PUBLIC_TMDB_BASE_URL || "https://api.themoviedb.org/3";

const api = axios.create({
  baseURL: TMDB_BASE_URL,
  params: {
    api_key: TMDB_API_KEY,
  },
});

export const getTopRatedMovies = async (page = 1): Promise<TMDBResponse<Movie>> => {
  const response = await api.get("/movie/top_rated", { params: { page } });
  return response.data;
};

export const getGenres = async (): Promise<{ genres: Genre[] }> => {
  const response = await api.get("/genre/movie/list");
  return response.data;
};

export const getMoviesByGenre = async (
  genreId: string | number,
  page = 1,
  sortBy = "popularity.desc"
): Promise<TMDBResponse<Movie>> => {
  const response = await api.get("/discover/movie", {
    params: {
      with_genres: genreId,
      page,
      sort_by: sortBy,
    },
  });
  return response.data;
};

export const getMovieDetails = async (id: string | number): Promise<MovieDetails> => {
  const response = await api.get(`/movie/${id}`, {
    params: { append_to_response: "credits" },
  });
  return response.data;
};

export const getSimilarMovies = async (id: string | number): Promise<TMDBResponse<Movie>> => {
  const response = await api.get(`/movie/${id}/similar`);
  return response.data;
};

export const searchMovies = async (query: string, page = 1): Promise<TMDBResponse<Movie>> => {
  const response = await api.get("/search/movie", {
    params: { query, page },
  });
  return response.data;
};

export const getPopularMoviesByGenre = async (genreId: number): Promise<Movie[]> => {
  const response = await api.get("/discover/movie", {
    params: {
      with_genres: genreId,
      sort_by: "popularity.desc",
      page: 1,
    },
  });
  return response.data.results.slice(0, 5);
};
