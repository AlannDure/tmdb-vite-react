import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { fetchMovieById } from "../../api/tmbd";
import type { Movie } from "../../types";

interface MovieState {
  current?: Movie;
  status: "idle" | "loading" | "failed";
}

const initialState: MovieState = {
  current: undefined,
  status: "idle",
};

export const getMovieById = createAsyncThunk(
  "movie/fetchById",
  async (id: number) => {
    const movie = await fetchMovieById(id);
    return movie;
  }
);

const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    clearMovie(state) {
      state.current = undefined;
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMovieById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        getMovieById.fulfilled,
        (state, action: PayloadAction<Movie>) => {
          state.current = action.payload;
          state.status = "idle";
        }
      )
      .addCase(getMovieById.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { clearMovie } = movieSlice.actions;
export default movieSlice.reducer;
