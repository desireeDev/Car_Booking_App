import { Link } from "react-router-dom";
import "../styles/HomePage.css";
import About from "./about";
import DownloadApp from "./DownloadApp";

// Composant HomePage
function HomePage() {
  return (
    <div>
      <div className="home-container">
        {/* L'image de la voiture sera maintenant une image de fond en CSS */}
        <div className="hero-section">
          <div className="hero-left">
            <small className="rent-car-text">- LOUEZ UNE VOITURE</small>
            <h1>LOUE TA VOITURE</h1>
            <p>
              Louez une voiture confortable et esthétique pour n'importe quelle
              période. Des réductions pour les entreprises sont disponibles.
            </p>
            <div className="cta-buttons">
              <Link to="/contact" className="btn-contacts">
                CONTACTS
              </Link>
              <Link to="/about" className="btn-best-offers">
                MEILLEURES OFFRES
              </Link>
            </div>
          </div>
        </div>
      </div>
      <About />
      <DownloadApp />
    </div>
  );
}

export default HomePage;