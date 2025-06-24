// src/pages/HomePage.jsx
import { Link } from "react-router-dom";
import "../styles/HomePage.css"; // tu peux créer ce fichier

function HomePage() {
  return (
    <div className="home-container">
     
      <div className="hero-section">
        <div className="hero-left">
          <h2>YOUR DREAM CAR, JUST A CLICK AWAY.</h2>
        </div>
        <div className="hero-right">
          <img src="/src/assets/images/snedaii.png" alt="Voiture rouge" />
        </div>
      </div>

      <div className="cta">
        <Link to="/add-car" className="btn-shop">
          Commandez
        </Link>
      </div>
    </div>
  );
}

export default HomePage;
