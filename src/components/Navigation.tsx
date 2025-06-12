
import { useState } from "react";
import { Search, Menu, X, Film, Home, Bookmark, User, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface NavigationProps {
  onSearch: (term: string) => void;
  searchTerm: string;
  watchlistCount?: number;
}

const Navigation = ({ onSearch, searchTerm, watchlistCount = 0 }: NavigationProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-lg border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Film className="w-8 h-8 text-purple-400" />
            <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
              MoviesCorn
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-white hover:text-purple-400 transition-colors flex items-center gap-2">
              <Home className="w-4 h-4" />
              Home
            </a>
            <a href="#" className="text-white hover:text-purple-400 transition-colors flex items-center gap-2">
              <Bookmark className="w-4 h-4" />
              Watchlist
              {watchlistCount > 0 && (
                <span className="bg-purple-500 text-white text-xs rounded-full px-2 py-1">
                  {watchlistCount}
                </span>
              )}
            </a>
            <a href="#" className="text-white hover:text-purple-400 transition-colors flex items-center gap-2">
              <User className="w-4 h-4" />
              Profile
            </a>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex relative max-w-md flex-1 mx-8">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              type="text"
              placeholder="Search movies, actors, directors..."
              value={searchTerm}
              onChange={(e) => onSearch(e.target.value)}
              className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-purple-400"
            />
          </div>

          {/* Settings */}
          <div className="hidden md:flex items-center">
            <Button variant="ghost" size="icon" className="text-white hover:text-purple-400">
              <Settings className="w-5 h-5" />
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden pb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              type="text"
              placeholder="Search movies..."
              value={searchTerm}
              onChange={(e) => onSearch(e.target.value)}
              className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-purple-400"
            />
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-black/50 rounded-lg mb-4">
              <a href="#" className="text-white hover:text-purple-400 block px-3 py-2 rounded-md transition-colors">
                Home
              </a>
              <a href="#" className="text-white hover:text-purple-400 block px-3 py-2 rounded-md transition-colors">
                Watchlist ({watchlistCount})
              </a>
              <a href="#" className="text-white hover:text-purple-400 block px-3 py-2 rounded-md transition-colors">
                Profile
              </a>
              <a href="#" className="text-white hover:text-purple-400 block px-3 py-2 rounded-md transition-colors">
                Settings
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
