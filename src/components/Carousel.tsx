import React, { useState } from "react";
import { Link } from "react-router-dom";

//import type { Movie } from "../App";
import type { Movie } from "../types";

interface CarouselProps {
  movies: Movie[];
}

const Carousel: React.FC<CarouselProps> = ({ movies }) => {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((prev) => (prev + 1) % movies.length);
  const prev = () =>
    setCurrent((prev) => (prev - 1 + movies.length) % movies.length);

  return (
    <div className="carousel">
      <button className="carousel-btn" onClick={prev}>
        ‹
      </button>
      {movies.length > 0 && (
        <div className="carousel-card">
          <Link to={`/movie/${movies[current].id}`}>
            <img
              src={`https://image.tmdb.org/t/p/w500${movies[current].poster_path}`}
              alt={movies[current].title}
            />
          </Link>

          <p>{movies[current].title}</p>
        </div>
      )}
      <button className="carousel-btn" onClick={next}>
        ›
      </button>
    </div>
  );
};

export default Carousel;
