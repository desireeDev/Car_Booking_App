

🚗 Gestion de Voitures

Un projet web complet de gestion de flotte automobile, développé avec React pour le frontend et Symfony pour le backend. Ce système permet aux utilisateurs de gérer efficacement des véhicules, y compris leur disponibilité, réservation, modification, suppression et authentification sécurisée.

✨ Fonctionnalités complètes

🔐 Authentification des utilisateurs (login sécurisé, rôle administrateur).
🔍 Consulter la liste des voitures disponibles.
➕ Créer une nouvelle voiture (marque, modèle, plaque, disponibilité).
📝 Mettre à jour les informations d’une voiture.
❌ Supprimer une voiture via son identifiant.
📅 Réserver une voiture (choix de dates, vérification de disponibilité).
📋 Voir l’historique des réservations d’une voiture.


---
 🧩 Architecture technique
 ⚙️ Frontend – React

 Interface responsive avec composants modulaires (`CarFormCreate`, `CarFormUpdate`, `CarFormDelete`, `CarTableRead`, `ReservationForm`, etc.).
 Gestion d’état via `useState`, `useEffect`.
Authentification via **JWT** stocké en `localStorage`.
Affichage dynamique selon le rôle utilisateur (admin vs user).
Navigation conditionnelle (routes privées si non connecté).

 🔗 Backend – Symfony (API REST)

API REST sécurisée avec **JWT Authenticator** (LexikJWTAuthenticationBundle).
 Gestion des entités : `Car`, `User`, `Reservation`.
 Relations gérées via Doctrine ORM.
 Validation des données (`Assert`, `FormRequest`, etc.).
 Endpoints RESTful :

  * `GET /api/cars`, `POST`, `PUT`, `DELETE`
  * `POST /api/reservations`, `GET /api/reservations/user`, etc.
  * `POST /api/login_check` pour authentification

---

📦 Structure des données

 `Car`

```json
{
  "id": 1,
  "brand": "Renault",
  "model": "Clio",
  "licensePlate": "AA-123-BB",
  "isAvailable": true
}
```

#### `Reservation`

```json
{
  "id": 12,
  "carId": 1,
  "userId": 3,
  "startDate": "2024-07-01",
  "endDate": "2024-07-05"
}
```

---

🔐 Authentification

✅ Formulaire de connexion
🔒 Routes protégées selon le rôle utilisateur
🔄 Redirection automatique en cas d'expiration de session
🧑‍💼 Gestion de session côté client (token)

🧪 Expérience Utilisateur

 ✅ Feedback en temps réel : succès/erreur
 🔁 Réinitialisation automatique des formulaires après action
 📅 Sélecteur de dates pour la réservation
  📂 Interface claire selon le contexte (lecture, modification, création…)



 🧰 Technologies utilisées

| Frontend         | Backend      | Sécurité/Auth       |
| ---------------- | ------------ | ------------------- |
| React            | Symfony      | JWT (LexikJWT)      |
| JSX, CSS Modules | Doctrine ORM | Guard Authenticator |
| Hooks React      | API RESTful  | Role-based Access   |


 🛠️ Problèmes rencontrés et solutions

| Problème                                            | Cause                                 | Solution                                               |
| --------------------------------------------------- | ------------------------------------- | ------------------------------------------------------ |
| CORS Errors                                         | Frontend/backend sur ports différents | CORS config dans `cors.yaml`                           |
| Mauvaise gestion d'état                             | Mauvaise dépendance dans `useEffect`  | Corrigé en ajoutant la bonne dépendance                |
| Requêtes non authentifiées                          | Token JWT manquant dans les headers   | Ajout du `Authorization: Bearer {token}`               |
| Voitures réservées apparaissaient comme disponibles | Pas de vérification croisée           | Vérification des plages de dates via requêtes filtrées |
| Mauvaise UX lors d'erreurs serveur                  | Pas de gestion propre                 | Bloc `try/catch` avec `setMessage` d’erreur claire    

📌 Évolutions possibles (ou à venir)

 🔁 Pagination de la liste des véhicules
 🌍 Support multilingue (i18n)
  📱 Application mobile (React Native)
 ✉️ Notifications mail lors de la réservation
 🔔 Rappels de réservation
<img width="950" alt="Hp" src="https://github.com/user-attachments/assets/6506c5b7-449e-4d32-82c7-8c5e4e1dce4a" />
<img width="955" alt="res" src="https://github.com/user-attachments/assets/5f6f4398-d624-49a6-80ca-581ceab0c76f" />



