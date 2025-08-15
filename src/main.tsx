import React from "react";
import { hydrateRoot } from "react-dom/client";
import App from "./App";
import type { MoviesByCategory } from "./types";
import "./styles/main.scss";

declare global {
  interface Window {
    __INITIAL_DATA__?: MoviesByCategory;
  }
}

const initialData = window.__INITIAL_DATA__ ?? {
  popular: [],
  topRated: [],
  upcoming: [],
};

hydrateRoot(
  document.getElementById("root")!,
  <App initialMovies={initialData} />
);
