import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import "../styles/ReservationCalendar.css";

function ReservationCalendarModal() {
  const [showModal, setShowModal] = useState(false);
  const [reservations, setReservations] = useState([]);

  const fetchReservations = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/reservations");
      const data = await res.json();
      setReservations(data);
    } catch (error) {
      console.error("Erreur lors de la récupération des réservations", error);
      setReservations([]);
    }
  };

  useEffect(() => {
    if (showModal) {
      fetchReservations();
    }
  }, [showModal]);

  const events = reservations.map((r) => ({
    id: r.id,
    title: `${r.car?.brand} ${r.car?.model}`,
    start: r.startDate,
    end: r.endDate,
  }));

  return (
    <>
      <button className="calendar-button" onClick={() => setShowModal(true)}>
        📅 Voir le calendrier
      </button>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-button" onClick={() => setShowModal(false)}>
              &times;
            </button>
            <h2>Calendrier des réservations</h2>
            <FullCalendar
              plugins={[dayGridPlugin]}
              initialView="dayGridMonth"
              locale="fr"
              events={events}
              height="auto"
            />
          </div>
        </div>
      )}
    </>
  );
}

export default ReservationCalendarModal;
