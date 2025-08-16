import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Carousel from "./Carousel";
import { fetchMovies } from "../store/moviesSlice";
import type { RootState, AppDispatch } from "../store";

const Home: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading, error } = useSelector(
    (state: RootState) => state.movies
  );

  useEffect(() => {
    if (!data.popular.length) {
      dispatch(fetchMovies());
    }
  }, []);

  if (loading) return <p>Loading movies...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="home">
      <h1>Popular Movies</h1>
      <Carousel movies={data.popular} />

      <h1>Top Rated Movies</h1>
      <Carousel movies={data.topRated} />

      <h1>Upcoming Movies</h1>
      <Carousel movies={data.upcoming} />
    </div>
  );
};

export default Home;
