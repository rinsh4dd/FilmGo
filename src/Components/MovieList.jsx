import React from "react";
import MovieCard from "./MovieCard";

const MovieList = ({ movies, onCardClick }) => {
  return (
    <div className="flex flex-wrap">
      {movies.map(movie => (
        <MovieCard key={movie.id} movie={movie} onClick={onCardClick} />
      ))}
    </div>
  );
};

export default MovieList;
