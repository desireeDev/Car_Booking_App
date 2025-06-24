// src/components/ReservationForm.jsx
import { useState } from "react";
import "../styles/ReservationForm.css";

function Book() {
  const [formData, setFormData] = useState({
    disponibilite: "Disponible",
    dateDebut: "",
    dateFin: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simuler une réservation
    setTimeout(() => {
      setMessage("✅ Réservation effectuée avec succès !");
      setFormData({ disponibilite: "Disponible", dateDebut: "", dateFin: "" });
    }, 800);
  };

  return (
    <div className="reservation-form-container">
      <form onSubmit={handleSubmit} className="reservation-form">
        <h2>Réserver une voiture</h2>

        <label>Disponibilité :</label>
        <select
          name="disponibilite"
          value={formData.disponibilite}
          onChange={handleChange}
          required
        >
          <option value="Disponible">Disponible</option>
          <option value="Non disponible">Non disponible</option>
        </select>

        <label>Date de début :</label>
        <input
          type="date"
          name="dateDebut"
          value={formData.dateDebut}
          onChange={handleChange}
          required
        />

        <label>Date de fin :</label>
        <input
          type="date"
          name="dateFin"
          value={formData.dateFin}
          onChange={handleChange}
          required
        />

        <button type="submit">Réserver</button>

        {message && <p className="message">{message}</p>}
      </form>
    </div>
  );
}

export default Book;
