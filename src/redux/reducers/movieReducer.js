import { createSlice } from '@reduxjs/toolkit';

const initialState = { movies: [], pageCount: 0 };

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    setMovies(state, action) {
      // action.payload will hold { movies, pageCount }
      state.movies = action.payload.movies;
      state.pageCount = action.payload.pageCount;
    }
  }
});

export const { setMovies } = moviesSlice.actions;
export default moviesSlice.reducer;
