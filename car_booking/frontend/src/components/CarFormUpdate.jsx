import React from 'react';
import PropTypes from 'prop-types';

/**
 * Composant CarFormUpdate
 * Gère le formulaire pour la modification d'une voiture existante.
 * @param {Object} formData - Les données actuelles du formulaire (incluant l'ID de la voiture à modifier).
 * @param {function} handleChange - Fonction de gestion des changements des champs du formulaire.
 */
function CarFormUpdate({ formData, handleChange }) {
  return (
    <>
      <input
        name="id"
        value={formData.id}
        onChange={handleChange}
        placeholder="ID de la voiture à modifier"
        required
      />
      <input
        name="marque"
        value={formData.marque}
        onChange={handleChange}
        placeholder="Nouvelle Marque (laisser vide si inchangé)"
      />
      <input
        name="modele"
        value={formData.modele}
        onChange={handleChange}
        placeholder="Nouveau Modèle (laisser vide si inchangé)"
      />
      <input
        name="plaque"
        value={formData.plaque}
        onChange={handleChange}
        placeholder="Nouvelle Plaque (laisser vide si inchangé)"
      />
      <select
        name="isAvailable"
        value={String(formData.isAvailable)}
        onChange={handleChange}
      >
        <option value="true">Disponible</option>
        <option value="false">Réservée</option>
      </select>
    </>
  );
}

CarFormUpdate.propTypes = {
  formData: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default CarFormUpdate;
