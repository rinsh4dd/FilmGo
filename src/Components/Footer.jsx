import React, { useEffect, useRef, useState } from "react";
import { Film, Play } from "lucide-react";

const FilmGoFooter = () => {
  const footerRef = useRef();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.2 }
    );
    if (footerRef.current) observer.observe(footerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <footer
      ref={footerRef}
      className={`bg-gradient-to-t from-black via-gray-900 border-t border-amber-500/20 px-4 sm:px-6 md:px-16 py-12 relative overflow-hidden
                  transition-all duration-[1200ms] ease-out 
                  ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-4 left-4 w-2 h-2 bg-amber-400 rounded-full animate-pulse"></div>
        <div className="absolute top-8 right-8 w-1 h-1 bg-red-400 rounded-full animate-pulse delay-300"></div>
        <div className="absolute bottom-6 left-12 w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse delay-700"></div>
        <div className="absolute bottom-4 right-6 w-2 h-2 bg-purple-400 rounded-full animate-pulse delay-500"></div>
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Main footer content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          {/* Brand section */}
          <div className="flex flex-col md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="relative">
                <Film className="w-8 h-8 text-amber-500" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-amber-400 to-red-500 bg-clip-text text-transparent">
                FilmGo
              </h3>
            </div>
            <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
              Your premium destination for cinematic experiences. Discover, watch, and enjoy the best movies.
            </p>
          </div>

          {/* Quick links */}
          <div className="md:col-span-1">
            <h4 className="text-white font-semibold mb-4 flex items-center gap-2 text-sm sm:text-base">
              <Play className="w-4 h-4 text-amber-500" />
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              {["Browse Movies", "Top Rated", "New Releases", "My Watchlist"].map((link, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-amber-400 transition-colors duration-300 hover:translate-x-1 transform inline-block"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Placeholder for future sections */}
          <div className="md:col-span-1 sm:hidden md:block"></div>
          <div className="md:col-span-1 sm:hidden md:block"></div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent mb-8"></div>

        {/* Footer Bottom */}
        <div className="text-center text-gray-500 text-xs sm:text-sm">
          © 2024 FilmGo. Premium Movie Experience.
        </div>
      </div>
    </footer>
  );
};

export default FilmGoFooter;
