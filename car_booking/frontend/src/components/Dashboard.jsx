// src/pages/Dashboard.jsx
import { useState } from "react";
import FormCrud from "../components/FormCrud";
import "../styles/Dashboard.css";

function Dashboard() {
  const [selectedAction, setSelectedAction] = useState("create");

  return (
    <div className="dashboard">
      <h1>Gestion des voitures</h1>
      <select
        value={selectedAction}
        onChange={(e) => setSelectedAction(e.target.value)}
        className="select-action"
      >
        <option value="create">Créer</option>
        <option value="read">Lire</option>
        <option value="update">Mettre à jour</option>
        <option value="delete">Supprimer</option>
      </select>

      <FormCrud action={selectedAction} />
    </div>
  );
}

export default Dashboard;
