import React from "react";
import { hydrateRoot } from "react-dom/client";
import App from "./App";
import type { Movie } from "./App";
import "./styles/main.scss";

declare global {
  interface Window {
    __INITIAL_DATA__?: Movie[];
  }
}

const initialData: Movie[] = window.__INITIAL_DATA__ || [];

hydrateRoot(
  document.getElementById("root")!,
  <App initialMovies={initialData} />
);
