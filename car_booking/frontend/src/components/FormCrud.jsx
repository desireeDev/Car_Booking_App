// Import des hooks React nécessaires et de PropTypes pour la validation des props
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
// Import des styles CSS spécifiques à ce composant
import "../styles/FormCrud.css";

// Import des sous-composants spécifiques à chaque action CRUD
import CarFormCreate from './CarFormCreate';
import CarFormUpdate from './CarFormUpdate';
import CarFormDelete from './CarFormDelete';
import CarTableRead from './CarTableRead';

/**
 * Composant FormCrud
 * Gère les opérations CRUD (Create, Read, Update, Delete) pour les voitures.
 * L'action principale est sélectionnée via un menu déroulant.
 * @param {string} initialAction - L'action initiale à afficher (par exemple, "read", "create").
 */
function FormCrud({ action: initialAction }) {
  // --- États du composant ---

  // État pour stocker les données du formulaire (utilisé pour créer ou modifier une voiture)
  const [formData, setFormData] = useState({
    id: "",            // ID de la voiture, utile pour la modification ou la suppression spécifique
    marque: "",        // Marque de la voiture
    modele: "",        // Modèle de la voiture
    plaque: "",        // Plaque d'immatriculation
    isAvailable: true, // Statut de disponibilité : true = disponible, false = réservée
  });

  // État pour afficher les messages de retour à l'utilisateur (succès ou erreur)
  const [message, setMessage] = useState("");

  // État pour stocker la liste des voitures récupérées de l'API (utilisée en mode 'read')
  const [carsList, setCarsList] = useState([]);

  // État pour gérer l'action sélectionnée par l'utilisateur via le menu déroulant
  const [selectedAction, setSelectedAction] = useState(initialAction);

  // --- Effets secondaires (Hooks useEffect) ---

  // Effet pour récupérer la liste des voitures depuis l'API.
  // Se déclenche au premier rendu et à chaque fois que 'selectedAction' change
  // (ce qui permet de rafraîchir la liste si on revient en mode 'read').
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/cars");
        if (!response.ok) {
          throw new Error(`Erreur HTTP: ${response.status}`);
        }
        const data = await response.json();
        setCarsList(data);
      } catch (err) {
        console.error("Erreur lors de la récupération des voitures:", err);
        setCarsList([]); // En cas d'erreur, s'assurer que la liste est vide
        setMessage("❌ Impossible de charger les voitures.");
      }
    };

    // Charger les voitures uniquement si l'action actuelle est 'read'
    if (selectedAction === "read") {
      fetchCars();
    }
  }, [selectedAction]); // Dépendance à selectedAction pour recharger la liste si l'action passe en "read"

  // --- Gestionnaires d'événements ---

  /**
   * Met à jour l'état du formData lors de la saisie dans les champs du formulaire.
   * Gère spécifiquement la conversion du statut 'isAvailable' en booléen.
   * @param {Object} e - L'événement de changement.
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    // Convertit la chaîne "true" ou "false" du select en booléen réel
    const newValue = name === "isAvailable" ? value === "true" : value;
    setFormData((prev) => ({ ...prev, [name]: newValue }));
  };

  /**
   * Gère le changement de l'action sélectionnée dans le menu déroulant.
   * Réinitialise le formulaire et les messages à chaque changement d'action.
   * @param {Object} e - L'événement de changement.
   */
  const handleActionChange = (e) => {
    setSelectedAction(e.target.value);
    // Réinitialise formData pour vider les champs ou préparer de nouvelles saisies
    setFormData({
      id: "",
      marque: "",
      modele: "",
      plaque: "",
      isAvailable: true,
    });
    setMessage(""); // Efface tout message précédent
  };

  /**
   * Fonction pour envoyer une nouvelle voiture à l'API (opération POST).
   */
  const createCar = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/cars", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          brand: formData.marque,
          model: formData.modele,
          licensePlate: formData.plaque,
          isAvailable: formData.isAvailable,
        }),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de l'enregistrement de la voiture.");
      }

      const data = await response.json();
      setMessage(`✅ ${data.message}`);
      // Après création, réinitialiser le formulaire
      setFormData({ id: "", marque: "", modele: "", plaque: "", isAvailable: true });
    } catch (error) {
      console.error("Erreur de création:", error);
      setMessage(`❌ Une erreur est survenue lors de la création: ${error.message}`);
    }
  };

  /**
   * Fonction pour mettre à jour une voiture existante (opération PUT/PATCH).
   * Note: La logique de mise à jour réelle est à implémenter.
   * Actuellement, elle affiche juste un message.
   */
  const updateCar = async () => {
    if (!formData.id) {
      setMessage("❌ Veuillez entrer l'ID de la voiture à modifier.");
      return;
    }
    try {
      // Construction de l'objet de données à envoyer pour la mise à jour
      // Ne pas envoyer les champs vides pour ne modifier que les champs renseignés
      const updateData = {};
      if (formData.marque) updateData.brand = formData.marque;
      if (formData.modele) updateData.model = formData.modele;
      if (formData.plaque) updateData.licensePlate = formData.plaque;
      // isAvailable est toujours envoyé car c'est un select
      updateData.isAvailable = formData.isAvailable;

      const response = await fetch(`http://localhost:8000/api/cars/${formData.id}`, {
        method: "PUT", // Ou PATCH selon votre API
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la mise à jour de la voiture.");
      }

      const data = await response.json();
      setMessage(`✅ Voiture modifiée avec succès : ${data.message}`);
      // Après mise à jour, réinitialiser le formulaire
      setFormData({ id: "", marque: "", modele: "", plaque: "", isAvailable: true });
    } catch (error) {
      console.error("Erreur de mise à jour:", error);
      setMessage(`❌ Une erreur est survenue lors de la modification: ${error.message}`);
    }
  };

  /**
   * Fonction pour supprimer une voiture par son ID (opération DELETE).
   * Utilisée par le formulaire de suppression.
   */
  const deleteCarById = async () => {
    if (!formData.id) {
      setMessage("❌ Veuillez entrer l'ID de la voiture à supprimer.");
      return;
    }

    const confirmDelete = window.confirm(`Confirmer la suppression de la voiture avec l'ID ${formData.id} ?`);
    if (!confirmDelete) return; // Si l'utilisateur annule

    try {
      const response = await fetch(`http://localhost:8000/api/cars/${formData.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la suppression de la voiture.");
      }

      // Filtrer la liste des voitures localement après suppression réussie
      setCarsList((prev) => prev.filter((car) => car.id !== formData.id));
      setMessage("🚮 Voiture supprimée avec succès !");
      // Réinitialiser l'ID après suppression
      setFormData({ ...formData, id: "" });
    } catch (error) {
      console.error("Erreur de suppression:", error);
      setMessage(`❌ Une erreur est survenue lors de la suppression: ${error.message}`);
    }
  };

  /**
   * Gestionnaire de soumission principal du formulaire.
   * Appelle la fonction CRUD appropriée basée sur l'action sélectionnée.
   * @param {Object} e - L'événement de soumission.
   */
  const handleSubmit = async (e) => {
    e.preventDefault(); // Empêche le rechargement de la page

    // Vérifie l'action sélectionnée et appelle la fonction correspondante
    if (selectedAction === "create") {
      await createCar();
    } else if (selectedAction === "update") {
      await updateCar();
    } else if (selectedAction === "delete") {
      await deleteCarById();
    }
    // Si selectedAction est "read", le bouton "Soumettre" n'est pas affiché
  };

  /**
   * Fonction de suppression d'une voiture depuis la liste (bouton "Supprimer" dans le tableau).
   * @param {string} id - L'ID de la voiture à supprimer.
   */
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Confirmer la suppression de cette voiture ?");
    if (!confirmDelete) return; // Si l'utilisateur annule

    try {
      const response = await fetch(`http://localhost:8000/api/cars/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la suppression.");
      }

      // Met à jour la liste localement pour retirer la voiture supprimée
      setCarsList((prev) => prev.filter((car) => car.id !== id));
      setMessage("🚮 Voiture supprimée avec succès !");
    } catch (error) {
      console.error("Échec de la suppression depuis le tableau:", error);
      setMessage("❌ Échec de la suppression.");
    }
  };

  // --- Rendu conditionnel des sous-composants de formulaire/tableau ---

  const renderCurrentFormOrTable = () => {
    switch (selectedAction) {
      case "create":
        return <CarFormCreate formData={formData} handleChange={handleChange} />;
      case "update":
        return <CarFormUpdate formData={formData} handleChange={handleChange} />;
      case "delete":
        return <CarFormDelete formData={formData} handleChange={handleChange} />;
      case "read":
        return (
          <CarTableRead 
            carsList={carsList} 
            handleDelete={handleDelete} 
            setSelectedAction={setSelectedAction} 
            setFormData={setFormData} 
          />
        );
      default:
        return null;
    }
  };

  // --- Rendu du composant principal ---
  return (
    <div className="crud-form-container">
      <form onSubmit={handleSubmit} className="form-crud">
        <h2>Gestion des voitures</h2>
        
        {/* Menu déroulant pour sélectionner l'action (CRUD) */}
        <select value={selectedAction} onChange={handleActionChange} className="action-select">
          <option value="read">Afficher les voitures</option>
          <option value="create">Ajouter une voiture</option>
          <option value="update">Modifier une voiture</option>
          <option value="delete">Supprimer une voiture par ID</option>
        </select>

        {/* Rend les champs du formulaire ou le tableau en fonction de l'action sélectionnée */}
        {renderCurrentFormOrTable()}

        {/* Bouton de soumission du formulaire, visible seulement si l'action n'est PAS "read" */}
        {selectedAction !== "read" && (
          <button type="submit" className="submit-btn">
            Soumettre
          </button>
        )}

        {/* Affiche les messages de feedback à l'utilisateur */}
        {message && <p className="feedback">{message}</p>}
      </form>
    </div>
  );
}

// --- Validation des types de props (PropTypes) ---
FormCrud.propTypes = {
  action: PropTypes.string.isRequired,
};

export default FormCrud;
