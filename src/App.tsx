import React, { useEffect, useState } from "react";
import { fetchPopularMovies } from "./api/tmbd";

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
      <div className="movies-grid">
        {movies.map((movie) => (
          <div key={movie.id} className="movie-card">
            <img
              src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
              alt={movie.title}
            />
            <h2>{movie.title}</h2>
            <p>{movie.overview}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
