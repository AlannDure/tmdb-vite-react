import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
  fetchPopularMovies,
  fetchTopRatedMovies,
  fetchUpcomingMovies,
} from "../../api/tmbd";
import type { Movie, MoviesByCategory } from "../../types";

export const fetchMovies = createAsyncThunk("movies/fetchAll", async () => {
  const [popular, topRated, upcoming] = await Promise.all([
    fetchPopularMovies(),
    fetchTopRatedMovies(),
    fetchUpcomingMovies(),
  ]);
  return { popular, topRated, upcoming } as MoviesByCategory;
});

interface MoviesState {
  data: MoviesByCategory;
  loading: boolean;
  error: string | null;
}

const initialState: MoviesState = {
  data: { popular: [], topRated: [], upcoming: [] },
  loading: false,
  error: null,
};

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setMovies: (state, action: PayloadAction<MoviesByCategory>) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch movies";
      });
  },
});

export const { setMovies } = moviesSlice.actions;
export default moviesSlice.reducer;
