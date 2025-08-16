import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../store";
import { getMovieById, clearMovie } from "../store/slices/movieSlice";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const MoviePage: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const movie = useSelector((state: RootState) => state.movie.current);
  const status = useSelector((state: RootState) => state.movie.status);

  useEffect(() => {
    if (id) {
      dispatch(getMovieById(Number(id)));
    }
    return () => {
      dispatch(clearMovie());
    };
  }, [id, dispatch]);

  if (!id) return <div>Movie ID not provided</div>;
  if (status === "loading") return <div>Loading...</div>;
  if (!movie) return <div>Movie not found</div>;

  return (
    <div className="movie-page">
      <h1>{movie.title}</h1>
      {movie.poster_path && (
        <img src={`${IMAGE_BASE_URL}${movie.poster_path}`} alt={movie.title} />
      )}
      <p>{movie.overview || "No description available."}</p>
    </div>
  );
};

export default MoviePage;
