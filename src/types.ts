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
  initialMovies: MoviesByCategory;
}
