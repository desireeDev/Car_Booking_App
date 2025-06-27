// src/components/Reservation.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Reservation.css";
// Supprimer l'importation de l'image ici : import blackCarImage from "../assets/images/black-car-background.jpg";

function Reservation() {
  const navigate = useNavigate();
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [carId, setCarId] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [cars, setCars] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const today = new Date().toISOString().split("T")[0]; // YYYY-mm-dd
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 60);
  const maxDateStr = maxDate.toISOString().split("T")[0];

  useEffect(() => {
    fetch("http://localhost:8000/api/cars")
      .then((res) => res.json())
      .then((data) => {
        const availableCars = data.filter((car) => car.isAvailable);
        setCars(availableCars);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:8000/api/reservations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nom,
        email,
        date_depart: startDate,
        date_arrivee: endDate,
        car_id: carId,
      }),
    });

    if (res.ok) {
      setIsSubmitted(true);
    } else {
      alert("Erreur lors de la réservation.");
    }
  };

  const selectedCar = cars.find((c) => c.id === parseInt(carId));

  return (
    <div className="reservation-page">
      <div className="reservation-container">
        {!isSubmitted ? (
          <>
            <h1 className="reservation-title">Réserver une voiture</h1>
            <p className="reservation-subtitle">
              Remplissez les informations ci-dessous pour effectuer une réservation.
            </p>
            <form className="reservation-form" onSubmit={handleSubmit}>
              <div>
                <label className="reservation-label">Nom complet</label>
                <input
                  type="text"
                  className="reservation-input"
                  placeholder="Votre nom"
                  required
                  value={nom}
                  onChange={(e) => setNom(e.target.value)}
                />
              </div>
              <div>
                <label className="reservation-label">Email</label>
                <input
                  type="email"
                  className="reservation-input"
                  placeholder="votre.email@exemple.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label className="reservation-label">Voiture souhaitée</label>
                <select
                  className="reservation-input"
                  required
                  value={carId}
                  onChange={(e) => setCarId(e.target.value)}
                >
                  <option value="">-- Sélectionnez une voiture --</option>
                  {cars.map((car) => (
                    <option key={car.id} value={car.id}>
                      {car.brand} {car.model}
                    </option>
                  ))}
                </select>
              </div>
              <div className="reservation-dates">
                <div>
                  <label className="reservation-label">Date de début</label>
                  <input
                    type="date"
                    className="reservation-input"
                    required
                    value={startDate}
                    min={today}
                    max={maxDateStr}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </div>
                <div>
                  <label className="reservation-label">Date de fin</label>
                  <input
                    type="date"
                    className="reservation-input"
                    required
                    value={endDate}
                    min={today}
                    max={maxDateStr}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </div>
              </div>
              <div className="reservation-button-container">
                <button type="submit" className="reservation-button">
                  Réserver 🚗
                </button>
              </div>
            </form>
          </>
        ) : (
          <>
            <h1 className="reservation-title">🎉 Réservation confirmée !</h1>
            <p className="reservation-subtitle">Merci pour votre réservation.</p>
            <ul className="reservation-recap">
              <li><strong>Nom :</strong> {nom}</li>
              <li><strong>Email :</strong> {email}</li>
              <li><strong>Voiture :</strong> {selectedCar?.brand} {selectedCar?.model}</li>
              <li><strong>Début : :</strong> {startDate}</li>
              <li><strong>Fin :</strong> {endDate}</li>
            </ul>
            <div className="reservation-button-container">
              <button className="reservation-button" onClick={() => navigate("/")}>
                Retour à l'accueil 🏠
              </button>
            </div>
          </>
        )}
      </div>
      {/* Supprimer ce bloc :
      <div className="reservation-image-container">
        <img src={blackCarImage} alt="Luxury Car" className="reservation-car-image" />
      </div>
      */}
    </div>
  );
}

export default Reservation;