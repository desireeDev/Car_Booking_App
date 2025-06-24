// src/components/FormCrud.jsx
import { useState, useEffect } from "react";
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
  const [carsList, setCarsList] = useState([]);


  useEffect(() => {
  if (action === "read") {
    fetch("http://localhost:8000/api/cars")
      .then((res) => res.json())
      .then((data) => setCarsList(data))
      .catch((err) => {
        console.error(err);
        setCarsList([]);
      });
  }
}, [action]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    let msg = "";

    if (action === "create") {
      const response = await fetch("http://localhost:8000/api/cars", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          brand: formData.marque,
          model: formData.modele,
          licensePlate: formData.plaque,
        }),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de l'enregistrement");
      }

      const data = await response.json();
      msg = `✅ ${data.message}`;
    }


    setMessage(msg);
    setFormData({ id: "", marque: "", modele: "", plaque: "" });

  } catch (error) {
    console.error(error);
    setMessage("❌ Une erreur est survenue.");
  }
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
          <table className="car-table">
  <thead>
    <tr>
      <th>ID</th>
      <th>Marque</th>
      <th>Modèle</th>
      <th>Plaque</th>
    </tr>
  </thead>
  <tbody>
    {carsList.map((car) => (
      <tr key={car.id}>
        <td>{car.id}</td>
        <td>{car.brand}</td>
        <td>{car.model}</td>
        <td>{car.licensePlate}</td>
      </tr>
    ))}
  </tbody>
</table>
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
