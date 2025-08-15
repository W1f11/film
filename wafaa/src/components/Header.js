import React, { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // Changement du background au scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const goToHero = () => {
    setMenuOpen(false); // Ferme le menu mobile
    if (location.pathname !== "/") {
      // Si on n'est pas sur la page d'accueil, on y navigue d'abord
      navigate("/");
      setTimeout(() => {
        const heroSection = document.getElementById("hero");
        if (heroSection) heroSection.scrollIntoView({ behavior: "smooth" });
      }, 100); // petit délai pour que le Hero soit monté
    } else {
      const heroSection = document.getElementById("hero");
      if (heroSection) heroSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className={scrolled ? "scrolled" : ""}>
      <nav>
        <div className="logo">MovieScope</div>

        {/* Icône toggle pour mobile */}
        <div
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </div>

        {/* Menu principal */}
        <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
          <li>
            <button onClick={goToHero} className="nav-link-button">
              Accueil
            </button>
          </li>
          <li>
            <a href="#movie-list" onClick={() => setMenuOpen(false)}>
              Films
            </a>
          </li>
          <li>
            <Link to="/about" onClick={() => setMenuOpen(false)}>
              À propos
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
