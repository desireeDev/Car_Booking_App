import React, { useState } from "react";
import { loginUser, getCurrentUser } from "../services/authService";
import { useAuth } from "../services/useAuth"; // ← pour appeler login()
import "../styles/Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { login } = useAuth(); // ← récupérer le setter global

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await loginUser({ email, password }); // on envoie les identifiants

      const userData = await getCurrentUser(); // on vérifie si la session est bien active
      login(userData); // on stocke dans le contexte
      window.location.href = "/dashboard"; // redirection
    } catch (err) {
      console.error("Erreur de connexion:", err);
      setError("❌ Email ou mot de passe incorrect.");
    }
  };

  return (
    <div className="login-container">
      <h2>Connexion</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Mot de passe"
          required
          autoComplete="current-password" // ← pour corriger le warning DOM
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Se connecter</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
}

export default Login;
