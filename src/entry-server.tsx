import React from "react";
import { renderToString } from "react-dom/server";
import App from "./App";
//import type { MoviesByCategory } from "./App";
import type { MoviesByCategory } from "./types";
import {
  fetchPopularMovies,
  fetchTopRatedMovies,
  fetchUpcomingMovies,
} from "./api/tmbd";

export async function render(): Promise<{
  html: string;
  initialData: MoviesByCategory;
}> {
  const [popular, topRated, upcoming] = await Promise.all([
    fetchPopularMovies(),
    fetchTopRatedMovies(),
    fetchUpcomingMovies(),
  ]);

  const initialData: MoviesByCategory = { popular, topRated, upcoming };

  const html = renderToString(<App initialMovies={initialData} />);

  return { html, initialData };
}
