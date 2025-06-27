// authService.js

// 🔐 Connexion de l'utilisateur
export const loginUser = async (credentials) => {
  const body = new URLSearchParams();
  body.append("email", credentials.email);
  body.append("password", credentials.password);

  const response = await fetch("http://localhost:8000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    credentials: "include", // nécessaire pour envoyer les cookies
    body,
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Login failed:", errorText);
    throw new Error("Échec de la connexion");
  }

  // 👇 Important : attendre que la session soit bien enregistrée côté serveur
  const meResponse = await fetch("http://localhost:8000/me", {
    method: "GET",
    credentials: "include",
  });

  if (!meResponse.ok) {
    throw new Error("Connexion non confirmée par le serveur");
  }

  const userData = await meResponse.json();
  return userData;
};

// 🚪 Déconnexion de l'utilisateur
export const logoutUser = async () => {
  const response = await fetch("http://localhost:8000/logout", {
    method: "POST",
    credentials: "include",
  });

  if (!response.ok) {
    console.warn("Déconnexion échouée");
  }
};


// 👤 Récupération de l'utilisateur connecté
export const getCurrentUser = async () => {
  const response = await fetch("http://localhost:8000/me", {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Non connecté");
  }

  return await response.json();
};
