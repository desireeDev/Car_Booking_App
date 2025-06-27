import React from 'react';
import '../styles/Footer.css'; 
import { Link, useNavigate } from "react-router-dom";


function Footer() {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-brand">
          <span className="brand-fast">ASYNTEO </span>
          <span className="brand-rental">LOCATION</span>
        </div>
        <nav className="footer-nav">
          <ul className="footer-nav-list">
            <li className="footer-nav-item"><a href="#cars" className="footer-nav-link">Cars of the month</a></li>
            <li className="footer-nav-item"><a href="#pricing" className="footer-nav-link">Pricing</a></li>
            <li className="footer-nav-item"><a href="#testimonials" className="footer-nav-link">Testimonials</a></li>
            <li className="footer-nav-item"><a href="#contact" className="footer-nav-link">Contact us</a></li>        
          </ul>
        </nav>
      </div>
      <hr className="footer-divider" /> {/* La ligne de séparation */}
      <div className="footer-bottom">
        <p className="footer-copyright">© Created by ASYNTEO</p>
        <p className="footer-rights">All rights Reserved</p>
      </div>
    </footer>
  );
}

export default Footer;