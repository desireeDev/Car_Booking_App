// App.jsx
import { Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import Dashboard from "./components/Dashboard";
import Navbar from "./components/NavBar";
import About from "./components/about";
import Contact from "./components/Contact";
import Reservation from "./components/Reservation";
import ReservationsList from "./components/ReservationsList";
import Login from "./components/Login";
import Footer from "./components/Footer";


function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/about" element={<About/>} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/reservation" element={<Reservation />} />
        <Route path="/listereservations" element={<ReservationsList />} />
        <Route path="/login" element={<Login />} />


      </Routes>
      <Footer />

    </>
  );
}

export default App;
