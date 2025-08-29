import React, { useEffect, useState } from "react";
import {
  getPopularMovies,
  getMovieTrailer,
  searchMovies,
} from "../services/tmdb";
import MovieCard from "../Components/MovieCard"; // Import the separated MovieCard
import logo from "../assets/images/FilmGoFavicon.jpg";
import FilmGoFooter from "../Components/Footer";
import MovieLoader from "../Components/Loader";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [heroMovies, setHeroMovies] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const data = await getPopularMovies();
        setMovies(data);
        setHeroMovies(data.slice(0, 5));
        setIsLoading(false);
      } catch (error) {
        console.error("Error loading movies:", error);
        setIsLoading(false);
      }
    };
    loadMovies();
  }, []);

  useEffect(() => {
    if (heroMovies.length > 0) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % heroMovies.length);
      }, 6000);
      return () => clearInterval(interval);
    }
  }, [heroMovies]);

  const handleTrailer = async (id) => {
    const url = await getMovieTrailer(id);
    if (url) window.open(url, "_blank");
    else alert("Trailer not available");
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    setIsLoading(true);
    try {
      const results = await searchMovies(query);
      setMovies(results);
    } catch (error) {
      console.error("Search error:", error);
    }
    setIsLoading(false);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  if (isLoading) {
    return (
      <MovieLoader/>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Premium Navigation */}
      <nav className="absolute top-0 left-0 right-0 z-50 px-6 py-4 bg-gradient-to-b from-black/80 to-transparent">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
              🎬 FilmGo
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <img src={logo} alt="FilmGo Logo" className="w-8 h-8 rounded-full" />
          </div>
        </div>
      </nav>

      {/* Premium Hero Section */}
      <div className="relative h-screen">
        {heroMovies.map((movie, index) => (
          <div
            key={movie.id}
            className={`absolute inset-0 transition-all duration-1500 ease-in-out ${
              index === currentSlide
                ? "opacity-100 scale-100"
                : "opacity-0 scale-105"
            }`}
          >
            {/* Background with Parallax Effect */}
            <div className="absolute inset-0 overflow-hidden">
              <div
                className="absolute inset-0 bg-cover bg-center transform scale-110 transition-transform duration-[6000ms]"
                style={{
                  backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
                  filter: "brightness(0.4) contrast(1.2)",
                }}
              />
              {/* Premium Gradient Overlays */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30"></div>
            </div>

            {/* Hero Content */}
            <div className="relative z-20 flex items-center h-full px-6 md:px-16">
              <div className="max-w-3xl animate-fadeInUp">
                <div className="mb-4">
                  <span className="inline-block px-3 py-1 bg-red-600/20 border border-red-500/30 rounded-full text-red-400 text-sm font-semibold backdrop-blur-sm">
                    #1 in Movies Today
                  </span>
                </div>

                <h1 className="text-4xl md:text-7xl font-black mb-6 leading-none bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
                  {movie.title}
                </h1>

                <p className="text-lg md:text-xl mb-8 text-gray-200 leading-relaxed max-w-2xl font-light">
                  {movie.overview.length > 200
                    ? movie.overview.substring(0, 200) + "..."
                    : movie.overview}
                </p>

                <div className="flex items-center gap-6 mb-10">
                  <div className="flex items-center gap-2">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          className={
                            i < Math.floor(movie.vote_average / 2)
                              ? "text-yellow-400"
                              : "text-gray-600"
                          }
                        >
                          ★
                        </span>
                      ))}
                    </div>
                    <span className="text-white font-semibold text-lg">
                      {movie.vote_average.toFixed(1)}
                    </span>
                  </div>
                  <div className="h-6 w-px bg-gray-600"></div>
                  <span className="text-gray-300 font-medium">
                    {new Date(movie.release_date).getFullYear()}
                  </span>
                  <div className="h-6 w-px bg-gray-600"></div>
                  <span className="px-3 py-1 bg-gray-800/50 rounded-full text-sm font-medium border border-gray-700">
                    HD
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={() => handleTrailer(movie.id)}
                    className="group relative px-8 py-4 bg-white text-black font-bold text-lg rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                  >
                    <span className="relative z-10 flex items-center gap-3">
                      <svg
                        className="w-6 h-6"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                      Play Trailer
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Premium Slide Indicators */}
        <div className="absolute bottom-12 left-6 md:left-16 flex gap-4 z-30">
          {heroMovies.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`relative h-1 rounded-full transition-all duration-500 ${
                index === currentSlide
                  ? "w-12 bg-white"
                  : "w-6 bg-gray-500 hover:bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Premium Search Section */}
      <div className="relative z-10 px-6 md:px-16 py-12 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Discover Your Next Favorite
          </h2>

          <form onSubmit={handleSearch} className="relative group">
            <div className="relative">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for movies, genres, actors..."
                className="w-full px-6 py-4 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl text-white text-lg focus:outline-none focus:border-red-500 focus:bg-gray-800/80 transition-all duration-300 placeholder-gray-400 pr-16"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-105"
              >
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Premium Movie Grid Using Separated MovieCard Component */}
      <div className="px-6 md:px-16 py-12 bg-gradient-to-b from-gray-900 to-black">
        <h3 className="text-2xl md:text-3xl font-bold mb-8 text-white">
          Trending Now
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
          {movies.map((movie, index) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onClick={handleTrailer}
              index={index}
            />
          ))}
        </div>
      </div>

      {/* Premium Footer */}
      <FilmGoFooter/>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeInUp {
          animation: fadeInUp 1s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default Home;