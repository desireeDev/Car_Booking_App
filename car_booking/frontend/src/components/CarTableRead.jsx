import React from 'react';
import PropTypes from 'prop-types';

/**
 * Composant CarTableRead
 * Affiche la liste des voitures dans un tableau.
 * @param {Array<Object>} carsList - La liste des voitures à afficher.
 * @param {function} handleDelete - Fonction pour supprimer une voiture directement depuis le tableau.
 * @param {function} setSelectedAction - Fonction pour changer l'action sélectionnée dans le parent.
 * @param {function} setFormData - Fonction pour pré-remplir le formulaire dans le parent.
 */
function CarTableRead({ carsList, handleDelete, setSelectedAction, setFormData }) {
  return (
    <table className="car-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Marque</th>
          <th>Modèle</th>
          <th>Plaque</th>
          <th>Statut</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {carsList.map((car) => (
          <tr key={car.id}>
            <td>{car.id}</td>
            <td>{car.brand}</td>
            <td>{car.model}</td>
            <td>{car.licensePlate}</td>
            <td>
              <span className={`status-badge ${
                  car.isAvailable === true || car.isAvailable === 1 || car.isAvailable === "1"
                      ? "available"
                      : "reserved"
              }`}>
                  {car.isAvailable === true || car.isAvailable === 1 || car.isAvailable === "1"
                    ? "Disponible"
                    : "Réservée"}
              </span>
            </td>
            <td>
              <button
                className="delete-btn"
                onClick={() => handleDelete(car.id)}
              >
                🗑 Supprimer
              </button>
              <button
                className="edit-btn"
                onClick={() => {
                  setSelectedAction("update"); // Change l'action vers "update" dans le composant parent
                  setFormData({ // Pré-remplit les champs du formulaire dans le composant parent
                    id: car.id,
                    marque: car.brand,
                    modele: car.model,
                    plaque: car.licensePlate,
                    isAvailable: car.isAvailable === true || car.isAvailable === 1 || car.isAvailable === "1",
                  });
                }}
              >
                ✏️ Modifier
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

CarTableRead.propTypes = {
  carsList: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleDelete: PropTypes.func.isRequired,
  setSelectedAction: PropTypes.func.isRequired,
  setFormData: PropTypes.func.isRequired,
};

export default CarTableRead;
