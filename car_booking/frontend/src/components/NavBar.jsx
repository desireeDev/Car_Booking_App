// src/components/Navbar.jsx
import { Link } from "react-router-dom";
import "../styles/Navbar.css";

// Import your logo image (adjust path as necessary)
import carDealerLogo from "../assets/images/logo.png"; // <-- IMPORTANT: Update this path to your logo

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="navbar-logo">
          <img src={carDealerLogo} alt="Car Dealer Logo" />
        </Link>
      </div>

      <div className="navbar-right">
        <ul className="nav-links">
          <li className="nav-item has-dropdown">
            <Link to="/">Home <span className="dropdown-arrow">&#9660;</span></Link>
          </li>
          <li className="nav-item has-dropdown">
            <Link to="/dashboard"> Dashboard <span className="dropdown-arrow">&#9660;</span></Link>
          </li>
          <li className="nav-item has-dropdown active"> 
            <Link to="/contact"> Reserver <span className="dropdown-arrow">&#9660;</span></Link>
          </li>
          <li className="nav-item has-dropdown">
            <Link to="/about"> Nos voitures <span className="dropdown-arrow">&#9660;</span></Link>
          </li>
          <li className="nav-item has-dropdown">
            <Link to="/contact">Contact <span className="dropdown-arrow">&#9660;</span></Link>
          </li>
        </ul>


        <button className="add-car-button">Rerver une voiture</button>
      </div>
    </nav>
  );
}

export default Navbar;