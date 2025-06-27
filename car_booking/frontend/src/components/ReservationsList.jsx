// src/components/ReservationsList.jsx
import { useEffect, useState } from "react";
import "../styles/ReservationsList.css";
import ReservationCalendar from "../components/ReservationCalendar";


function ReservationsList() {
  const [reservations, setReservations] = useState([]);

  const fetchReservations = () => {
    fetch("http://localhost:8000/api/reservations")
      .then((res) => res.json())
      .then((data) => setReservations(data))
      .catch((err) => {
        console.error(err);
        setReservations([]);
      });
  };

  const deleteReservation = async (id) => {
    const confirm = window.confirm("Voulez-vous vraiment annuler cette réservation ?");
    if (!confirm) return;

    try {
      const res = await fetch(`http://localhost:8000/api/reservations/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Erreur lors de la suppression");
      fetchReservations(); // recharger la liste
    } catch (err) {
      console.error(err);
      alert("❌ Erreur lors de la suppression.");
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  return (
    <div className="reservations-list-container">
      <h2>📋 Liste des réservations</h2>
              <ReservationCalendar />

      {reservations.length === 0 ? (
        <p>Aucune réservation pour le moment.</p>
      ) : (
        <table className="reservations-table">
          
          <thead>
            <tr>
              <th>Nom</th>
              <th>Email</th>
              <th>Voiture</th>
              <th>Début</th>
              <th>Fin</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map((r) => (
              <tr key={r.id}>
                <td>{r.name}</td>
                <td>{r.email}</td>
                <td>{r.car?.brand} – {r.car?.model}</td>
                <td>{r.startDate}</td>
                <td>{r.endDate}</td>
                <td>
                  <button className="cancel-btn" onClick={() => deleteReservation(r.id)}>
                    Annuler
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ReservationsList;
