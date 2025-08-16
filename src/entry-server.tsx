import React from "react";
import { renderToString } from "react-dom/server";
import { Provider } from "react-redux";
import { store } from "./store";
import App from "./App";
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

  store.dispatch({ type: "movies/setMovies", payload: initialData });

  const html = renderToString(
    <Provider store={store}>
      <App />
    </Provider>
  );

  return { html, initialData };
}
