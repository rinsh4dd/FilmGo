import React, { useState } from "react";

const MovieCard = ({ movie, onClick }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Handle TMDB rating properly - it can be null, undefined, or 0
  const rating = movie.vote_average !== undefined && movie.vote_average !== null 
    ? movie.vote_average 
    : 0;
  
  // Calculate star rating correctly (TMDB uses 0-10 scale, we want 0-5 stars)
  const starRating = Math.round((rating / 10) * 5);
  
  // Create star display with filled and empty stars
  const stars = Array(5)
    .fill(0)
    .map((_, i) => (i < starRating ? "★" : "☆"));

  // Get release year
  const releaseYear = movie.release_date ? new Date(movie.release_date).getFullYear() : 'TBA';

  return (
    <div className="group relative cursor-pointer transition-all duration-500 hover:scale-104 hover:z-20 h-full">
      {/* Main Card Container - Added h-full class */}
      <div className="relative bg-gradient-to-b from-gray-800 to-gray-900 rounded-2xl overflow-hidden shadow-2xl border border-gray-700/50 hover:border-red-500/50 transition-all duration-500 h-full flex flex-col">
        
        {/* Image Container - Added flex-shrink-0 to prevent image from shrinking */}
        <div className="relative aspect-[2/3] overflow-hidden flex-shrink-0">
          {/* Loading Skeleton */}
          {!imageLoaded && !imageError && (
            <div className="absolute inset-0 bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 animate-pulse">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer"></div>
            </div>
          )}

          {/* Movie Poster */}
          <img
            src={
              movie.poster_path && !imageError
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='450' viewBox='0 0 300 450'%3E%3Crect width='300' height='450' fill='%23374151'/%3E%3Ctext x='150' y='200' text-anchor='middle' fill='%236B7280' font-family='Arial' font-size='14'%3ENo Image%3C/text%3E%3Ctext x='150' y='220' text-anchor='middle' fill='%236B7280' font-family='Arial' font-size='14'%3EAvailable%3C/text%3E%3C/svg%3E"
            }
            alt={movie.title}
            className={`w-full h-full object-cover transition-all duration-700 ${
              imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-110'
            } group-hover:scale-110`}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
            onClick={() => onClick(movie.id)}
          />

          {/* Premium Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
            
            {/* Play Button */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500 scale-75 group-hover:scale-100">
              <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-full border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all duration-300">
                <svg className="w-7 h-7 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
            </div>

            {/* Quick Info Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
              <div className="bg-black/60 backdrop-blur-sm rounded-lg p-3 border border-white/10">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white text-sm font-semibold truncate flex-1">
                    {movie.title}
                  </span>
                  <span className="text-gray-300 text-xs ml-2">
                    {releaseYear}
                  </span>
                </div>
                
                {rating > 0 ? (
                  <div className="flex items-center gap-2">
                    <div className="flex text-yellow-400 text-sm">
                      {stars.map((star, index) => (
                        <span key={index} className={star === "★" ? "text-yellow-400" : "text-gray-600"}>
                          {star}
                        </span>
                      ))}
                    </div>
                    <span className="text-gray-300 text-xs">
                      {rating.toFixed(1)}
                    </span>
                  </div>
                ) : (
                  <p className="text-gray-400 text-xs">No ratings yet</p>
                )}
              </div>
            </div>
          </div>

          {/* Premium Border Glow */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-red-500/0 via-pink-500/0 to-purple-500/0 group-hover:from-red-500/20 group-hover:via-pink-500/20 group-hover:to-purple-500/20 transition-all duration-500 pointer-events-none"></div>
        </div>

        {/* Card Footer - Always Visible - Added flex-grow and flex flex-col */}
        <div className="p-4 flex flex-col flex-grow">
          <h3 className="text-white font-semibold text-sm mb-2 line-clamp-2 group-hover:text-red-400 transition-colors duration-300 flex-shrink-0" title={movie.title}>
            {movie.title}
          </h3>
          
          <div className="flex items-center justify-between mt-auto flex-shrink-0">
            <div className="flex items-center gap-2">
              {rating > 0 ? (
                <>
                  <div className="flex text-yellow-400 text-xs">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={i < starRating ? "text-yellow-400" : "text-gray-600"}>
                        ★
                      </span>
                    ))}
                  </div>
                  <span className="text-gray-400 text-xs">
                    {rating.toFixed(1)}
                  </span>
                </>
              ) : (
                <span className="text-gray-500 text-xs">No rating</span>
              )}
            </div>
            
            <span className="text-gray-400 text-xs font-medium">
              {releaseYear}
            </span>
          </div>

          {/* Premium Action Buttons */}
          <div className="mt-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0 flex-shrink-0">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onClick(movie.id);
              }}
              className="flex-1 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white text-xs font-semibold py-2 px-3 rounded-lg transition-all duration-300 hover:scale-105"
            >
              Play Trailer
            </button>
            <button className="bg-gray-700/50 hover:bg-gray-600/50 text-white p-2 rounded-lg transition-all duration-300 hover:scale-105 backdrop-blur-sm">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Premium Shine Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none"></div>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default MovieCard;