import React from 'react';
import PropTypes from 'prop-types';

/**
 * Composant CarFormDelete
 * Gère le champ pour la suppression d'une voiture par son ID.
 * @param {Object} formData - Les données actuelles du formulaire (seulement l'ID ici).
 * @param {function} handleChange - Fonction de gestion des changements du champ ID.
 */
function CarFormDelete({ formData, handleChange }) {
  return (
    <input
      name="id"
      value={formData.id}
      onChange={handleChange}
      placeholder="ID de la voiture à supprimer"
      required
    />
  );
}

CarFormDelete.propTypes = {
  formData: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default CarFormDelete;
