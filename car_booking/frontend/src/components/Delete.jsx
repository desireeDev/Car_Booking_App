
import PropTypes from "prop-types";
import "../styles/DeleteCarModal.css";

function Delete({ car, onClose, onConfirm }) {
  return (
    <div className="modal-overlay">
      <div className="modal-content delete-modal">
        <h2>Supprimer la voiture</h2>
        <p>Voulez-vous vraiment supprimer cette voiture ?</p>
        <p className="car-info">
          <strong>{car.marque} {car.modele}</strong> - {car.plaque}
        </p>
        <div className="modal-buttons">
          <button onClick={() => { onConfirm(car.id); onClose(); }} className="delete-btn">
            Oui, supprimer
          </button>
          <button onClick={onClose} className="cancel-btn">
            Annuler
          </button>
        </div>
      </div>
    </div>
  );
}

Delete.propTypes = {
  car: PropTypes.shape({
    id: PropTypes.string.isRequired,
    marque: PropTypes.string,
    modele: PropTypes.string,
    plaque: PropTypes.string,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

export default Delete;
