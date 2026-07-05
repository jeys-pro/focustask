# FocusTask

FocusTask est une application web full-stack de gestion de tâches pensée pour aider les personnes ayant des difficultés de concentration (type TDAH) à mieux suivre leurs tâches en cours grâce à un système de relance régulière.

L’objectif principal est d’éviter la “rupture de focus” : lorsqu’une tâche est commencée puis interrompue, l’application relance régulièrement l’utilisateur pour l’inciter à revenir sur sa tâche.

---

# Fonctionnalités

## Authentification sécurisée
- Inscription utilisateur
- Connexion / déconnexion
- Mots de passe hachés avec **bcrypt**
- Gestion de session avec **express-session**
- Isolation des données : chaque utilisateur ne voit que ses propres tâches

---

## Gestion des tâches (CRUD complet)
- Création de tâches
- Lecture / affichage des tâches
- Modification des tâches
- Suppression des tâches

Chaque tâche contient :
- Titre
- Description
- Date d’échéance (deadline)
- Type (travail, perso, études…)
- Priorité (low / medium / high)
- Statut (todo / done)
- Catégorie personnalisée (optionnelle)

---

## Catégories personnalisées
- Création de catégories par utilisateur
- Suppression / modification
- Filtrage des tâches par catégorie
- Catégories totalement isolées par compte utilisateur

---

## Système de relance (Focus / TDAH)
- L’utilisateur peut “démarrer” une tâche
- Une notification est envoyée toutes les X secondes
- Popup de confirmation :
  - “Oui, je continue”
  - “Terminer la tâche”
- Permet de garder le focus sur une tâche en cours

---

## Filtrage et tri
- Filtrage par :
  - statut
  - priorité
  - catégorie
- Tri par date d’échéance (ascendant / descendant)

---

# Stack technique

## Backend
- Node.js
- Express.js
- SQLite (base de données locale)
- express-session (gestion des sessions)
- bcrypt (sécurité mots de passe)
- CORS (communication front/back)

## Frontend
- HTML / CSS
- JavaScript vanilla
- Fetch API

---

# Sécurité

- Mots de passe hashés (bcrypt)
- Sessions serveur (cookie httpOnly)
- Middleware d’authentification sur routes sensibles
- Isolation stricte des données par `userId`
- Protection basique contre accès non autorisé aux tâches

---

# Structure du projet
focustask/
│
├── server/
│ ├── routes/
│ │ ├── auth.js
│ │ ├── tasks.js
│ │ └── categories.js
│ │
│ ├── middleware/
│ │ └── auth.js
│ │
│ ├── db.js
│ ├── database.db
│ └── app.js
│
├── node_modules/
├── package.json
├── package-lock.json
│
└── frontend/
├── app.html
├── login.html
├── js/
│ ├── api.js
│ ├── auth.js
│ └── tasks.js
└── style.css


---

# Installation et lancement

## 1. Installer les dépendances
```bash
npm install

## 2. Lancer le serveur backend
node server/app.js

Le serveur tourne sur :
http://localhost:3000

## 3. Lancer le frontend
http://127.0.0.1:5500/login.html


 API
Auth
POST /auth/register
POST /auth/login
POST /auth/logout
Tasks
GET /tasks
POST /tasks
PUT /tasks/:id
DELETE /tasks/:id
Categories
GET /categories
POST /categories
PUT /categories/:id
DELETE /categories/:id