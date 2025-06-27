// src/components/Navbar.jsx
import React, { useState, useEffect } from "react"; // Importer useState
import { Link, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";
import { useAuth } from "../services/useAuth";
import { getCurrentUser } from "../services/authService";
import carDealerLogo from "../assets/images/logo.png";

function Navbar() {
  const { user, login, logout } = useAuth();
  const navigate = useNavigate();

  // État pour gérer l'ouverture/fermeture du menu mobile
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    getCurrentUser()
      .then(data => {
        console.log("✅ Utilisateur connecté :", data);
        login(data);
      })
      .catch(err => {
        console.log("❌ Non connecté :", err.message);
        logout();
      });
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
    // Ferme le menu mobile après la déconnexion
    setIsMobileMenuOpen(false);
  };

  // Fonction pour basculer l'état du menu mobile
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Fonction pour fermer le menu mobile lorsque l'on clique sur un lien (optionnel mais recommandé)
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
          <img src={carDealerLogo} alt="Car Dealer Logo" />
        </Link>
      </div>

      {/* Bouton Hamburger pour mobile */}
      <button
        className={`hamburger-menu ${isMobileMenuOpen ? 'open' : ''}`}
        onClick={toggleMobileMenu}
        aria-label="Toggle mobile menu"
      >
        <span className="hamburger-icon"></span>
        <span className="hamburger-icon"></span>
        <span className="hamburger-icon"></span>
      </button>

      {/* Le menu de navigation principal */}
      <div className={`navbar-right ${isMobileMenuOpen ? 'open' : ''}`}>
        <ul className="nav-links">
          {/* Ajoutez onClick={closeMobileMenu} à chaque Link pour fermer le menu après la navigation */}
          <li className="nav-item has-dropdown">
            <Link to="/" onClick={closeMobileMenu}>Home</Link>
          </li>
          {user && (
            <>
              <li className="nav-item has-dropdown">
                <Link to="/dashboard" onClick={closeMobileMenu}>Dashboard</Link>
              </li>
              <li className="nav-item has-dropdown">
                <Link to="/listereservations" onClick={closeMobileMenu}>Liste Réservation</Link>
              </li>
            </>
          )}
          <li className="nav-item has-dropdown">
            <Link to="/reservation" onClick={closeMobileMenu}>Réserver</Link>
          </li>
          <li className="nav-item has-dropdown">
            <Link to="/about" onClick={closeMobileMenu}>Nos voitures</Link>
          </li>
          <li className="nav-item has-dropdown">
            <Link to="/contact" onClick={closeMobileMenu}>Contact</Link>
          </li>

          {user ? (
            <li className="nav-item"> {/* Ajoutez nav-item pour le bouton */}
              <button onClick={handleLogout} className="add-car-button">Se déconnecter</button>
            </li>
          ) : (
            <li className="nav-item"> {/* Ajoutez nav-item pour le bouton */}
              <Link to="/login" onClick={closeMobileMenu}><button className="add-car-button">Se connecter</button></Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;