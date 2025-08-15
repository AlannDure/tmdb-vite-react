import React, { useEffect, useState } from "react";
import { fetchPopularMovies } from "./api/tmbd";
import Carousel from "./components/Carousel";

export interface Movie {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
}

export interface AppProps {
  initialMovies?: Movie[];
}

const App: React.FC<AppProps> = ({ initialMovies = [] }) => {
  const [movies, setMovies] = useState<Movie[]>(initialMovies);

  useEffect(() => {
    if (movies.length === 0) {
      fetchPopularMovies().then(setMovies);
    }
  }, []);

  return (
    <div className="app">
      <h1>Popular Movies</h1>
      <Carousel movies={movies} />
    </div>
  );
};

export default App;
