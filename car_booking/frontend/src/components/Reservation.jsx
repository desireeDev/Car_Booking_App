import React from "react";
import "../styles/Reservation.css";

function Reservation() {
  return (
    <div className="reservation-page">
      <div className="reservation-container">
        <h1 className="reservation-title">Réserver une voiture</h1>
        <p className="reservation-subtitle">
          Remplissez les informations ci-dessous pour effectuer une réservation.
        </p>
        <form className="reservation-form">
          <div>
            <label className="reservation-label">Nom complet</label>
            <input
              type="text"
              className="reservation-input"
              placeholder="Votre nom"
              required
            />
          </div>
          <div>
            <label className="reservation-label">Email</label>
            <input
              type="email"
              className="reservation-input"
              placeholder="votre.email@exemple.com"
              required
            />
          </div>
          <div>
            <label className="reservation-label">Voiture souhaitée</label>
            <input
              type="text"
              className="reservation-input"
              placeholder="Ex : Peugeot 208"
              required
            />
          </div>
          <div className="reservation-dates">
            <div>
              <label className="reservation-label">Date de début</label>
              <input
                type="date"
                className="reservation-input"
                required
              />
            </div>
            <div>
              <label className="reservation-label">Date de fin</label>
              <input
                type="date"
                className="reservation-input"
                required
              />
            </div>
          </div>
          <div className="reservation-button-container">
            <button type="submit" className="reservation-button">
              Réserver 🚗
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Reservation;
