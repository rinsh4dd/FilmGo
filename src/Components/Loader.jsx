import React from 'react';
import { Film, Play, Star, Camera } from 'lucide-react';

const MovieLoader = ({ text = "Loading your cinematic experience..." }) => {
  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
      {/* Background animation */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-full h-full">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full opacity-20"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
              }}
            >
              <div className="w-full h-full animate-pulse"></div>
            </div>
          ))}
        </div>
      </div>

      <div className="relative z-10 flex flex-col items-center">
        {/* Main loader animation */}
        <div className="relative mb-8">
          {/* Film reel */}
          <div className="relative w-24 h-24 mb-4">
            <div className="absolute inset-0 border-4 border-gray-700 rounded-full"></div>
            <div className="absolute inset-2 border-2 border-amber-500 rounded-full animate-spin"></div>
            <div className="absolute inset-4 bg-black rounded-full flex items-center justify-center">
              <Play className="w-6 h-6 text-amber-500 animate-pulse" fill="currentColor" />
            </div>
            
            {/* Film holes */}
            {[0, 60, 120, 180, 240, 300].map((rotation) => (
              <div
                key={rotation}
                className="absolute w-2 h-2 bg-gray-600 rounded-full"
                style={{
                  top: '10px',
                  left: '50%',
                  transformOrigin: '50% 38px',
                  transform: `translateX(-50%) rotate(${rotation}deg)`,
                }}
              />
            ))}
          </div>

          {/* Film strip animation */}
          <div className="absolute -top-2 -left-16 w-32 h-2 bg-gradient-to-r from-transparent via-amber-500 to-transparent opacity-60">
            <div className="absolute inset-0 animate-pulse">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute top-0 w-1 h-full bg-black opacity-40"
                  style={{ left: `${i * 12.5}%` }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Loading text */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-2 animate-pulse">
            FilmGo
          </h2>
          <p className="text-gray-400 text-sm mb-4 animate-pulse">
            {text}
          </p>
          
          {/* Progress bar */}
          <div className="w-64 h-1 bg-gray-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-amber-500 to-red-500 rounded-full"
              style={{
                width: '100%',
                animation: 'loading 2s ease-in-out infinite'
              }}
            >
            </div>
          </div>
        </div>

        {/* Additional movie-themed elements */}
        <div className="absolute top-8 left-8 opacity-20">
          <Camera className="w-8 h-8 text-amber-500 animate-bounce" style={{animationDelay: '0.5s'}} />
        </div>
        <div className="absolute top-12 right-12 opacity-20">
          <Star className="w-6 h-6 text-amber-400 animate-bounce" style={{animationDelay: '1s'}} />
        </div>
        <div className="absolute bottom-16 left-16 opacity-20">
          <Film className="w-7 h-7 text-red-500 animate-bounce" style={{animationDelay: '1.5s'}} />
        </div>
      </div>

      {/* CSS Animation */}
      <style jsx>{`
        @keyframes loading {
          0%, 100% { 
            transform: translateX(-100%); 
          }
          50% { 
            transform: translateX(100%); 
          }
        }
      `}</style>
    </div>
  );
};

export default MovieLoader;