import axios from 'axios';
import { setMovies } from '../reducers/movieReducer';

const API_KEY = '355f3cc55c1a5f8fb6f7b79d7541faea';
const BASE_URL = 'https://api.themoviedb.org/3';

export const getAllMovie = () => async (dispatch) => {
  try {
    const res = await axios.get(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=ar`);
    dispatch(setMovies({ movies: res.data.results, pageCount: res.data.total_pages }));
  } catch (error) {
    console.error('Failed to fetch popular movies:', error);
  }
};

export const getMovieSearch = (word) => async (dispatch) => {
  try {
    const res = await axios.get(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${word}&language=ar`);
    dispatch(setMovies({ movies: res.data.results, pageCount: res.data.total_pages }));
  } catch (error) {
    console.error('Failed to search movies:', error);
  }
};

export const getPage = (page) => async (dispatch) => {
  try {
    const res = await axios.get(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=ar&page=${page}`);
    dispatch(setMovies({ movies: res.data.results, pageCount: res.data.total_pages }));
  } catch (error) {
    console.error('Failed to fetch movies for page:', error);
  }
};
