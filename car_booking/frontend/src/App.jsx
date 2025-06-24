// App.jsx
import { Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import Dashboard from "./components/Dashboard";
import Navbar from "./components/NavBar";
import About from "./components/About";


function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/about" element={<About/>} />
      </Routes>
    </>
  );
}

export default App;
