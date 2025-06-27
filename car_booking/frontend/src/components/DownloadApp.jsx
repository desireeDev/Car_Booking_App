// src/components/DownloadApp.jsx
import React from 'react';
import '../styles/DownloadApp.css'; // Nous allons créer ce fichier CSS

// Importez les icônes des stores si vous les avez en local, sinon utilisez des CDN
// Pour cet exemple, je vais simuler des chemins d'icônes

// Importez les images des maquettes de téléphone
import phoneMockup1 from '../assets/images/phone-mockup-1.png'; // Image du téléphone de gauche (login)

function DownloadApp() {
  return (
    <section className="download-app-section">
      <div className="download-app-content">
        <h2>Download Our Car Dealer Application.</h2>
        <p>
          Car Dealer is the most enticing, creative, and multipurpose auto dealer
          Premium WordPress Theme.
        </p>

        <ul className="feature-list">
          <li>
            <i className="fas fa-check-circle check-icon"></i> {/* Icône de coche FontAwesome */}
            What maintenance does an electric car need?
          </li>
          <li>
            <i className="fas fa-check-circle check-icon"></i>
            Analyze each tyre for any excess tread wear
          </li>
          <li>
            <i className="fas fa-check-circle check-icon"></i>
            Access control put an electric vehicle charge.
          </li>
        </ul>

        <p className="download-now-text">Download Now On :</p>

        <div className="download-buttons">
          <a href="#" className="download-button apple-store">
            <i class="fa-brands fa-apple" aria-hidden="true"></i>
            Download On The <br />Apple Store
          </a>
          <a href="#" className="download-button google-play">
            <i class="fa-brands fa-apple" aria-hidden="true"></i>
            Get In On <br />Google Play
          </a>
        </div>
      </div>

      <div className="download-app-mockups">
        <img src={phoneMockup1} alt="Phone App Mockup Login" className="mockup-main" />
      </div>
    </section>
  );
}

export default DownloadApp;