# Documentation Management API

Une API REST complète pour la gestion de documentation technique avec système d'authentification et organisation par catégories.

## 📋 Table des matières

- [Fonctionnalités](#fonctionnalités)
- [Technologies utilisées](#technologies-utilisées)
- [Installation](#installation)
- [Configuration](#configuration)
- [Utilisation](#utilisation)
- [API Endpoints](#api-endpoints)
- [Modèles de données](#modèles-de-données)
- [Authentification](#authentification)
- [Scripts](#scripts)
- [Structure du projet](#structure-du-projet)

## ✨ Fonctionnalités

- **Gestion des catégories** : Créer, lire, modifier et supprimer des catégories
- **Gestion de la documentation** : CRUD complet pour les documents
- **Recherche** : Recherche de documentation par nom ou par catégorie
- **Authentification JWT** : Système d'inscription et de connexion sécurisé
- **Validation des données** : Validation côté serveur avec Mongoose
- **Health Check** : Endpoint de vérification du statut de l'API

## 🛠 Technologies utilisées

- **Runtime** : Node.js
- **Framework** : Express.js
- **Base de données** : MongoDB avec Mongoose
- **Authentification** : JSON Web Token (JWT)
- **Sécurité** : bcryptjs pour le hachage des mots de passe
- **Variables d'environnement** : dotenv

## 🚀 Installation

### Prérequis

- Node.js
- MongoDB
- npm ou yarn

### Étapes d'installation

1. **Cloner le repository**
   ```bash
   git clone <url-du-repository>
   cd 10.3api
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   ```

3. **Configurer les variables d'environnement**

   Créer un fichier `.env` à la racine du projet :
   ```env
   MONGODB_URI=mongodb://localhost:27017/documentation_db
   JWT_SECRET=votre_jwt_secret
   PORT=3000
   ```

4. **Démarrer l'application**
   ```bash
   npm start
   ```

L'API sera accessible sur `http://localhost:3000`

## ⚙️ Configuration

### Variables d'environnement

| Variable | Description | Valeur par défaut |
|----------|-------------|-------------------|
| `MONGODB_URI` | URI de connexion MongoDB | - |
| `JWT_SECRET` | Clé secrète pour JWT | - |
| `PORT` | Port d'écoute du serveur | 3000 |

### Base de données

L'application se connecte automatiquement à MongoDB au démarrage. Assurez-vous que votre instance MongoDB est accessible avec l'URI fournie.

## 📖 Utilisation

### Démarrage rapide

1. Créer un utilisateur via `/api/auth/register`
2. Se connecter via `/api/auth/login` pour obtenir un token JWT
3. Créer des catégories via `/api/categories`
4. Ajouter de la documentation via `/api/documentation`

### Exemple d'utilisation avec curl

```bash
# Créer un utilisateur
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username": "admin", "password": "password123"}'

# Se connecter
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username": "admin", "password": "password123"}'

# Créer une catégorie
curl -X POST http://localhost:3000/api/categories \
  -H "Content-Type: application/json" \
  -d '{"name": "API Documentation"}'
```

## 🔌 API Endpoints

### Authentification (`/api/auth`)

| Méthode | Endpoint | Description | Corps de la requête |
|---------|----------|-------------|-------------------|
| POST | `/register` | Créer un nouvel utilisateur | `{username, password}` |
| POST | `/login` | Connexion utilisateur | `{username, password}` |
| GET | `/verify` | Vérifier la validité du token | Header: `Authorization: Bearer <token>` |

### Catégories (`/api/categories`)

| Méthode | Endpoint | Description | Corps de la requête |
|---------|----------|-------------|-------------------|
| GET | `/` | Récupérer toutes les catégories | - |
| GET | `/:id` | Récupérer une catégorie par ID | - |
| POST | `/` | Créer une nouvelle catégorie | `{name}` |
| PUT | `/:id` | Modifier une catégorie | `{name}` |
| DELETE | `/:id` | Supprimer une catégorie | - |

### Documentation (`/api/documentation`)

| Méthode | Endpoint | Description | Corps de la requête |
|---------|----------|-------------|-------------------|
| GET | `/` | Récupérer toute la documentation | - |
| GET | `/:id` | Récupérer un document par ID | - |
| POST | `/` | Créer un nouveau document | `{name, category, link, description, state}` |
| PUT | `/:id` | Modifier un document | `{name, category, link, description, state}` |
| DELETE | `/:id` | Supprimer un document | - |
| GET | `/category/:categoryId` | Récupérer les documents d'une catégorie | - |
| GET | `/search/:name` | Rechercher des documents par nom | - |

### Health Check (`/api/health`)

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/` | Vérifier le statut de l'API |

## 📊 Modèles de données

### User (Utilisateur)
```javascript
{
  username: String (required, unique),
  password: String (required, hashed)
}
```

### Category (Catégorie)
```javascript
{
  name: String (required, unique, trimmed),
  createdAt: Date,
  updatedAt: Date
}
```

### Documentation
```javascript
{
  name: String (required, trimmed),
  category: ObjectId (required, ref: 'Category'),
  link: String (required, trimmed),
  description: String (required, trimmed),
  state: String (required, trimmed),
  createdAt: Date,
  updatedAt: Date
}
```

## 🔐 Authentification

L'API utilise JWT (JSON Web Token) pour l'authentification :

1. **Inscription** : Créer un compte avec username/password
2. **Connexion** : Recevoir un token JWT valide 24h
3. **Utilisation** : Inclure le token dans l'header `Authorization: Bearer <token>`

### Middleware d'authentification

Certains endpoints peuvent nécessiter l'authentification. Le middleware `authMiddleware` vérifie automatiquement la validité du token.

## 📜 Scripts

```json
{
  "start": "node server.js"
}
```

- `npm start` : Démarre le serveur en mode production

## 📁 Structure du projet

```
10.3api/
├── bin/
│   └── www                     # Point d'entrée alternatif
├── config/
│   └── db.js                   # Configuration MongoDB
├── middleware/
│   └── auth.js                 # Middleware d'authentification
├── models/
│   ├── Category.js             # Modèle Category
│   ├── Documentation.js        # Modèle Documentation
│   └── User.js                 # Modèle User
├── public/
│   └── stylesheets/
│       └── style.css           # Styles CSS
├── routes/
│   ├── categoryController.js   # Contrôleur des catégories
│   ├── categoryRoutes.js       # Routes des catégories
│   ├── documentationController.js # Contrôleur de la documentation
│   ├── documentationRoutes.js  # Routes de la documentation
│   ├── healthController.js     # Contrôleur health check
│   ├── healthRoutes.js         # Routes health check
│   ├── userController.js       # Contrôleur des utilisateurs
│   └── userRoutes.js          # Routes des utilisateurs
├── .env                        # Variables d'environnement
├── .gitignore                  # Fichiers ignorés par Git
├── package.json                # Configuration npm
├── package-lock.json           # Lock des dépendances
└── server.js                   # Point d'entrée principal
```