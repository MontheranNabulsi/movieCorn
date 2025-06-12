
import { useState } from "react";
import { Play, Info, Star, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Movie } from "@/types/movie";

interface HeroSectionProps {
  movie: Movie;
  onWatchTrailer: () => void;
}

const HeroSection = ({ movie, onWatchTrailer }: HeroSectionProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const backdropUrl = movie.backdrop_path 
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : `https://images.unsplash.com/photo-1489599511996-1a1fb77fd59e?w=1920&h=1080&fit=crop&crop=center`;

  const year = movie.release_date ? new Date(movie.release_date).getFullYear() : "N/A";
  const rating = movie.vote_average ? (movie.vote_average / 2).toFixed(1) : "N/A";

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Background Image with Parallax Effect */}
      <div className="absolute inset-0">
        <img
          src={backdropUrl}
          alt={movie.title}
          className={`w-full h-full object-cover scale-110 transition-all duration-1000 ${
            imageLoaded ? 'opacity-100 scale-105' : 'opacity-0 scale-110'
          }`}
          onLoad={() => setImageLoaded(true)}
        />
        
        {/* Loading skeleton */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 animate-pulse" />
        )}
      </div>

      {/* Cinematic Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
      
      {/* Animated particles */}
      <div className="absolute inset-0">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            {/* Featured Badge */}
            <Badge className="mb-4 bg-gradient-to-r from-red-500 to-purple-600 text-white border-none text-sm px-4 py-2">
              Featured Movie
            </Badge>

            {/* Title with Animation */}
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent animate-fade-in">
              {movie.title}
            </h1>

            {/* Movie Meta */}
            <div className="flex items-center gap-6 mb-6 text-gray-300">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span className="text-lg">{year}</span>
              </div>
              
              {movie.vote_average && (
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <span className="text-lg text-yellow-300">{rating}/5</span>
                </div>
              )}

              {movie.genres && movie.genres.length > 0 && (
                <div className="flex gap-2">
                  {movie.genres.slice(0, 3).map((genre) => (
                    <Badge 
                      key={genre} 
                      variant="outline" 
                      className="border-white/30 text-white hover:bg-white/10"
                    >
                      {genre}
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            {/* Description */}
            {movie.overview && (
              <p className="text-lg sm:text-xl text-gray-200 mb-8 leading-relaxed max-w-2xl line-clamp-3">
                {movie.overview}
              </p>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-red-600 to-purple-600 hover:from-red-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105"
                onClick={onWatchTrailer}
              >
                <Play className="w-6 h-6 mr-2 fill-current" />
                Watch Trailer
              </Button>
              
              <Button 
                size="lg"
                variant="outline" 
                className="border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg backdrop-blur-sm transition-all duration-300 hover:scale-105"
                onClick={onWatchTrailer}
              >
                <Info className="w-6 h-6 mr-2" />
                More Info
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/60 animate-bounce">
        <div className="flex flex-col items-center gap-2">
          <span className="text-sm">Scroll to explore</span>
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
