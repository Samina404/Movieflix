import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Movie } from "@/types/movie";

interface RecentlyViewedState {
  movies: Movie[];
  addToRecentlyViewed: (movie: Movie) => void;
}

export const useRecentlyViewedStore = create<RecentlyViewedState>()(
  persist(
    (set) => ({
      movies: [],
      addToRecentlyViewed: (movie: Movie) =>
        set((state) => {
          const filtered = state.movies.filter((m) => m.id !== movie.id);
          // Keep only top 20 recently viewed
          return {
            movies: [movie, ...filtered].slice(0, 20),
          };
        }),
    }),
    {
      name: "recently-viewed-storage",
    }
  )
);
