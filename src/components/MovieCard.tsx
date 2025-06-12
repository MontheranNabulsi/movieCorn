
import { useState } from "react";
import { Star, Calendar, Play, Info, Heart, Share2, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Movie } from "@/types/movie";

interface MovieCardProps {
  movie: Movie;
  onClick: () => void;
  className?: string;
  rank?: number;
  onAddToWatchlist?: (movie: Movie) => void;
  onShare?: (movie: Movie) => void;
  isInWatchlist?: boolean;
}

const MovieCard = ({ 
  movie, 
  onClick, 
  className = "", 
  rank,
  onAddToWatchlist,
  onShare,
  isInWatchlist = false
}: MovieCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const posterUrl = movie.poster_path 
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : `https://images.unsplash.com/photo-1489599511996-1a1fb77fd59e?w=500&h=750&fit=crop&crop=center`;

  const year = movie.release_date ? new Date(movie.release_date).getFullYear() : "N/A";
  const rating = movie.vote_average ? (movie.vote_average / 2).toFixed(1) : "N/A";
  const runtime = movie.runtime ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m` : null;

  const handleWatchlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToWatchlist?.(movie);
  };

  const handleShareClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onShare?.(movie);
  };

  return (
    <Card 
      className={`group relative overflow-hidden bg-gradient-to-br from-gray-800/50 to-gray-900/50 border-gray-700/50 hover:border-purple-400/50 transition-all duration-500 cursor-pointer backdrop-blur-sm ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <CardContent className="p-0 relative">
        {/* Rank Badge */}
        {rank && (
          <div className="absolute top-3 left-3 z-20 bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-sm font-bold px-2 py-1 rounded-full shadow-lg">
            #{rank}
          </div>
        )}

        {/* Watchlist Badge */}
        {isInWatchlist && (
          <div className="absolute top-3 right-3 z-20 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
            Watchlisted
          </div>
        )}

        {/* Movie Poster */}
        <div className="relative aspect-[2/3] overflow-hidden">
          <img
            src={posterUrl}
            alt={movie.title}
            className={`w-full h-full object-cover transition-all duration-700 ${
              isHovered ? 'scale-110 brightness-75' : 'scale-100'
            } ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => setImageLoaded(true)}
            loading="lazy"
          />
          
          {/* Loading skeleton */}
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-800 animate-pulse" />
          )}

          {/* Hover overlay with action buttons */}
          <div className={`absolute inset-0 bg-black/60 flex items-center justify-center transition-all duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}>
            <div className="flex flex-col gap-3">
              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  className="bg-white/20 hover:bg-white/30 backdrop-blur-sm border-white/30"
                  onClick={(e) => {
                    e.stopPropagation();
                    onClick();
                  }}
                >
                  <Play className="w-4 h-4 mr-1" />
                  Watch
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10"
                  onClick={(e) => {
                    e.stopPropagation();
                    onClick();
                  }}
                >
                  <Info className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  variant="outline"
                  className={`border-white/30 text-white hover:bg-white/10 ${
                    isInWatchlist ? 'bg-purple-500/50' : ''
                  }`}
                  onClick={handleWatchlistClick}
                >
                  <Heart className={`w-4 h-4 ${isInWatchlist ? 'fill-current' : ''}`} />
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10"
                  onClick={handleShareClick}
                >
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Quality Badge */}
          {movie.vote_average && movie.vote_average >= 8 && (
            <div className="absolute top-3 right-3 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              HD
            </div>
          )}

          {/* Gradient overlay for text readability */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        </div>

        {/* Movie Info */}
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-purple-300 transition-colors">
            {movie.title}
          </h3>
          
          <div className="flex items-center justify-between text-sm mb-2">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gray-400" />
              <span className="text-gray-300">{year}</span>
            </div>
            
            {movie.vote_average && (
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="text-yellow-300 font-medium">{rating}</span>
              </div>
            )}
          </div>

          {/* Runtime */}
          {runtime && (
            <div className="flex items-center gap-1 text-xs text-gray-400 mb-2">
              <Clock className="w-3 h-3" />
              <span>{runtime}</span>
            </div>
          )}

          {/* Genres */}
          {movie.genres && movie.genres.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {movie.genres.slice(0, 2).map((genre) => (
                <Badge 
                  key={genre} 
                  variant="secondary" 
                  className="text-xs bg-white/20 text-white border-white/30"
                >
                  {genre}
                </Badge>
              ))}
            </div>
          )}
        </div>

        {/* Shimmer effect on hover */}
        <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform skew-x-12 transition-transform duration-1000 ${
          isHovered ? 'translate-x-full' : '-translate-x-full'
        }`} />
      </CardContent>
    </Card>
  );
};

export default MovieCard;
