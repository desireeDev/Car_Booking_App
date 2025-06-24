/* // src/components/FormCrud.jsx
import { useState } from "react";
import PropTypes from "prop-types";
import "../styles/FormCrud.css";

function FormCrud({ action }) {
  // State to manage form data 
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
          msg = "La voiture a été ajoutée avec succès !";
          break;
        case "update":
          msg = "La  voiture  a été mise à jour !";
          break;
        case "delete":
          msg = "La voiture a été  supprimée !";
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
             Liste des voitures à venir (Récuperation des données via API)
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
//Nouvelle version de React demande l'importation de PropTypes before use
FormCrud.propTypes = {
  action: PropTypes.string.isRequired
};

export default FormCrud;
 */
import { useEffect, useState } from "react";
import Add from "../components/Add";
import Update from "../components/Update";
import Delete from "../components/Delete";
import Book from "../components/Book";
import "../styles/CarList.css";

function FormCrud() {
  const [cars, setCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showReservationForm, setShowReservationForm] = useState(false);

  useEffect(() => {
    fetch("http://localhost:8000/api/cars")
      .then((res) => res.json())
      .then((data) => setCars(data))
      .catch((err) => console.error("Erreur API :", err));
  }, []);

  const handleDelete = (id) => {
    fetch(`http://localhost:3001/voitures/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setCars((prev) => prev.filter((car) => car.id !== id));
      })
      .catch((err) => console.error("Erreur suppression :", err));
  };
  return (
    <div className="carlist-container">
  
      <div className="page-banner">
        <img src="src/assets/images/portob.png" alt="Voitures" />
      </div>

      <h1>Liste des voitures</h1>
      <div className="carlist-header-buttons">
        <button onClick={() => setShowReservationForm(true)}>Réserver</button>
        <button onClick={() => setShowAddForm(true)}>
          Ajouter
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Marque</th>
            <th>Modèle</th>
            <th>Plaque</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {cars.map((car) => (
            <tr key={car.id}>
              <td>{car.brand}</td>
              <td>{car.modele}</td>
              <td>{car.licensePlate}</td>
              <td>
                <button
                  onClick={() => {
                    setSelectedCar(car);
                    setShowUpdateForm(true);
                  }}
                >
                  Modifier
                </button>
                <button
                  onClick={() => {
                    setSelectedCar(car);
                    setShowDeleteModal(true);
                  }}
                >
                  ❌
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showUpdateForm && selectedCar && (
        <Update
          car={selectedCar}
          onClose={() => setShowUpdateForm(false)}
          onSubmit={(updatedCar) => {
            setCars((prev) =>
              prev.map((c) => (c.id === updatedCar.id ? updatedCar : c))
            );
          }}
        />
      )}

      {showDeleteModal && selectedCar && (
        <Delete
          car={selectedCar}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={handleDelete}
        />
      )}

      {showReservationForm && (
        <Book onClose={() => setShowReservationForm(false)} />
      )}
      
       {showAddForm && (
        <Add onClose={() => setShowAddForm(false)} />
      )}
    </div>
  );
}

export default FormCrud;
