import React from "react";
import Carousel from "./Carousel";
import type { MoviesByCategory } from "../types";

interface HomeProps {
  movies: MoviesByCategory;
}

const Home: React.FC<HomeProps> = ({ movies }) => {
  return (
    <div className="home">
      <section>
        <h2>Popular Movies</h2>
        <Carousel movies={movies.popular} />
      </section>

      <section>
        <h2>Top Rated Movies</h2>
        <Carousel movies={movies.topRated} />
      </section>

      <section>
        <h2>Upcoming Movies</h2>
        <Carousel movies={movies.upcoming} />
      </section>
    </div>
  );
};

export default Home;
