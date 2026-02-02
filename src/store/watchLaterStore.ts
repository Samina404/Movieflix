import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Movie } from "@/types/movie";

interface WatchLaterState {
  movies: Movie[];
  toggleWatchLater: (movie: Movie) => void;
  isInWatchLater: (movieId: number) => boolean;
}

export const useWatchLaterStore = create<WatchLaterState>()(
  persist(
    (set, get) => ({
      movies: [],
      toggleWatchLater: (movie: Movie) =>
        set((state) => {
          const isExisting = state.movies.find((m) => m.id === movie.id);
          if (isExisting) {
            return { movies: state.movies.filter((m) => m.id !== movie.id) };
          }
          return { movies: [...state.movies, movie] };
        }),
      isInWatchLater: (movieId: number) => {
        return !!get().movies.find((m) => m.id === movieId);
      },
    }),
    {
      name: "watch-later-storage",
    }
  )
);
