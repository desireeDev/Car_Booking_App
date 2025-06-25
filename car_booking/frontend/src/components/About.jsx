// src/pages/about.jsx
import { Link } from "react-router-dom";
import "../styles/About.css";

// Import des images (ajuster les chemins si nécessaire)
import audiA4Image from "../assets/images/audia4.png";
import audiA7Image from "../assets/images/audia7.png";
import audiQ3Image from "../assets/images/audiq3.png";

function About() {
  return (
    <div className="about-page-container">
      <div className="featured-cars-section">
        <div className="featured-cars-header">
          <div className="header-text-content">
            <h2>Nos Véhicules en Vedette</h2>
            <p>
              Découvrez notre sélection de véhicules récents et parfaitement entretenus, disponibles à la location pour tous vos déplacements.
              Que ce soit pour un voyage, un déplacement professionnel ou un week-end, nous avons la voiture qu’il vous faut.
            </p>
          </div>
          <Link to="/reservation">
            <button className="featured-car-button">Réserver une voiture</button>
          </Link>
        </div>
        <div className="car-cards-container">
          {/* Carte véhicule 1 */}
          <div className="car-card">
            <div className="car-image-wrapper">
              <img src={audiA4Image} alt="2017 Audi A4 Prestige" className="car-image" />
              <div className="price-overlay original-price">480€</div>
              <div className="price-overlay current-price">420€</div>
            </div>
            <div className="car-details">
              <h3>A4 PRESTIGE</h3>
              <h4>2017 Audi A4 Prestige</h4>
              <div className="car-specs">
                <div className="spec-item">
                  <span>Année</span>
                  <span>2017</span>
                </div>
                <div className="spec-item">
                  <span>Type de véhicule</span>
                  <span>Coupe</span>
                </div>
                <div className="spec-item">
                  <span>Transmission</span>
                  <span>Boîte 6 vitesses</span>
                </div>
              </div>
            </div>
          </div>

          {/* Carte véhicule 2 */}
          <div className="car-card">
            <div className="car-image-wrapper">
              <img src={audiA7Image} alt="2017 Audi A7 3.0T Prestige Quattro" className="car-image" />
              <div className="price-overlay original-price">460€</div>
              <div className="price-overlay current-price">420€</div>
            </div>
            <div className="car-details">
              <h3>A7 3.0T PRESTIGE QUATTRO</h3>
              <h4>2017 Audi A7 3.0T Prestige Quattro</h4>
              <div className="car-specs">
                <div className="spec-item">
                  <span>Année</span>
                  <span>2017</span>
                </div>
                <div className="spec-item">
                  <span>Type de véhicule</span>
                  <span>Berline</span>
                </div>
                <div className="spec-item">
                  <span>Transmission</span>
                  <span>Boîte 8 vitesses</span>
                </div>
              </div>
            </div>
          </div>

          {/* Carte véhicule 3 */}
          <div className="car-card">
            <div className="car-image-wrapper">
              <img src={audiQ3Image} alt="2017 Audi Q3 2.0T Prestige" className="car-image" />
              <div className="price-overlay original-price">490€</div>
              <div className="price-overlay current-price">429€</div>
              <span className="tax-table-badge">Taxe incluse</span>
            </div>
            <div className="car-details">
              <h3>Q3 2.0T PRESTIGE</h3>
              <h4>2017 Audi Q3 2.0T Prestige</h4>
              <div className="car-specs">
                <div className="spec-item">
                  <span>Année</span>
                  <span>2017</span>
                </div>
                <div className="spec-item">
                  <span>Type de véhicule</span>
                  <span>SUV</span>
                </div>
                <div className="spec-item">
                  <span>Transmission</span>
                  <span>Boîte automatique</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
