import { useState, useEffect } from "react";
import "../styles/FormCrud.css";

import CarFormCreate from "./CarFormCreate";
import CarFormUpdate from "./CarFormUpdate";
import CarFormDelete from "./CarFormDelete";
import CarTableRead from "./CarTableRead";

function FormCrud({ action: initialAction }) {
  const [formData, setFormData] = useState({
    id: "",
    marque: "",
    modele: "",
    plaque: "",
    isAvailable: true,
  });

  const [message, setMessage] = useState("");
  const [carsList, setCarsList] = useState([]);
  const [selectedAction, setSelectedAction] = useState(initialAction);

  useEffect(() => {
    if (selectedAction !== "read") return;

    const fetchCars = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/cars");
        if (!response.ok) throw new Error(`Erreur HTTP: ${response.status}`);
        const data = await response.json();
        setCarsList(data);
      } catch (err) {
        console.error(err);
        setCarsList([]);
        setMessage("❌ Impossible de charger les voitures.");
      }
    };

    fetchCars();
  }, [selectedAction]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "isAvailable" ? value === "true" : value,
    }));
  };

  const createCar = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/cars", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          brand: formData.marque,
          model: formData.modele,
          licensePlate: formData.plaque,
          isAvailable: formData.isAvailable,
        }),
      });

      if (!response.ok) throw new Error("Erreur lors de la création.");
      const text = await response.text();
      const data = text ? JSON.parse(text) : { message: "Voiture créée." };

      setMessage(`✅ ${data.message}`);
      setFormData({ id: "", marque: "", modele: "", plaque: "", isAvailable: true });
    } catch (error) {
      console.error(error);
      setMessage(`❌ ${error.message}`);
    }
  };

  const updateCar = async () => {
    if (!formData.id) {
      setMessage("❌ ID manquant.");
      return;
    }

    try {
      const updateData = {
        isAvailable: formData.isAvailable,
      };
      if (formData.marque) updateData.brand = formData.marque;
      if (formData.modele) updateData.model = formData.modele;
      if (formData.plaque) updateData.licensePlate = formData.plaque;

      const response = await fetch(`http://localhost:8000/api/cars/${formData.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateData),
      });

      if (!response.ok) throw new Error("Erreur lors de la mise à jour.");
      const data = await response.json();
      setMessage(`✅ ${data.message}`);
      setFormData({ id: "", marque: "", modele: "", plaque: "", isAvailable: true });
    } catch (error) {
      console.error(error);
      setMessage(`❌ ${error.message}`);
    }
  };

  const deleteCarById = async () => {
    if (!formData.id) {
      setMessage("❌ ID manquant.");
      return;
    }

    if (!window.confirm(`Supprimer la voiture ${formData.id} ?`)) return;

    try {
      const response = await fetch(`http://localhost:8000/api/cars/${formData.id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Erreur lors de la suppression.");
      setCarsList((prev) => prev.filter((car) => car.id !== formData.id));
      setMessage("🚮 Voiture supprimée.");
      setFormData({ ...formData, id: "" });
    } catch (error) {
      console.error(error);
      setMessage(`❌ ${error.message}`);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedAction === "create") await createCar();
    else if (selectedAction === "update") await updateCar();
    else if (selectedAction === "delete") await deleteCarById();
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Confirmer la suppression ?")) return;

    try {
      const response = await fetch(`http://localhost:8000/api/cars/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Erreur lors de la suppression.");
      setCarsList((prev) => prev.filter((car) => car.id !== id));
      setMessage("🚮 Voiture supprimée.");
    } catch (error) {
      console.error(error);
      setMessage("❌ Suppression échouée.");
    }
  };

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

  return (
    <div className="crud-form-container">
      <form onSubmit={handleSubmit} className="form-crud">
        {renderCurrentFormOrTable()}
        {selectedAction !== "read" && (
          <button type="submit" className="submit-btn">
            Soumettre
          </button>
        )}
        {message && <p className="feedback">{message}</p>}
      </form>
    </div>
  );
}

export default FormCrud;
