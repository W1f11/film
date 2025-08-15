import React from "react";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer>
      <div className="footer-content">
        <div className="footer-logo">MovieScope</div>
        <div className="footer-links">
          <div className="link-column">
            <h3>Navigation</h3>
            <ul>
              <li><a href="#">Accueil</a></li>
              <li><a href="#">Films</a></li>
              <li><a href="#">Séries</a></li>
              <li><a href="#">Nouveautés</a></li>
            </ul>
          </div>
          <div className="link-column">
            <h3>Legal</h3>
            <ul>
              <li><a href="#">Conditions d'utilisation</a></li>
              <li><a href="#">Confidentialité</a></li>
              <li><a href="#">Cookies</a></li>
            </ul>
          </div>
          <div className="link-column">
            <h3>Contact</h3>
            <ul>
              <li><a href="#">Aide</a></li>
              <li><a href="#">FAQ</a></li>
              <li><a href="#">À propos</a></li>
            </ul>
          </div>
        </div>
        <div className="social-media">
          <a href="#"><FaFacebook /></a>
          <a href="#"><FaTwitter /></a>
          <a href="#"><FaInstagram /></a>
        </div>
      </div>
      <div className="copyright">
        <p>&copy; 2025 MovieStream. Tous droits réservés.</p>
      </div>
    </footer>
  );
};

export default Footer;
