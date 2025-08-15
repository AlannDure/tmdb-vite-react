import React, { useEffect, useState } from "react";
import Carousel from "./components/Carousel";
import {
  fetchPopularMovies,
  fetchTopRatedMovies,
  fetchUpcomingMovies,
} from "./api/tmbd";

export interface Movie {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
}

export interface MoviesByCategory {
  popular: Movie[];
  topRated: Movie[];
  upcoming: Movie[];
}

export interface AppProps {
  initialMovies: MoviesByCategory; // **make required**
}

const App: React.FC<AppProps> = ({ initialMovies }) => {
  const [movies, setMovies] = useState<MoviesByCategory>(initialMovies);

  useEffect(() => {
    // Only fetch if somehow movies are empty (e.g., non-SSR page)
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
  }, []);

  return (
    <div className="app">
      <h1>Popular Movies</h1>
      <Carousel movies={movies.popular} />

      <h1>Top Rated Movies</h1>
      <Carousel movies={movies.topRated} />

      <h1>Upcoming Movies</h1>
      <Carousel movies={movies.upcoming} />
    </div>
  );
};

export default App;
