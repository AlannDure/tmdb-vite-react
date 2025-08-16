import React from "react";
import { hydrateRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "./store";
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

store.dispatch({ type: "movies/setMovies", payload: initialData });

hydrateRoot(
  document.getElementById("root")!,
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
