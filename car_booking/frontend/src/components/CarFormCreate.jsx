import React from 'react';
import PropTypes from 'prop-types';

/**
 * Composant CarFormCreate
 * Gère le formulaire pour la création d'une nouvelle voiture.
 * @param {Object} formData - Les données actuelles du formulaire.
 * @param {function} handleChange - Fonction de gestion des changements des champs du formulaire.
 */
function CarFormCreate({ formData, handleChange }) {
  return (
    <>
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
      <select
        name="isAvailable"
        value={String(formData.isAvailable)}
        onChange={handleChange}
        required
      >
        <option value="true">Disponible</option>
        <option value="false">Réservée</option>
      </select>
    </>
  );
}

CarFormCreate.propTypes = {
  formData: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default CarFormCreate;
