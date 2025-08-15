import React, { useEffect, useState } from "react";

const images = [
  "https://deadline.com/wp-content/uploads/2025/07/Wednesday.jpg?resize=1024.jpg",
  "https://i.ytimg.com/vi/ELmhAVxBXvM/maxresdefault.jpg",
  "https://tse1.mm.bing.net/th/id/OIP.z9OAOQdHgwsteAiNzjUlJgHaEo?pid=Api&P=0&h=220.jpg",
];

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Change image every 4 seconds
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="hero" id="hero"style={{ position: "relative", overflow: "hidden" }}>
      {/* Images en arrière-plan */}
      {images.map((src, index) => (
        <img
          key={index}
          src={src}
          alt={`Slide ${index + 1}`}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: index === currentIndex ? 1 : 0,
            transition: "opacity 1s ease-in-out",
            zIndex: -1,
          }}
        />
      ))}

      {/* Contenu au-dessus */}
      <div className="hero-content" style={{ position: "relative", color: "white", padding: "100px 20px", textAlign: "center" }}>
        <h1>Découvrez des milliers de films</h1>
        <p>Regardez nos films avec une bonne qualité</p>
        <div className="hero-buttons">
          <button className="btn-primary"><i className="fas fa-play"></i> Regarder maintenant</button>
          <button className="btn-secondary"><i className="fas fa-info-circle"></i> Plus d'infos</button>
        </div>
      </div>
    </section>
  );
};

export default Hero;