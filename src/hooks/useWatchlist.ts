
import { useState, useEffect } from 'react';
import { Movie } from '@/types/movie';

export const useWatchlist = () => {
  const [watchlist, setWatchlist] = useState<Movie[]>([]);

  // Load watchlist from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('moviescorn-watchlist');
    if (saved) {
      try {
        setWatchlist(JSON.parse(saved));
      } catch (error) {
        console.error('Error loading watchlist:', error);
      }
    }
  }, []);


  useEffect(() => {
    localStorage.setItem('moviescorn-watchlist', JSON.stringify(watchlist));
  }, [watchlist]);
// Save watchlist to localStorage whenever it changes
  const addToWatchlist = (movie: Movie) => {
    setWatchlist(prev => {
      if (prev.some(item => item.id === movie.id)) {
        return prev; // Already in watchlist
      }
      return [...prev, movie];
    });  
  };

  const removeFromWatchlist = (movieId: number) => {
    setWatchlist(prev => prev.filter(item => item.id !== movieId));
  };

  const toggleWatchlist = (movie: Movie) => {
    if (isInWatchlist(movie.id)) {
      removeFromWatchlist(movie.id);
    } else {
      addToWatchlist(movie);
    }
  };

  const isInWatchlist = (movieId: number) => {
    return watchlist.some(item => item.id === movieId);
  };

  const clearWatchlist = () => {
    setWatchlist([]);
  };

  return {
    watchlist,
    addToWatchlist,
    removeFromWatchlist,
    toggleWatchlist,
    isInWatchlist,
    clearWatchlist,
    watchlistCount: watchlist.length
  };
};
