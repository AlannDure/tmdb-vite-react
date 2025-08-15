import React from "react";
import Home from "./components/Home";
import type { AppProps } from "./types";
import { useMovies } from "./hooks/useMovies";

const App: React.FC<AppProps> = ({ initialMovies }) => {
  const movies = useMovies(initialMovies);

  return (
    <div className="app">
      <Home movies={movies} />
    </div>
  );
};

export default App;
