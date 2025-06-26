// Import des hooks React nécessaires et de PropTypes pour la validation des props
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "../styles/FormCrud.css";

// Import des sous-composants spécifiques à chaque action CRUD
import CarFormCreate from './CarFormCreate';
import CarFormUpdate from './CarFormUpdate';
import CarFormDelete from './CarFormDelete';
import CarTableRead from './CarTableRead';


/**
 * Composant FormCrud
 * Gère les opérations CRUD (Create, Read, Update, Delete) pour les voitures.
 * L'action principale est déterminée par la prop 'action' ou par les interactions internes (ex: bouton Modifier).
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

  // Message de retour (succès ou erreur)
  const [message, setMessage] = useState("");

  // Liste des voitures (affichée en mode read)
  const [carsList, setCarsList] = useState([]);

  // État interne pour gérer l'action active.
  // Il est initialisé par la prop, mais peut changer via les interactions utilisateur.
  const [selectedAction, setSelectedAction] = useState(initialAction);

  // --- Effets secondaires (Hooks useEffect) ---

  // Met à jour l'action sélectionnée si la prop initialAction change depuis le parent
  // Cela permet de réagir si le composant parent change l'action active.
  useEffect(() => {
    setSelectedAction(initialAction);
    // Réinitialise le formulaire et les messages lors du changement d'action externe
    setFormData({ id: "", marque: "", modele: "", plaque: "", isAvailable: true });
    setMessage("");
  }, [initialAction]);


  // Effet pour récupérer la liste des voitures depuis l'API.
  // Se déclenche si l'action sélectionnée est 'read'.
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
      // isAvailable est toujours envoyé car c'est un select, donc il doit être inclus
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
      // Après mise à jour, réinitialiser le formulaire et revenir en mode 'read'
      setFormData({ id: "", marque: "", modele: "", plaque: "", isAvailable: true });
      setSelectedAction("read"); // Revenir en mode lecture après la modification
    } catch (error) {
      console.error("Erreur de mise à jour:", error);
      setMessage(`❌ Une erreur est survenue lors de la modification: ${error.message}`);
    }
  };

  /**
   * Fonction pour supprimer une voiture par son ID (opération DELETE).
   * Utilisée par le formulaire de suppression par ID.
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
      // Réinitialiser l'ID après suppression et revenir en mode lecture
      setFormData({ ...formData, id: "" });
      setSelectedAction("read"); // Revenir en mode lecture après la suppression
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
    // Le bouton "Soumettre" n'est pas affiché si selectedAction est "read"
  };

  /**
   * Fonction de suppression d'une voiture directement depuis la liste (bouton "Supprimer" dans le tableau).
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
            setSelectedAction={setSelectedAction} // Permet à CarTableRead de changer l'action
            setFormData={setFormData}             // Permet à CarTableRead de pré-remplir le formData
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
        
        {/* Ancien <select> pour l'action principale supprimé */}

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
