import React, { useState } from "react";
import type { Movie } from "../App";

interface CarouselProps {
  movies: Movie[];
}

const Carousel: React.FC<CarouselProps> = ({ movies }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? movies.length - 1 : prevIndex - 1
    );
  };

  const next = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === movies.length - 1 ? 0 : prevIndex + 1
    );
  };

  if (movies.length === 0) return <p>No movies to show</p>;

  const currentMovie = movies[currentIndex];

  return (
    <div className="carousel">
      <button className="carousel-btn left" onClick={prev}>
        ◀
      </button>
      <div className="carousel-card">
        <img
          src={`https://image.tmdb.org/t/p/w300${currentMovie.poster_path}`}
          alt={currentMovie.title}
        />
        <h2>{currentMovie.title}</h2>
        <p>{currentMovie.overview}</p>
      </div>
      <button className="carousel-btn right" onClick={next}>
        ▶
      </button>
    </div>
  );
};

export default Carousel;
