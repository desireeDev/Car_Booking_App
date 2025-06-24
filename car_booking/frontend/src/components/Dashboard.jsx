// src/pages/Dashboard.jsx
import { useState } from "react";
import FormCrud from "../components/FormCrud";
import "../styles/Dashboard.css";

function Dashboard() {
  const [showPopup, setShowPopup] = useState(false);

  const handlePopupOpen = () => setShowPopup(true);
  const handlePopupClose = () => setShowPopup(false);

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Gestion des voitures</h1>
        <button className="create-btn" onClick={handlePopupOpen}>+ Créer une voiture</button>
      </div>

      {/* Affichage du tableau des voitures */}
      <FormCrud action="read" />

      {/* Popup du formulaire de création */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <button className="close-btn" onClick={handlePopupClose}>×</button>
            <FormCrud action="create" />
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
