// src/components/Navbar.jsx
import { Link } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">Car_Booking</div>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/dashboard">Fonctionnalités</Link></li>
        <li><Link to="/contact">Visualisation</Link></li>
        <li><Link to="/about">À propos</Link></li>
        <li><Link to="/contact">Contact</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
