import React from "react";
import { renderToString } from "react-dom/server";
import App from "./App";
import type { Movie } from "./App";
import { fetchPopularMovies } from "./api/tmbd";

export async function render(): Promise<{
  html: string;
  initialData: Movie[];
}> {
  const movies: Movie[] = await fetchPopularMovies();
  const html: string = renderToString(<App initialMovies={movies} />);
  return { html, initialData: movies };
}
