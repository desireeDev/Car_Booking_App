import React, { useState } from "react";
import { loginUser, getCurrentUser } from "../services/authService";
import { useAuth } from "../services/useAuth";
import "../styles/Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setRecognised] = useState(""); // Mot de passe
  const [showPassword, setShowPassword] = useState(false); // Nouvel état pour afficher/masquer le mot de passe
  const [rememberMe, setRememberMe] = useState(false); // Nouvel état pour "Se souvenir de moi"
  const [error, setError] = useState("");

  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await loginUser({ email, password });
      const userData = await getCurrentUser();
      login(userData);
      window.location.href = "/dashboard";
    } catch (err) {
      console.error("Erreur de connexion :", err);
      setError("Email ou mot de passe incorrect.");
    }
  };

  return (
    <div className="login-page-wrapper"> {/* Conteneur de page pour centrer le formulaire */}
      <div className="login-card"> {/* Conteneur principal du formulaire avec ombre et fond blanc */}
        <h1 className="login-title">Connexion</h1> {/* Titre Connexion */}
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="usernameOrEmail">Nom d'utilisateur ou adresse e-mail <span className="required-star">*</span></label>
            <input
              type="text"
              id="usernameOrEmail"
              className="login-input"
              required
              autoComplete="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group password-group">
            <label htmlFor="password">Mot de passe <span className="required-star">*</span></label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              className="login-input"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setRecognised(e.target.value)} // Mise à jour de setRecognised
            />
            {/* Icône de l'œil (texte simple pour l'exemple, à remplacer par une vraie icône FontAwesome/SVG) */}
            <span className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
              👁️ {/* Ou une icône plus stylisée */}
            </span>
          </div>

          <div className="form-options">
            <button type="submit" className="login-button">Se connecter</button>
            <div className="remember-me">
              <input
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <label htmlFor="rememberMe">Se souvenir de moi</label>
            </div>
          </div>

          {error && <p className="login-error-message">{error}</p>}

          <a href="#" className="forgot-password-link">Mot de passe oublié ?</a>
        </form>
      </div>
    </div>
  );
}

export default Login;