// src/components/AddCarForm.jsx
import { useState } from "react";
import "../styles/AddCarForm.css";

function Add() {
  const [formData, setFormData] = useState({
    marque: "",
    modele: "",
    plaque: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simuler l’envoi
    setTimeout(() => {
      setMessage("🚗 Voiture ajoutée avec succès !");
      setFormData({ marque: "", modele: "", plaque: "" });
    }, 800);
  };

  return (
    <div className="add-form-container">
      <form onSubmit={handleSubmit} className="add-form">
        <h2>Ajouter une voiture</h2>
        <input
          name="marque"
          value={formData.marque}
          onChange={handleChange}
          placeholder="Marque"
          required
        />
        <input
          name="modele"
          value={formData.modele}
          onChange={handleChange}
          placeholder="Modèle"
          required
        />
        <input
          name="plaque"
          value={formData.plaque}
          onChange={handleChange}
          placeholder="Plaque d'immatriculation"
          required
        />
        <button type="submit">Ajouter</button>
        {message && <p className="message">{message}</p>}
      </form>
    </div>
  );
}

export default Add;
