

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

🧼 Nettoyage Docker (important)

> Lorsque vous développez avec Docker, il est essentiel de  nettoyer régulièrement les ressources inutilisées  pour éviter d'encombrer votre machine.

✅ Commande à exécuter régulièrement :

```bash
docker system prune -a
```

🛑 Attention :

 Cela supprime tous les conteneurs arrêtés, les images non utilisées, les volumes orphelins, etc.
 Assurez-vous de ne pas supprimer des données en cours si vous travaillez avec des volumes persistants.

---
 🛠️ Migrations Symfony dans Docker

Si vous utilisez Symfony dans un conteneur Docker (avec Docker Compose par exemple), voici les **commandes de migration** à utiliser depuis l’intérieur du conteneur PHP :

#### 1. Générer une nouvelle migration (après avoir modifié une entité)

```bash
docker compose exec php php bin/console make:migration
```

2. Appliquer les migrations à la base de données

```bash
docker compose exec php php bin/console doctrine:migrations:migrate
```

📝 Remarques :

 Assurez-vous que votre base de données est bien accessible (vérifiez `.env` et `DATABASE_URL`).
 Vous pouvez aussi exécuter un `composer install` dans le conteneur si nécessaire :

```bash
docker compose exec php composer install
```

🔐 Proposition pour améliorer la sécurité dans Symfony :

Protéger les routes sensibles avec des rôles

Utiliser l’annotation `@IsGranted` ou la configuration `security.yaml` pour restreindre l’accès à certaines routes :

```php
// Exemple dans CarController.php
/**
 * @Route("/api/cars", methods={"POST"})
 * @IsGranted("ROLE_ADMIN")
 */
public function createCar(Request $request) { ... }
```

➡️ Ainsi, seuls les admins pourront créer ou supprimer des voitures.


<img width="950" alt="Hp" src="https://github.com/user-attachments/ass<img width="953" alt="Docker" src="https://github.com/user-attachments/assets/84f56b3c-3a0c-4ebd-bc82-a1e698485f1a" />
ets/6506c5b7-449e-4d32-82c7-8c5e4e1dce4a" />
<img width="955" alt="res" src="https://github.com/user-attachments/assets/5f6f4398-d624-49a6-80ca-581ceab0c76f" />


<img width="937" alt="element" src="https://github.com/user-attachments/assets/da1a546e-a0d9-4940-8c56-022ae2261c1f" />

<img width="948" alt="Dashboard" src="https://github.com/user-attachments/assets/29efb4c6-bb1d-4d8d-9cd9-98d928f90ae4" />


