import { useState, useEffect } from "react";

export const useAuth = () => {
  const [user, setUser] = useState(null);

  // Vérifie automatiquement si l'utilisateur est déjà connecté
  useEffect(() => {
    fetch("http://localhost:8000/me", {
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Pas connecté");
        return res.json();
      })
      .then((data) => {
        setUser(data);
      })
      .catch(() => {
        setUser(null);
      });
  }, []);

  // Fonction à appeler manuellement après connexion réussie
  const login = (userData) => {
    setUser(userData);
  };

  const logout = async () => {
    await fetch("http://localhost:8000/logout", {
      method: "POST",
      credentials: "include",
    });
    setUser(null);
  };

  return { user, login, logout };
};
