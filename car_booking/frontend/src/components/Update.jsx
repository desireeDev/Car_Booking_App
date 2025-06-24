// src/components/UpdateCarForm.jsx
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "../styles/UpdateCarForm.css";

function Update({ car, onClose, onSubmit }) {
  const [formData, setFormData] = useState(car);

  useEffect(() => {
    setFormData(car);
  }, [car]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose(); // Fermer la popup après envoi
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Modifier la voiture</h2>
        <form onSubmit={handleSubmit}>
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
          <div className="modal-buttons">
            <button type="submit">Mettre à jour</button>
            <button type="button" onClick={onClose} className="cancel-btn">
              Annuler
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

Update.propTypes = {
  car: PropTypes.shape({
    id: PropTypes.string,
    marque: PropTypes.string,
    modele: PropTypes.string,
    plaque: PropTypes.string,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default Update;
