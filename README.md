
# 🎬 MovieCorn - Professional Cinema Discovery Platform

A modern, responsive web application for discovering and exploring movies with an intuitive user interface and comprehensive movie database.



## 🌟 Features

### 🎯 Core Functionality
- **Comprehensive Movie Database**: Browse thousands of movies with detailed information.
- **Advanced Search & Filtering**: Search by title, director, cast, genre, year, and rating.
- **Personal Watchlist**: Save movies to watch later with persistent storage.
- **Detailed Movie Information**: Cast, crew, ratings, runtime, genres, and plot summaries.
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices.

### 🎨 User Interface
- **Cinematic Hero Section**: Featured movie with immersive backdrop display
- **Interactive Movie Cards**: Hover effects with quick action buttons
- **Professional Navigation**: Fixed header with search and user options
- **Modal Details**: Full-screen movie details with comprehensive information
- **Dark Theme**: Cinema-inspired dark interface with purple accent colors

### 📱 User Experience
- **Social Sharing**: Share movies via Web Share API or clipboard
- **Sorting Options**: Sort by popularity, rating, release year, or title
- **Categorized Sections**: Trending, Top Rated, and Popular movie collections
- **Local Storage**: Persistent watchlist across browser sessions
- **Performance Optimized**: Lazy loading images and efficient rendering

## 🚀 Technology Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and building
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: Shadcn/UI component library
- **Icons**: Lucide React icon set
- **State Management**: React hooks with localStorage persistence
- **Data Fetching**: Custom hooks with loading and error states

## 📦 Installation & Setup

### Prerequisites
- Node.js 16.x or higher
- npm or yarn package manager

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/MontheranNabulsi/movieCorn.git
   cd movieCorn
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173
   ```

### Build for Production

```bash
# Build the application
npm run build

# Preview the production build
npm run preview
```

## 🏗️ Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── ui/              # Shadcn/UI base components
│   ├── MovieCard.tsx    # Individual movie display card
│   ├── HeroSection.tsx  # Featured movie hero section
│   ├── MovieModal.tsx   # Detailed movie information modal
│   └── Navigation.tsx   # Main navigation component
├── hooks/               # Custom React hooks
│   ├── useMovies.ts     # Movie data management
│   └── useWatchlist.ts  # Watchlist functionality
├── pages/               # Application pages
│   └── Index.tsx        # Main application page
├── types/               # TypeScript type definitions
│   └── movie.ts         # Movie interface definitions
├── utils/               # Utility functions
│   └── sharing.ts       # Social sharing functionality
└── lib/                 # Library configurations
```

## 🎯 Key Components

### MovieCard Component
- Interactive movie poster with hover effects
- Quick action buttons (Watch, Add to Watchlist, Share)
- Rating display with stars
- Genre badges and runtime information
- Responsive design for all screen sizes

### HeroSection Component
- Full-width featured movie display
- Cinematic backdrop with overlay effects
- Call-to-action buttons
- Animated background elements
- Scroll indicator for user guidance

### Navigation Component
- Fixed header with transparent backdrop
- Integrated search functionality
- Responsive mobile menu
- Watchlist counter
- Professional branding

### MovieModal Component
- Comprehensive movie details
- Social sharing integration
- Watchlist management
- Production information
- Cast and crew details

## 🔧 Configuration

### Environment Variables
No environment variables required for basic functionality. The application uses static movie data for demonstration purposes.

### Customization
- **Colors**: Modify the color scheme in `tailwind.config.ts`
- **Fonts**: Update font families in `tailwind.config.ts`
- **Animations**: Customize animations in the config file
- **Movie Data**: Replace mock data in `hooks/useMovies.ts` with API integration

## 📊 Performance Features

- **Lazy Loading**: Images load only when visible
- **Code Splitting**: Optimized bundle sizes
- **Responsive Images**: Multiple image sizes for different devices
- **Efficient Rendering**: Minimized re-renders with proper state management
- **Caching**: Browser caching for static assets

## 🌐 Browser Support

- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)

## 📱 Mobile Responsiveness

- **Mobile-First Design**: Optimized for mobile devices
- **Touch-Friendly**: Large touch targets and smooth interactions
- **Adaptive Layout**: Grid system adjusts to screen size
- **Performance**: Optimized for mobile networks

## 🔄 Future Enhancements

- [ ] Real movie API integration (TMDB, OMDB)
- [ ] User authentication and profiles
- [ ] Movie recommendations algorithm
- [ ] Review and rating system
- [ ] Advanced filtering options
- [ ] Streaming platform integration
- [ ] Offline functionality with PWA

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.


## 🙏 Acknowledgments

- Movie data and images from The Movie Database (TMDB)
- UI components from Shadcn/UI
- Icons from Lucide React
- Background images from Unsplash

---
