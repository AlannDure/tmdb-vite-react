// src/hooks/useMovies.ts
import { useEffect, useState } from "react";
import type { MoviesByCategory } from "../types";
import {
  fetchPopularMovies,
  fetchTopRatedMovies,
  fetchUpcomingMovies,
} from "../api/tmbd";

export const useMovies = (initialMovies: MoviesByCategory) => {
  const [movies, setMovies] = useState<MoviesByCategory>(initialMovies);

  useEffect(() => {
    if (!initialMovies.popular.length) {
      async function fetchData() {
        const [popular, topRated, upcoming] = await Promise.all([
          fetchPopularMovies(),
          fetchTopRatedMovies(),
          fetchUpcomingMovies(),
        ]);
        setMovies({ popular, topRated, upcoming });
      }
      fetchData();
    }
  }, [initialMovies]);

  return movies;
};
