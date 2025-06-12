
import { X, Star, Calendar, Clock, Play, Heart, Share, Download, Users, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Movie } from "@/types/movie";

interface MovieModalProps {
  movie: Movie;
  isOpen: boolean;
  onClose: () => void;
  onAddToWatchlist?: (movie: Movie) => void;
  onShare?: (movie: Movie) => void;
  isInWatchlist?: boolean;
}

const MovieModal = ({ 
  movie, 
  isOpen, 
  onClose, 
  onAddToWatchlist,
  onShare,
  isInWatchlist = false 
}: MovieModalProps) => {
  const backdropUrl = movie.backdrop_path 
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : `https://images.unsplash.com/photo-1489599511996-1a1fb77fd59e?w=1920&h=1080&fit=crop&crop=center`;

  const posterUrl = movie.poster_path 
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : `https://images.unsplash.com/photo-1489599511996-1a1fb77fd59e?w=500&h=750&fit=crop&crop=center`;

  const year = movie.release_date ? new Date(movie.release_date).getFullYear() : "N/A";
  const rating = movie.vote_average ? (movie.vote_average / 2).toFixed(1) : "N/A";
  const runtime = movie.runtime ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m` : "N/A";

  const handleWatchlistClick = () => {
    onAddToWatchlist?.(movie);
  };

  const handleShareClick = () => {
    onShare?.(movie);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-full h-[90vh] p-0 bg-gray-900 border-gray-700 overflow-hidden">
        <div className="relative h-full overflow-y-auto">
          {/* Header with backdrop */}
          <div className="relative h-64 sm:h-80">
            <img
              src={backdropUrl}
              alt={movie.title}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent" />
            
            {/* Close button */}
            <Button
              onClick={onClose}
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white rounded-full"
            >
              <X className="w-5 h-5" />
            </Button>

            {/* Quality/Rating Badge */}
            {movie.vote_average && movie.vote_average >= 8 && (
              <div className="absolute top-4 left-4 bg-green-500 text-white text-sm font-bold px-3 py-1 rounded-full flex items-center gap-1">
                <Award className="w-4 h-4" />
                Top Rated
              </div>
            )}

            {/* Movie poster and basic info overlay */}
            <div className="absolute bottom-4 left-4 right-4 flex gap-4">
              <img
                src={posterUrl}
                alt={movie.title}
                className="w-24 h-36 sm:w-32 sm:h-48 object-cover rounded-lg shadow-2xl border-2 border-white/20"
                loading="lazy"
              />
              
              <div className="flex-1 text-white">
                <h1 className="text-2xl sm:text-3xl font-bold mb-2">{movie.title}</h1>
                
                <div className="flex items-center gap-4 mb-3 text-sm flex-wrap">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{year}</span>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{runtime}</span>
                  </div>
                  
                  {movie.vote_average && (
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-yellow-300 font-bold">{rating}/5</span>
                    </div>
                  )}
                </div>

                {/* Genres */}
                {movie.genres && movie.genres.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {movie.genres.map((genre) => (
                      <Badge 
                        key={genre} 
                        variant="secondary" 
                        className="bg-white/20 text-white border-white/30 text-xs"
                      >
                        {genre}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 text-white">
            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 mb-6">
              <Button className="bg-gradient-to-r from-red-600 to-purple-600 hover:from-red-700 hover:to-purple-700">
                <Play className="w-4 h-4 mr-2 fill-current" />
                Watch Trailer
              </Button>
              <Button 
                variant="outline" 
                className={`border-gray-600 text-white hover:bg-gray-800 ${
                  isInWatchlist ? 'bg-purple-600/20 border-purple-400' : ''
                }`}
                onClick={handleWatchlistClick}
              >
                <Heart className={`w-4 h-4 mr-2 ${isInWatchlist ? 'fill-current text-purple-400' : ''}`} />
                {isInWatchlist ? 'In Watchlist' : 'Add to Watchlist'}
              </Button>
              <Button 
                variant="outline" 
                className="border-gray-600 text-white hover:bg-gray-800"
                onClick={handleShareClick}
              >
                <Share className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button variant="outline" className="border-gray-600 text-white hover:bg-gray-800">
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
            </div>

            {/* Overview */}
            {movie.overview && (
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-3 text-purple-300">Overview</h2>
                <p className="text-gray-300 leading-relaxed text-lg">{movie.overview}</p>
              </div>
            )}

            <Separator className="my-6 bg-gray-700" />

            {/* Movie Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Director */}
              {movie.director && (
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-purple-300 flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Director
                  </h3>
                  <p className="text-gray-300 text-lg">{movie.director}</p>
                </div>
              )}

              {/* Cast */}
              {movie.cast && movie.cast.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-purple-300 flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Cast
                  </h3>
                  <p className="text-gray-300">{movie.cast.slice(0, 5).join(", ")}</p>
                  {movie.cast.length > 5 && (
                    <span className="text-purple-400 text-sm">+{movie.cast.length - 5} more</span>
                  )}
                </div>
              )}

              {/* Production Companies */}
              {movie.production_companies && movie.production_companies.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-purple-300">Production</h3>
                  <p className="text-gray-300">{movie.production_companies.slice(0, 3).join(", ")}</p>
                </div>
              )}

              {/* Additional Info */}
              <div>
                <h3 className="text-lg font-semibold mb-2 text-purple-300">Details</h3>
                <div className="space-y-2 text-gray-300">
                  <p><span className="text-purple-400">Release:</span> {movie.release_date || "N/A"}</p>
                  <p><span className="text-purple-400">Runtime:</span> {runtime}</p>
                  <p><span className="text-purple-400">Rating:</span> {rating}/5 ⭐</p>
                  {movie.vote_average && (
                    <p><span className="text-purple-400">TMDB Score:</span> {movie.vote_average.toFixed(1)}/10</p>
                  )}
                </div>
              </div>
            </div>

            {/* Stats Section */}
            <Separator className="my-6 bg-gray-700" />
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">{rating}</div>
                <div className="text-sm text-gray-400">User Rating</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">{year}</div>
                <div className="text-sm text-gray-400">Release Year</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">{movie.runtime || "N/A"}</div>
                <div className="text-sm text-gray-400">Minutes</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">{movie.genres?.length || 0}</div>
                <div className="text-sm text-gray-400">Genres</div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MovieModal;
