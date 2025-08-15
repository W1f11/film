import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

// Composant pour afficher le rating sous forme d'étoiles
const StarRating = ({ rating, outOf = 10 }) => {
  const totalStars = 5;
  const stars = (rating / outOf) * totalStars;

  const fullStars = Math.floor(stars);
  const halfStar = stars - fullStars >= 0.5;
  const emptyStars = totalStars - fullStars - (halfStar ? 1 : 0);

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "4px", marginBottom: "10px" }}>
      {Array(fullStars).fill(0).map((_, i) => <FaStar key={`full-${i}`} color="#FFD700" />)}
      {halfStar && <FaStarHalfAlt color="#FFD700" />}
      {Array(emptyStars).fill(0).map((_, i) => <FaRegStar key={`empty-${i}`} color="#FFD700" />)}
      <span style={{ marginLeft: "8px" }}>{rating}/10</span>
    </div>
  );
};

const MovieDetails = () => {
  const { title } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const loadMovies = async () => {
      const response = await fetch("/movies.xlsx");
      const arrayBuffer = await response.arrayBuffer();
      const workbook = XLSX.read(arrayBuffer, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { defval: "" });

      const foundMovie = jsonData.find(
        (m) => (m.title || "").trim() === decodeURIComponent(title)
      );
      setMovie(foundMovie);
    };

    loadMovies();
  }, [title]);

  if (!movie) return <p>Chargement...</p>;

  const genres = movie.genre.split(",").map((g) => g.trim());

  return (
    <div
      className="movie-details"
      style={{
        backgroundImage: `url(${movie.image_url})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "50px",
        paddingBottom: "120px", // laisse de l'espace pour le bouton
        color: "#fff",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: "20px",
        position: "relative", // essentiel pour le bouton absolute

      }}
    >
      <button
        onClick={() => navigate("/")}
        style={{
          padding: "10px 20px",
          borderRadius: "5px",
          border: "none",
          backgroundColor: "#ff0000",
          color: "#fff",
          cursor: "pointer",
          position: "absolute",
          bottom: "70px",
        }}
      >
        ← Retour à l'accueil
      </button>

      <div
        style={{
          backgroundColor: "rgba(0,0,0,0.6)",
          padding: "20px",
          borderRadius: "10px",
          maxWidth: "800px",
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
          justifyContent: "flex-start", // par défaut sur desktop
        }}
        className="movie-container"
      >
        <img
          src={movie.image_url}
          alt={movie.title}
          style={{
            width: "250px",
            borderRadius: "10px",
            objectFit: "cover",
          }}
        />
        <div style={{ flex: 1 }}>
          <h1 style={{ marginBottom: "10px" }}>{movie.title}</h1>

          <div style={{ marginBottom: "15px", display: "flex", gap: "10px", flexWrap: "wrap" }}>
            {genres.map((genre) => (
              <span
                key={genre}
                style={{
                  padding: "5px 10px",
                  borderRadius: "20px",
                  backgroundColor: genre.toLowerCase() === "action" ? "#FF0000" : "#444",
                  fontWeight: genre.toLowerCase() === "action" ? "bold" : "normal",
                }}
              >
                {genre}
              </span>
            ))}
          </div>

          {/* Rating sous forme d'étoiles */}
          <StarRating rating={parseFloat(movie.rating)} />

          <p>{movie.summary}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
