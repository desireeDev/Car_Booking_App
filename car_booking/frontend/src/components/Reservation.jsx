import React, { useEffect, useState } from "react";
import "../styles/Reservation.css";

function Reservation() {
  const [cars, setCars] = useState([]);
  const [formData, setFormData] = useState({
    nom: "",
    email: "",
    carId: "",
    dateDepart: "",
    dateArrivee: ""
  });
  const [recap, setRecap] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/api/cars")
      .then(res => res.json())
      .then(data => setCars(data.filter(car => car.isAvailable)))
      .catch(err => console.error(err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8000/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nom: formData.nom,
          email: formData.email,
          car_id: formData.carId,
          date_depart: formData.dateDepart,
          date_arrivee: formData.dateArrivee,
        }),
      });

      if (!response.ok) throw new Error("Erreur lors de la réservation");

      // Récupère les infos de la voiture sélectionnée pour l'affichage
      const selectedCar = cars.find(c => c.id === parseInt(formData.carId));
      setRecap({
        nom: formData.nom,
        email: formData.email,
        dateDepart: formData.dateDepart,
        dateArrivee: formData.dateArrivee,
        car: selectedCar,
      });

      setFormData({ nom: "", email: "", carId: "", dateDepart: "", dateArrivee: "" });
    } catch (err) {
      console.error(err);
      alert("❌ Une erreur est survenue lors de la réservation.");
    }
  };

  return (
    <div className="reservation-page">
      <div className="reservation-container">
        <h1 className="reservation-title">Réserver une voiture</h1>
        {!recap ? (
          <form className="reservation-form" onSubmit={handleSubmit}>
            <div>
              <label className="reservation-label">Nom complet</label>
              <input name="nom" type="text" className="reservation-input" required value={formData.nom} onChange={handleChange} />
            </div>
            <div>
              <label className="reservation-label">Email</label>
              <input name="email" type="email" className="reservation-input" required value={formData.email} onChange={handleChange} />
            </div>
            <div>
              <label className="reservation-label">Voiture souhaitée</label>
              <select name="carId" className="reservation-input" required value={formData.carId} onChange={handleChange}>
                <option value="">-- Sélectionner une voiture --</option>
                {cars.map((car) => (
                  <option key={car.id} value={car.id}>
                    {car.brand} {car.model} ({car.licensePlate})
                  </option>
                ))}
              </select>
            </div>
            <div className="reservation-dates">
              <div>
                <label className="reservation-label">Date de début</label>
                <input name="dateDepart" type="date" className="reservation-input" required value={formData.dateDepart} onChange={handleChange} />
              </div>
              <div>
                <label className="reservation-label">Date de fin</label>
                <input name="dateArrivee" type="date" className="reservation-input" required value={formData.dateArrivee} onChange={handleChange} />
              </div>
            </div>
            <div className="reservation-button-container">
              <button type="submit" className="reservation-button">Réserver 🚗</button>
            </div>
          </form>
        ) : (
          <div className="reservation-recap">
            <h2>🎉 Réservation confirmée !</h2>
            <p><strong>Nom :</strong> {recap.nom}</p>
            <p><strong>Email :</strong> {recap.email}</p>
            <p><strong>Voiture :</strong> {recap.car.brand} {recap.car.model} ({recap.car.licensePlate})</p>
            <p><strong>Date de début :</strong> {recap.dateDepart}</p>
            <p><strong>Date de fin :</strong> {recap.dateArrivee}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Reservation;
