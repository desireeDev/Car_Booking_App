import { Link } from "react-router-dom";
import "../styles/HomePage.css";
import About from "./about"; 
import DownloadApp from "./DownloadApp"; 



// Composant HomePage
function HomePage() {
  return (
    <div>
    <div className="home-container">
      {/* The car image will now be a background-image in CSS */}
      <div className="hero-section">
        <div className="hero-left">
          <small className="rent-car-text">- RENT A CAR</small>
          <h1>LOUE TA VOITURE</h1>
          <p>
            Rent a comfortable and good-looking car for any period.
            Corporate discounts are available.
          </p>
          <div className="cta-buttons">
            <Link to="/contacts" className="btn-contacts">
              CONTACTS
            </Link>
            <Link to="/best-offers" className="btn-best-offers">
              BEST OFFERS
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