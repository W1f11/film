import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import MovieCard from "./MovieCard";
import EmptyState from "./EmptyState";
import { FaSearch } from "react-icons/fa";

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [visibleCount, setVisibleCount] = useState(12);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const response = await fetch("/movies.xlsx");
        if (!response.ok) throw new Error(`Fichier introuvable (${response.status})`);

        const arrayBuffer = await response.arrayBuffer();
        const workbook = XLSX.read(arrayBuffer, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];

        const jsonData = XLSX.utils.sheet_to_json(worksheet, { defval: "" });
        setMovies(jsonData);
      } catch (error) {
        console.error("Erreur chargement Excel :", error);
      }
    };

    loadMovies();
  }, []);

  const filteredMovies = movies.filter(movie =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderMovies = (movieArray) =>
    movieArray.length > 0
      ? movieArray.slice(0, visibleCount).map((movie, index) => (
          <MovieCard key={index} movie={movie} />
        ))
      : <EmptyState message="Aucun film ne correspond à votre recherche." />;

  const handleViewMore = () => {
    setVisibleCount(prev => prev + 6);
  };

  return (
    <div className="movie-list" id="movie-list">
      <section className="movie-section">
        <h2 className="section-title">Liste des films</h2>

        {/* Barre de recherche avec bouton */}
        <div
      style={{
        display: "flex",
        justifyContent: "center", // centre horizontalement
        marginBottom: "20px"
      }}
    >
      <div style={{ display: "flex", maxWidth: "400px", width: "100%" }}>
        <input
          type="text"
          placeholder="Rechercher..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            width: "100%",
            padding: "8px 15px",
            border: "none",
            borderRadius: "20px 0 0 20px",
            backgroundColor: "rgba(255,255,255,0.1)",
            color: "white",
            outline: "none"
          }}
        />
        <button
          style={{
            backgroundColor: "#e50914",
            border: "none",
            borderRadius: "0 20px 20px 0",
            padding: "8px 15px",
            color: "white",
            cursor: "pointer"
          }}
        >
          <FaSearch />
        </button>
      </div>
</div>


        <div className="movie-carousel">{renderMovies(filteredMovies)}</div>

        {visibleCount < filteredMovies.length && (
          <button className="view-more-btn" onClick={handleViewMore}>
            Voir plus
          </button>
        )}
      </section>
    </div>
  );
};

export default MovieList;
