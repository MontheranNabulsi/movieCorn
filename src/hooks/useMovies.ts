import { useState, useEffect } from 'react';
import { Movie } from '@/types/movie';

export const useMovies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        
        // Mock data for the movie platform
        const mockMovies: Movie[] = [
          {
            id: 1,
            title: "Inception",
            overview: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
            poster_path: "/qmDpIHrmpJINaRKAfWQfftjCdyi.jpg",
            backdrop_path: "/s3TBrRGB1iav7gFOCNx3H31MoES.jpg",
            release_date: "2010-07-16",
            vote_average: 8.8,
            genres: ["Action", "Sci-Fi", "Thriller"],
            runtime: 148,
            director: "Christopher Nolan",
            cast: ["Leonardo DiCaprio", "Marion Cotillard", "Tom Hardy"],
            production_companies: ["Warner Bros.", "Legendary Entertainment"]
          },
          {
            id: 2,
            title: "The Dark Knight",
            overview: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
            poster_path: "/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
            backdrop_path: "/hqkIcbrOHL86UncnHIsHVcVmzue.jpg",
            release_date: "2008-07-18",
            vote_average: 9.0,
            genres: ["Action", "Crime", "Drama"],
            runtime: 152,
            director: "Christopher Nolan",
            cast: ["Christian Bale", "Heath Ledger", "Aaron Eckhart"],
            production_companies: ["Warner Bros.", "DC Comics"]
          },
          {
            id: 3,
            title: "Interstellar",
            overview: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
            poster_path: "/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
            backdrop_path: "/xu9zaAevzQ5nnrsXN6JcahLnG4i.jpg",
            release_date: "2014-11-07",
            vote_average: 8.6,
            genres: ["Adventure", "Drama", "Sci-Fi"],
            runtime: 169,
            director: "Christopher Nolan",
            cast: ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain"],
            production_companies: ["Paramount Pictures", "Warner Bros."]
          },
          {
            id: 4,
            title: "The Matrix",
            overview: "A computer programmer is led to fight an underground war against powerful computers who have constructed his entire reality with a system called the Matrix.",
            poster_path: "/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
            backdrop_path: "/fNG7i7RqMErkcqhohV2a6cV1Ehy.jpg",
            release_date: "1999-03-31",
            vote_average: 8.7,
            genres: ["Action", "Sci-Fi"],
            runtime: 136,
            director: "The Wachowskis",
            cast: ["Keanu Reeves", "Laurence Fishburne", "Carrie-Anne Moss"],
            production_companies: ["Warner Bros.", "Village Roadshow Pictures"]
          },
          {
            id: 5,
            title: "Pulp Fiction",
            overview: "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
            poster_path: "/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg",
            backdrop_path: "/4cDFJr4HnXN5AdPw4AKrmLlMWdO.jpg",
            release_date: "1994-10-14",
            vote_average: 8.9,
            genres: ["Crime", "Drama"],
            runtime: 154,
            director: "Quentin Tarantino",
            cast: ["John Travolta", "Uma Thurman", "Samuel L. Jackson"],
            production_companies: ["Miramax Films", "A Band Apart"]
          },
          {
            id: 6,
            title: "Avatar",
            overview: "A paraplegic Marine dispatched to the moon Pandora on a unique mission becomes torn between following his orders and protecting the world he feels is his home.",
            poster_path: "/jRXYjXNq0Cs2TcJjLkki24MLp7u.jpg",
            backdrop_path: "/Yc9q6QuWrMp9nuDm5R8ExNqbEWU.jpg",
            release_date: "2009-12-18",
            vote_average: 7.8,
            genres: ["Action", "Adventure", "Fantasy", "Sci-Fi"],
            runtime: 162,
            director: "James Cameron",
            cast: ["Sam Worthington", "Zoe Saldana", "Sigourney Weaver"],
            production_companies: ["20th Century Fox", "Lightstorm Entertainment"]
          },
          {
            id: 7,
            title: "The Godfather",
            overview: "An organized crime dynasty's aging patriarch transfers control of his clandestine empire to his reluctant son.",
            poster_path: "/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
            backdrop_path: "/tmU7GeKVybMWFButWEGl2M4GeiP.jpg",
            release_date: "1972-03-24",
            vote_average: 9.2,
            genres: ["Crime", "Drama"],
            runtime: 175,
            director: "Francis Ford Coppola",
            cast: ["Marlon Brando", "Al Pacino", "James Caan"],
            production_companies: ["Paramount Pictures", "Alfran Productions"]
          },
          {
            id: 8,
            title: "Titanic",
            overview: "A seventeen-year-old aristocrat falls in love with a kind but poor artist aboard the luxurious, ill-fated R.M.S. Titanic.",
            poster_path: "/9xjZS2rlVxm8SFx8kPC3aIGCOYQ.jpg",
            backdrop_path: "/fVQeZIhus4d5r1LK1BjOuqKYhfE.jpg",
            release_date: "1997-12-19",
            vote_average: 7.9,
            genres: ["Drama", "Romance"],
            runtime: 194,
            director: "James Cameron",
            cast: ["Leonardo DiCaprio", "Kate Winslet", "Billy Zane"],
            production_companies: ["20th Century Fox", "Paramount Pictures"]
          },
          {
            id: 9,
            title: "The Shawshank Redemption",
            overview: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
            poster_path: "/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg",
            backdrop_path: "/j9XKiZrVeaIzCDqGUsb3y7SRdLp.jpg",
            release_date: "1994-09-23",
            vote_average: 9.3,
            genres: ["Drama"],
            runtime: 142,
            director: "Frank Darabont",
            cast: ["Tim Robbins", "Morgan Freeman", "Bob Gunton"],
            production_companies: ["Columbia Pictures", "Castle Rock Entertainment"]
          },
          {
            id: 10,
            title: "Forrest Gump",
            overview: "The presidencies of Kennedy and Johnson, the events of Vietnam, Watergate and other historical events unfold from the perspective of an Alabama man with an IQ of 75.",
            poster_path: "/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg",
            backdrop_path: "/7c8oTLGqVdpZ0e3r2FpW4JFIHkA.jpg",
            release_date: "1994-07-06",
            vote_average: 8.8,
            genres: ["Drama", "Romance"],
            runtime: 142,
            director: "Robert Zemeckis",
            cast: ["Tom Hanks", "Robin Wright", "Gary Sinise"],
            production_companies: ["Paramount Pictures", "The Steve Tisch Company"]
          },
          {
            id: 11,
            title: "The Lord of the Rings: The Return of the King",
            overview: "Gandalf and Aragorn lead the World of Men against Sauron's army to draw his gaze from Frodo and Sam as they approach Mount Doom with the One Ring.",
            poster_path: "/rCzpDGLbOoPwLjy3OAm5NUPOTrC.jpg",
            backdrop_path: "/2u7zbn8EudG6kLlBzUYqP8RyFU4.jpg",
            release_date: "2003-12-17",
            vote_average: 9.0,
            genres: ["Action", "Adventure", "Drama", "Fantasy"],
            runtime: 201,
            director: "Peter Jackson",
            cast: ["Elijah Wood", "Viggo Mortensen", "Ian McKellen"],
            production_companies: ["New Line Cinema", "WingNut Films"]
          },
          {
            id: 12,
            title: "Fight Club",
            overview: "An insomniac office worker and a devil-may-care soapmaker form an underground fight club that evolves into an anarchist organization.",
            poster_path: "/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg",
            backdrop_path: "/hZkgoQYus5vegHoetLkCJzb17zJ.jpg",
            release_date: "1999-10-15",
            vote_average: 8.8,
            genres: ["Drama"],
            runtime: 139,
            director: "David Fincher",
            cast: ["Brad Pitt", "Edward Norton", "Helena Bonham Carter"],
            production_companies: ["20th Century Fox", "Regency Enterprises"]
          }
        ];

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setMovies(mockMovies);
        setError(null);
      } catch (err) {
        console.error('Error fetching movies:', err);
        setError('Failed to fetch movies. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  return { movies, loading, error };
};
