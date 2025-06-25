// src/pages/HomePage.jsx
import { Link } from "react-router-dom";
import "../styles/HomePage.css";

// Composant HomePage
function HomePage() {
  return (
    <div className="home-container">
      <div className="hero-section">
        <div className="hero-left">
          <h2>RÉSERVEZ LA VOITURE DE VOS RÊVES EN UN SEUL CLIC</h2>
          <p>
            Découvrez notre large gamme de véhicules et trouvez celui qui vous convient. 
            Donnez-lui une chance de briller sur la route avec la plateforme car_booking.
          </p>
        </div>
        <div className="hero-right">
          <img src="/src/assets/images/snedaii.png" alt="Voiture rouge" />
          <h2>TOUT CE QUE VOUS DEVEZ SAVOIR SUR VOTRE VOITURE</h2>
          <p>
            Car Dealer est une plateforme qui vous permet de réserver votre voiture en ligne,
            de gérer vos réservations et d’accéder à toutes les informations nécessaires concernant votre véhicule.
          </p>
        </div>
      </div>
      <div className="cta">
        <Link to="/add-car" className="btn-command">
          Commandez
        </Link>
      </div>
    </div>
  );
}

export default HomePage;
