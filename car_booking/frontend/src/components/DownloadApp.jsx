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
        <h2>Téléchargez notre application de concessionnaire automobile.</h2>
        <p>
          Car Dealer est le thème WordPress Premium de concessionnaire automobile
          le plus attrayant, créatif et polyvalent.
        </p>

        <ul className="feature-list">
          <li>
            <i className="fas fa-check-circle check-icon"></i> {/* Icône de coche FontAwesome */}
            Quel entretien une voiture électrique nécessite-t-elle ?
          </li>
          <li>
            <i className="fas fa-check-circle check-icon"></i>
            Analysez chaque pneu pour toute usure excessive de la bande de roulement
          </li>
          <li>
            <i className="fas fa-check-circle check-icon"></i>
            Contrôle d'accès mis en place pour une recharge de véhicule électrique.
          </li>
        </ul>

        <p className="download-now-text">Téléchargez maintenant sur :</p>

        <div className="download-buttons">
          <a href="#" className="download-button apple-store">
            <i class="fa-brands fa-apple" aria-hidden="true"></i>
            Télécharger sur l'<br />Apple Store
          </a>
          <a href="#" className="download-button google-play">
            <i class="fa-brands fa-google-play" aria-hidden="true"></i> {/* Correction de l'icône ici */}
            Disponible sur <br />Google Play
          </a>
        </div>
      </div>

      <div className="download-app-mockups">
        <img src={phoneMockup1} alt="Maquette d'application de téléphone - Connexion" className="mockup-main" />
      </div>
    </section>
  );
}

export default DownloadApp;