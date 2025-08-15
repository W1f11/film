import React from "react";

const EmptyState = ({ message }) => {
  return (
    <div style={styles.container}>
      <img
        src="/empty-movie.png" // mets une image dans public/ si tu veux
        alt="Aucun film"
        style={styles.image}
      />
      <p style={styles.text}>{message}</p>
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    padding: "40px 20px",
    color: "#666",
  },
  image: {
    width: "150px",
    opacity: 0.7,
    marginBottom: "15px",
  },
  text: {
    fontSize: "1.1rem",
  },
};

export default EmptyState;
