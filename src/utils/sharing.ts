
import { Movie } from '@/types/movie';

export const shareMovie = async (movie: Movie) => {
  const url = `${window.location.origin}/?movie=${movie.id}`;
  const title = `Check out "${movie.title}" on MoviesCorn`;
  const text = `${movie.title} (${movie.release_date?.split('-')[0]}) - ${movie.overview?.slice(0, 100)}...`;

  // Check if Web Share API is supported
  if (navigator.share) {
    try {
      await navigator.share({
        title,
        text,
        url
      });
      return true;
    } catch (error) {
      console.log('Error sharing:', error);
    }
  }

  // Fallback to clipboard
  try {
    await navigator.clipboard.writeText(`${title}\n${text}\n${url}`);
    return true;
  } catch (error) {
    console.error('Error copying to clipboard:', error);
    return false;
  }
};

export const shareToSocial = (movie: Movie, platform: 'twitter' | 'facebook' | 'reddit') => {
  const url = `${window.location.origin}/?movie=${movie.id}`;
  const title = `Check out "${movie.title}" on MoviesCorn`;
  const text = movie.overview?.slice(0, 100) + '...';

  const shareUrls = {
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    reddit: `https://reddit.com/submit?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`
  };

  window.open(shareUrls[platform], '_blank', 'width=600,height=400');
};
