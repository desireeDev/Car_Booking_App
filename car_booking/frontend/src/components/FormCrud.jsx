// src/components/FormCrud.jsx
import { useState } from "react";
import PropTypes from "prop-types";
import "../styles/FormCrud.css";

function FormCrud({ action }) {
  const [formData, setFormData] = useState({
    id: "",
    marque: "",
    modele: "",
    plaque: ""
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setTimeout(() => {
      let msg = "";
      switch (action) {
        case "create":
          msg = "✅ Voiture ajoutée avec succès !";
          break;
        case "update":
          msg = "🔄 Voiture mise à jour !";
          break;
        case "delete":
          msg = "🗑️ Voiture supprimée !";
          break;
        default:
          msg = "";
      }

      setMessage(msg);
      setFormData({ id: "", marque: "", modele: "", plaque: "" });
    }, 800);
  };

  const renderFields = () => {
    switch (action) {
      case "create":
      case "update":
        return (
          <>
            {action === "update" && (
              <input
                name="id"
                value={formData.id}
                onChange={handleChange}
                placeholder="ID de la voiture"
                required
              />
            )}
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
          </>
        );
      case "delete":
        return (
          <input
            name="id"
            value={formData.id}
            onChange={handleChange}
            placeholder="ID de la voiture à supprimer"
            required
          />
        );
      case "read":
        return (
          <p className="read-text">
            📄 Liste des voitures à venir (connexion à la base de données en cours)...
          </p>
        );
      default:
        return null;
    }
  };

  return (
    <div className="crud-form-container">
      <form onSubmit={handleSubmit} className="form-crud">
        <h2>{action.toUpperCase()} une voiture</h2>
        {renderFields()}
        {action !== "read" && (
          <button type="submit" className="submit-btn">
            Soumettre
          </button>
        )}
        {message && <p className="feedback">{message}</p>}
      </form>
    </div>
  );
}

FormCrud.propTypes = {
  action: PropTypes.string.isRequired
};

export default FormCrud;
