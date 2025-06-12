
import { useState, useEffect } from "react";
import { Star, TrendingUp, Filter, Toast } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import MovieCard from "@/components/MovieCard";
import MovieModal from "@/components/MovieModal";
import HeroSection from "@/components/HeroSection";
import Navigation from "@/components/Navigation";
import { useMovies } from "@/hooks/useMovies";
import { useWatchlist } from "@/hooks/useWatchlist";
import { shareMovie } from "@/utils/sharing";
import { Movie } from "@/types/movie";

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("all");
  const [selectedYear, setSelectedYear] = useState("all");
  const [sortBy, setSortBy] = useState("popularity");
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [currentSection, setCurrentSection] = useState("all");
  
  const { movies, loading, error } = useMovies();
  const { 
    watchlist, 
    toggleWatchlist, 
    isInWatchlist, 
    watchlistCount 
  } = useWatchlist();
  const { toast } = useToast();

  const genres = ["Action", "Comedy", "Drama", "Horror", "Sci-Fi", "Romance", "Thriller", "Adventure", "Fantasy", "Crime"];
  const years = Array.from({ length: 30 }, (_, i) => 2024 - i);

  // Filter and sort movies
  const filteredMovies = movies?.filter(movie => {
    const matchesSearch = movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         movie.overview?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         movie.director?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         movie.cast?.some(actor => actor.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesGenre = selectedGenre === "all" || movie.genres?.includes(selectedGenre);
    const matchesYear = selectedYear === "all" || movie.release_date?.includes(selectedYear);
    
    if (currentSection === "watchlist") {
      return isInWatchlist(movie.id) && matchesSearch && matchesGenre && matchesYear;
    }
    
    return matchesSearch && matchesGenre && matchesYear;
  }).sort((a, b) => {
    switch (sortBy) {
      case "rating":
        return (b.vote_average || 0) - (a.vote_average || 0);
      case "year":
        return new Date(b.release_date || "").getTime() - new Date(a.release_date || "").getTime();
      case "title":
        return a.title.localeCompare(b.title);
      default:
        return 0;
    }
  }) || [];

  const featuredMovie = movies?.[0];
  const trendingMovies = movies?.slice(1, 11) || [];
  const popularMovies = movies?.slice(11, 21) || [];
  const topRatedMovies = movies?.filter(m => m.vote_average && m.vote_average >= 8.5).slice(0, 10) || [];

  const handleAddToWatchlist = (movie: Movie) => {
    toggleWatchlist(movie);
    toast({
      title: isInWatchlist(movie.id) ? "Removed from Watchlist" : "Added to Watchlist",
      description: isInWatchlist(movie.id) 
        ? `${movie.title} has been removed from your watchlist.`
        : `${movie.title} has been added to your watchlist.`,
    });
  };

  const handleShare = async (movie: Movie) => {
    const success = await shareMovie(movie);
    if (success) {
      toast({
        title: "Movie Shared!",
        description: `${movie.title} has been shared successfully.`,
      });
    } else {
      toast({
        title: "Share Failed",
        description: "Unable to share the movie. Please try again.",
        variant: "destructive"
      });
    }
  };

  // Handle URL parameters for direct movie access
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const movieId = urlParams.get('movie');
    if (movieId && movies) {
      const movie = movies.find(m => m.id === parseInt(movieId));
      if (movie) {
        setSelectedMovie(movie);
      }
    }
  }, [movies]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
        <div className="text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Oops! Something went wrong</h2>
          <p className="text-gray-300 mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 text-white">
      {/* Navigation */}
      <Navigation 
        onSearch={setSearchTerm}
        searchTerm={searchTerm}
        watchlistCount={watchlistCount}
      />

      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-4 -left-4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/3 -right-4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute -bottom-4 left-1/3 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Hero Section */}
      <div className="pt-16">
        {featuredMovie && currentSection === "all" && (
          <HeroSection movie={featuredMovie} onWatchTrailer={() => setSelectedMovie(featuredMovie)} />
        )}
      </div>

      {/* Main Content */}
      <div className="relative z-10 px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-7xl mx-auto">
          {/* Section Navigation */}
          <div className="flex flex-wrap gap-4 mb-8">
            <Button 
              variant={currentSection === "all" ? "default" : "outline"}
              onClick={() => setCurrentSection("all")}
              className="border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white"
            >
              All Movies
            </Button>
            <Button 
              variant={currentSection === "watchlist" ? "default" : "outline"}
              onClick={() => setCurrentSection("watchlist")}
              className="border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white"
            >
              My Watchlist ({watchlistCount})
            </Button>
          </div>

          {/* Filters */}
          <div className="bg-black/20 backdrop-blur-lg rounded-2xl p-6 mb-12 border border-white/10">
            <div className="flex flex-col lg:flex-row gap-4 items-center">
              <div className="flex gap-3 items-center flex-wrap">
                <Filter className="text-gray-400 w-5 h-5" />
                <Select value={selectedGenre} onValueChange={setSelectedGenre}>
                  <SelectTrigger className="w-40 bg-white/10 border-white/20 text-white">
                    <SelectValue placeholder="Genre" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 border-gray-700">
                    <SelectItem value="all">All Genres</SelectItem>
                    {genres.map(genre => (
                      <SelectItem key={genre} value={genre}>{genre}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <Select value={selectedYear} onValueChange={setSelectedYear}>
                  <SelectTrigger className="w-32 bg-white/10 border-white/20 text-white">
                    <SelectValue placeholder="Year" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 border-gray-700 max-h-60">
                    <SelectItem value="all">All Years</SelectItem>
                    {years.map(year => (
                      <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40 bg-white/10 border-white/20 text-white">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 border-gray-700">
                    <SelectItem value="popularity">Popularity</SelectItem>
                    <SelectItem value="rating">Rating</SelectItem>
                    <SelectItem value="year">Release Year</SelectItem>
                    <SelectItem value="title">Title</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Movie Sections */}
          {currentSection === "all" && (
            <>
              {/* Trending Section */}
              {trendingMovies.length > 0 && (
                <section className="mb-12">
                  <div className="flex items-center gap-3 mb-6">
                    <TrendingUp className="w-6 h-6 text-yellow-400" />
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                      Trending Now
                    </h2>
                  </div>
                  <div className="flex gap-6 overflow-x-auto pb-4 scroll-smooth">
                    {trendingMovies.map((movie, index) => (
                      <div key={movie.id} className="flex-shrink-0 w-80">
                        <MovieCard 
                          movie={movie} 
                          onClick={() => setSelectedMovie(movie)}
                          className="hover:scale-105 transition-all duration-300"
                          rank={index + 1}
                          onAddToWatchlist={handleAddToWatchlist}
                          onShare={handleShare}
                          isInWatchlist={isInWatchlist(movie.id)}
                        />
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Top Rated Section */}
              {topRatedMovies.length > 0 && (
                <section className="mb-12">
                  <div className="flex items-center gap-3 mb-6">
                    <Star className="w-6 h-6 text-yellow-400" />
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                      Top Rated
                    </h2>
                  </div>
                  <div className="flex gap-6 overflow-x-auto pb-4 scroll-smooth">
                    {topRatedMovies.map((movie) => (
                      <div key={movie.id} className="flex-shrink-0 w-80">
                        <MovieCard 
                          movie={movie} 
                          onClick={() => setSelectedMovie(movie)}
                          className="hover:scale-105 transition-all duration-300"
                          onAddToWatchlist={handleAddToWatchlist}
                          onShare={handleShare}
                          isInWatchlist={isInWatchlist(movie.id)}
                        />
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Popular Section */}
              {popularMovies.length > 0 && (
                <section className="mb-12">
                  <div className="flex items-center gap-3 mb-6">
                    <Star className="w-6 h-6 text-purple-400" />
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                      Popular Movies
                    </h2>
                  </div>
                  <div className="flex gap-6 overflow-x-auto pb-4 scroll-smooth">
                    {popularMovies.map((movie) => (
                      <div key={movie.id} className="flex-shrink-0 w-80">
                        <MovieCard 
                          movie={movie} 
                          onClick={() => setSelectedMovie(movie)}
                          className="hover:scale-105 transition-all duration-300"
                          onAddToWatchlist={handleAddToWatchlist}
                          onShare={handleShare}
                          isInWatchlist={isInWatchlist(movie.id)}
                        />
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </>
          )}

          {/* All Movies Grid / Watchlist */}
          <section>
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              {currentSection === "watchlist" ? "My Watchlist" : 
               searchTerm || selectedGenre !== "all" || selectedYear !== "all" ? "Search Results" : "All Movies"}
              <span className="text-lg text-gray-400 ml-3">({filteredMovies.length})</span>
            </h2>
            
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {Array(12).fill(0).map((_, i) => (
                  <div key={i} className="bg-white/10 rounded-lg h-96 animate-pulse"></div>
                ))}
              </div>
            ) : filteredMovies.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredMovies.map((movie) => (
                  <MovieCard 
                    key={movie.id} 
                    movie={movie} 
                    onClick={() => setSelectedMovie(movie)}
                    className="hover:scale-105 transition-all duration-300"
                    onAddToWatchlist={handleAddToWatchlist}
                    onShare={handleShare}
                    isInWatchlist={isInWatchlist(movie.id)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-400 text-lg mb-4">
                  {currentSection === "watchlist" 
                    ? "Your watchlist is empty. Start adding some movies!"
                    : "No movies found matching your criteria"
                  }
                </div>
                <Button 
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedGenre("all");
                    setSelectedYear("all");
                    setCurrentSection("all");
                  }}
                  variant="outline"
                  className="border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white"
                >
                  {currentSection === "watchlist" ? "Browse Movies" : "Clear Filters"}
                </Button>
              </div>
            )}
          </section>
        </div>
      </div>

      {/* Movie Modal */}
      {selectedMovie && (
        <MovieModal 
          movie={selectedMovie} 
          isOpen={!!selectedMovie}
          onClose={() => setSelectedMovie(null)}
          onAddToWatchlist={handleAddToWatchlist}
          onShare={handleShare}
          isInWatchlist={isInWatchlist(selectedMovie.id)}
        />
      )}
    </div>
  );
};

export default Index;
