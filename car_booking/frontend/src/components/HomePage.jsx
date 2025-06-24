// src/pages/HomePage.jsx
import { Link } from "react-router-dom";
import "../styles/HomePage.css"; 

// HomePage component
function HomePage() {
  return (
    <div className="home-container">
      <div className="hero-section">
        <div className="hero-left">
          <h2>BOOK THE CAR OF YOUR DREAMS IN JUST ONE CLICK</h2>
          <p>Explore our wide range of vehicles and find the perfect one for you. and give 
            to her chance to shine on the road with car_booking structure</p>
        </div>
        <div className="hero-right">
          <img src="/src/assets/images/snedaii.png" alt="Voiture rouge" />
           <h2>EVERYTHING YOU NEED TO KNOW ABOUT YOUR CAR</h2>
          <p>Car_booking is a platform that allows you to book your car online,
            manage your bookings, and access all the information you need about your vehicle.</p>
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
