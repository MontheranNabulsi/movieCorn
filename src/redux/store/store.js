import { configureStore } from '@reduxjs/toolkit';
import moviesReducer from '../reducers/movieReducer';

const store = configureStore({
  reducer: {
    movies: moviesReducer
  }
});

export default store;
