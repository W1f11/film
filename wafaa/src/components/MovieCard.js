import React from "react";
import { Link } from "react-router-dom";

const MovieCard = ({ movie }) => {
  return (
    <div className="movie-card">
      <Link to={`/movie/${encodeURIComponent(movie.title)}`}>
        <img
          src={movie.image_url}
          alt={movie.title}
          className="movie-poster"
        />
        <h3 className="movie-title">
          {movie.title} <span>({movie.Year})</span>
        </h3>
      </Link>

      <p><strong>Genre :</strong> {movie.genre}</p>
      <p><strong>Note :</strong> {movie.rating}/10</p>
    </div>
  );
};

export default MovieCard;
