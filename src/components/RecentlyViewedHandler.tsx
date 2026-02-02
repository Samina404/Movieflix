"use client";

import { useEffect } from "react";
import { useRecentlyViewedStore } from "@/store/recentlyViewedStore";
import { Movie } from "@/types/movie";

export default function RecentlyViewedHandler({ movie }: { movie: Movie }) {
  const { addToRecentlyViewed } = useRecentlyViewedStore();

  useEffect(() => {
    if (movie) {
      addToRecentlyViewed(movie);
    }
  }, [movie, addToRecentlyViewed]);

  return null;
}
