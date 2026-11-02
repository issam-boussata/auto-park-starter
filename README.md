# AutoPark — Gestion du parc automobile d'Atlas Auto

> Application web de gestion de parc automobile pour **Atlas Auto**, une agence fictive de location de voitures.
> Développée en **HTML5 / CSS3 / JavaScript Vanilla ES6+**, sans backend ni base de données : les données sont sauvegardées dans le `localStorage` du navigateur.

<!-- 📸 CAPTURE PRINCIPALE : vue d'ensemble (dashboard + gestion du parc) -->
![Aperçu d'AutoPark](./docs/screenshots/apercu-general.png)

| | Lien |
|---|---|
| Application déployée | [LIEN_DE_DEPLOIEMENT](https://LIEN_DE_DEPLOIEMENT) |
| Dépôt GitHub | [LIEN_DU_DEPOT](https://github.com/TON_PSEUDO/TON_DEPOT) |
| Tableau Jira | [LIEN_DU_TABLEAU_JIRA](https://TON_PROJET.atlassian.net) |

---

## 📑 Sommaire

1. [Présentation](#-présentation)
2. [Captures d'écran](#-captures-décran)
3. [Technologies utilisées](#-technologies-utilisées)
4. [Fonctionnalités](#-fonctionnalités)
5. [Modèle de données](#-modèle-de-données)
6. [Structure du projet](#-structure-du-projet)
7. [Architecture JavaScript](#-architecture-javascript)
8. [Conception du dashboard (zoning)](#-conception-du-dashboard-zoning)
9. [Installation et lancement](#-installation-et-lancement)
10. [Organisation du travail (Git & Jira)](#-organisation-du-travail-git--jira)
11. [Tests effectués](#-tests-effectués)
12. [Difficultés rencontrées](#-difficultés-rencontrées)
13. [Améliorations possibles](#-améliorations-possibles)
14. [Auteur](#-auteur)

---

## 🎯 Présentation

**Atlas Auto** souhaite disposer d'un outil pour gérer son parc automobile : consulter les véhicules, modifier leurs informations et leurs tarifs, et suivre leur disponibilité.

**AutoPark** se compose de deux pages qui exploitent les **mêmes données** :

| Page | Fichier | Rôle |
|------|---------|------|
| Dashboard | `index.html` | Vue d'ensemble du parc : 4 compteurs, aperçu des voitures, répartition par statut et par catégorie |
| Gestion du parc | `voitures.html` | Formulaire d'ajout / modification, tableau dynamique, recherche, filtres et tri |

**Cadre pédagogique :** projet individuel de 5 jours — lancement le 26 octobre 2026, rendu le 30 octobre 2026 à 17h00.

---

## 📸 Captures d'écran

> 💡 Enregistre tes captures dans `docs/screenshots/` avec les noms ci-dessous : les liens sont déjà prêts.

### 🏠 Dashboard (`index.html`)

| Desktop | Tablette | Mobile |
|:-------:|:--------:|:------:|
| ![Dashboard desktop](./docs/screenshots/dashboard-desktop.png) | ![Dashboard tablette](./docs/screenshots/dashboard-tablette.png) | ![Dashboard mobile](./docs/screenshots/dashboard-mobile.png) |

**Compteurs, aperçu du parc, répartition par statut et par catégorie**

![Dashboard détail](./docs/screenshots/dashboard-details.png)

**Dashboard avec un parc vide (compteurs à 0)**

![Dashboard parc vide](./docs/screenshots/dashboard-vide.png)

### 🚘 Gestion du parc (`voitures.html`)

**Tableau des voitures avec statuts différenciés**

![Tableau des voitures](./docs/screenshots/voitures-tableau.png)

**Ajout d'une voiture**

![Formulaire d'ajout](./docs/screenshots/voitures-ajout.png)

**Messages d'erreur (champs vides, prix invalide, immatriculation en doublon)**

![Erreurs de validation](./docs/screenshots/voitures-erreurs.png)

**Modification d'une voiture (formulaire prérempli + bouton « Annuler la modification »)**

![Mode modification](./docs/screenshots/voitures-modification.png)

**Confirmation de suppression**

![Confirmation de suppression](./docs/screenshots/voitures-suppression.png)

**Recherche, filtres et tri combinés**

![Recherche filtres tri](./docs/screenshots/voitures-filtres.png)

**États vides**

| Parc vide | Aucun résultat de recherche |
|:---------:|:---------------------------:|
| ![Parc vide](./docs/screenshots/etat-vide-parc.png) | ![Aucun résultat](./docs/screenshots/etat-vide-recherche.png) |

**Responsive de la gestion du parc**

| Tablette | Mobile |
|:--------:|:------:|
| ![Parc tablette](./docs/screenshots/voitures-tablette.png) | ![Parc mobile](./docs/screenshots/voitures-mobile.png) |

### 🧪 Persistance et console

| `localStorage` (DevTools → Application) | Console sans erreur |
|:---:|:---:|
| ![localStorage](./docs/screenshots/devtools-localstorage.png) | ![Console](./docs/screenshots/console-sans-erreur.png) |

---

## 🛠️ Technologies utilisées

| Catégorie | Technologie |
|-----------|-------------|
| Structure | HTML5 sémantique (`header`, `nav`, `main`, `section`, `table` avec `caption` / `scope`), attributs d'accessibilité (`aria-*`, `sr-only`, lien d'évitement) |
| Style | CSS3 externe (`css/style.css`, fourni par le starter) |
| Style du dashboard | [Tailwind CSS v4](https://tailwindcss.com/) (build navigateur via CDN) pour la mise en page responsive |
| Icônes | [Font Awesome 6.5.1](https://fontawesome.com/) (CDN) |
| Logique | JavaScript Vanilla ES6+ : modules (`import` / `export`), fonctions fléchées, template literals, déstructuration, spread / rest |
| Tableaux | `map()`, `filter()`, `find()`, `some()`, `reduce()`, `sort()` |
| Stockage | `localStorage`, `JSON.stringify()`, `JSON.parse()` |
| Versionnement | Git / GitHub (branches, commits, Pull Requests) |
| Gestion de projet | Jira |

❌ **Non utilisés (conformément au brief) :** framework JavaScript, backend, base de données, API de données externe.

---

## Fonctionnalités

> Coche les cases au fur et à mesure de ton avancement.

### Gestion du parc (`voitures.html`)

- [ ] Affichage dynamique des voitures dans le tableau (généré en JavaScript)
- [ ] Statuts différenciés visuellement (badges *Disponible* / *Louée* / *En maintenance*)
- [ ] Message d'état vide lorsque le parc ou le résultat de recherche est vide
- [ ] **Ajout** sans rechargement (confirmation + réinitialisation du formulaire)
- [ ] **Modification** : formulaire prérempli, identifiant conservé, bouton « Annuler la modification »
- [ ] **Suppression** avec confirmation (données conservées si l'utilisateur annule)
- [ ] **Validation** du formulaire :
  - champs obligatoires, espaces seuls refusés
  - prix journalier strictement positif
  - immatriculation unique (insensible à la casse et aux espaces)
  - une voiture peut conserver sa propre immatriculation lors d'une modification
  - messages d'erreur affichés près des champs
- [ ] **Recherche instantanée** par marque, modèle ou immatriculation (insensible à la casse)
- [ ] **Filtres** par statut et par catégorie
- [ ] **Tri numérique** par prix croissant / décroissant
- [ ] Bouton **Réinitialiser** les critères
- [ ] Recherche, filtres et tri **cumulables**

### Persistance

- [ ] Sauvegarde dans `localStorage` après chaque ajout, modification ou suppression
- [ ] Chargement des données sauvegardées au démarrage
- [ ] Données initiales (`data.js`) utilisées **uniquement** si aucune sauvegarde n'existe
- [ ] Un parc volontairement vidé **reste vide** après rechargement

### Dashboard (`index.html`)

- [x] En-tête AutoPark + navigation entre les deux pages
- [x] 4 compteurs calculés depuis le `localStorage` : **Total**, **Disponibles**, **Louées**, **En maintenance**
- [x] **Aperçu du parc** : tableau des premières voitures + lien « Voir tout le parc »
- [x] **Répartition par statut** : barre de proportion et pourcentages
- [x] **Répartition par catégorie** : nombre de voitures et barres de progression, triées par effectif
- [x] Bouton d'accès rapide « + Ajouter voiture »
- [x] Mise en page responsive (grille 1 colonne sur mobile, 4 colonnes sur grand écran)
- [ ] Affichage correct lorsque le parc est vide (compteurs à 0, pas d'erreur)

---

## Modèle de données

Chaque voiture est un objet JavaScript :

```js
{
  id: 1,                          // identifiant unique généré automatiquement
  marque: "Dacia",
  modele: "Sandero",
  immatriculation: "AUTO-001",    // unique (sans tenir compte de la casse ni des espaces)
  categorie: "Citadine",          // "Citadine" | "Berline" | "SUV"
  prixJour: 250,                  // nombre strictement positif, en DH
  statut: "Disponible"            // "Disponible" | "Louée" | "En maintenance"
}
```

**Clé `localStorage` :** `voitures` (tableau d'objets sérialisé en JSON)

---

## 📁Structure du projet

```
auto-park-starter/
├── css/
│   └── style.css          # Feuille de style du starter (header, formulaire, tableau, badges…)
├── js/
│   ├── data.js            # Données initiales du parc
│   ├── voitures.js        # Logique de la page « Gestion du parc »
│   └── dashboard.js       # Logique du dashboard (compteurs et statistiques)
├── docs/
│   └── screenshots/       # Captures d'écran du README et de Jira
├── index.html             # Dashboard (conçu entièrement)
├── voitures.html          # Gestion du parc (starter rendu interactif)
└── README.md
```

---

## Architecture JavaScript

| Fichier | Responsabilité |
|---------|----------------|
| `js/data.js` | Fournit le tableau des voitures initiales, utilisé seulement si le `localStorage` est vide |
| `js/voitures.js` | Gère le formulaire (ajout / modification), la validation, le tableau, la suppression, la recherche, les filtres, le tri et la sauvegarde |
| `js/dashboard.js` | Lit le `localStorage`, calcule les 4 compteurs et les statistiques (statut, catégorie), puis les affiche dans le DOM |

Les deux pages sont chargées avec `<script type="module">`.

**Flux de données :**

```
data.js ──► (1er lancement) ──► localStorage["voitures"] ◄──► voitures.js  (CRUD, filtres, tri)
                                         │
                                         └──────────────────► dashboard.js (compteurs, statistiques)
```

**Méthodes de tableaux utilisées dans le dashboard :**

| Besoin | Méthode |
|--------|---------|
| Compter les voitures par statut | `filter()` + `.length` |
| Détecter une catégorie déjà comptée | `some()` |
| Trier statuts et catégories par effectif | `sort()` |
| Générer les lignes / barres du DOM | `forEach()` / `map()` |

---

## Conception du dashboard (zoning)

>  Place ici ta maquette / ton zoning réalisé à l'étape 1 :
>
> ![Zoning du dashboard](./docs/screenshots/zoning-dashboard.png)

Découpage de `index.html` :

```
┌──────────────────────────────────────────────────────────┐
│  HEADER : logo AutoPark · navigation · Agence de location │
├──────────────────────────────────────────────────────────┤
│  Titre « Tableau de bord » + sous-titre   [+ Ajouter voiture] │
├────────────┬────────────┬────────────┬───────────────────┤
│   Total    │ Disponibles│   Louées   │  En maintenance   │
├────────────┴────────────┴────────────┴───────────────────┤
│  Aperçu du parc (tableau)          │ Répartition par statut │
│  + « Voir tout le parc »           ├────────────────────────┤
│                                    │ Par catégorie          │
└──────────────────────────────────────────────────────────┘
```

| Zone | Mobile | Desktop (≥ `lg`) |
|------|--------|------------------|
| Compteurs | 1 colonne | 4 colonnes |
| Aperçu + statistiques | empilés | 3/5 (tableau) + 2/5 (statistiques) |

---

## 🚀 Installation et lancement

> ⚠️ Les **modules ES6** (`import` / `export`) ne fonctionnent pas en ouvrant directement le fichier (`file://`). Un **serveur local** est nécessaire.

### 1. Cloner le dépôt

```bash
git clone https://github.com/TON_PSEUDO/TON_DEPOT.git
cd TON_DEPOT
```

### 2. Lancer un serveur local (au choix)

**Option A — VS Code : extension « Live Server »**
Clic droit sur `index.html` → *Open with Live Server*.

**Option B — Python**

```bash
python -m http.server 5500
```

**Option C — Node.js**

```bash
npx serve .
```

### 3. Ouvrir l'application

- Dashboard : <http://localhost:5500/index.html>
- Gestion du parc : <http://localhost:5500/voitures.html>

> ℹ️ Tailwind CSS et Font Awesome sont chargés par CDN : une connexion Internet est nécessaire pour l'affichage complet du dashboard.

### 🔄 Réinitialiser les données

DevTools du navigateur → **Application → Local Storage** → supprimer la clé `voitures`, puis recharger la page.

---

## 📌 Organisation du travail (Git & Jira)

### Jira

Le travail est découpé en tâches suivant les 7 étapes du brief.

> 💡 Place tes captures Jira dans `docs/screenshots/jira/`.

#### Backlog

![Backlog Jira](./docs/screenshots/jira/backlog.png)

#### Tableau (À faire / En cours / Terminé)

![Board Jira](./docs/screenshots/jira/board.png)

#### Chronologie / Sprint

![Timeline Jira](./docs/screenshots/jira/timeline.png)

#### Détail d'une tâche (exemple)

![Détail d'une tâche Jira](./docs/screenshots/jira/tache-detail.png)

#### Récapitulatif des tâches

| Clé | Étape | Tâche | Statut | Capture |
|-----|:-----:|-------|:------:|:-------:|
| AP-1 | 1 | Analyser le starter et les données | ✅ | ![AP-1](./docs/screenshots/jira/AP-1.png) |
| AP-2 | 1 | Réaliser le zoning du dashboard | ✅ | ![AP-2](./docs/screenshots/jira/AP-2.png) |
| AP-3 | 1 | Créer les tâches Jira | ✅ | ![AP-3](./docs/screenshots/jira/AP-3.png) |
| AP-4 | 2 | Créer le dépôt GitHub et intégrer le starter | ✅ | ![AP-4](./docs/screenshots/jira/AP-4.png) |
| AP-5 | 2 | Préparer les modules JS et le README | ✅ | ![AP-5](./docs/screenshots/jira/AP-5.png) |
| AP-6 | 3 | Générer le tableau depuis les données initiales + état vide | ✅ | ![AP-6](./docs/screenshots/jira/AP-6.png) |
| AP-7 | 3 | Formulaire d'ajout et validations | ✅ | ![AP-7](./docs/screenshots/jira/AP-7.png) |
| AP-8 | 4 | Modification d'une voiture | ✅ | ![AP-8](./docs/screenshots/jira/AP-8.png) |
| AP-9 | 4 | Suppression avec confirmation | ✅ | ![AP-9](./docs/screenshots/jira/AP-9.png) |
| AP-10 | 4 | Persistance `localStorage` | ✅ | ![AP-10](./docs/screenshots/jira/AP-10.png) |
| AP-11 | 5 | Recherche instantanée | ✅ | ![AP-11](./docs/screenshots/jira/AP-11.png) |
| AP-12 | 5 | Filtres statut / catégorie et tri par prix | ✅ | ![AP-12](./docs/screenshots/jira/AP-12.png) |
| AP-13 | 6 | Interface responsive du dashboard | ✅ | ![AP-13](./docs/screenshots/jira/AP-13.png) |
| AP-14 | 6 | Calcul des 4 compteurs et statistiques | ✅ | ![AP-14](./docs/screenshots/jira/AP-14.png) |
| AP-15 | 7 | Tests fonctionnels, responsive et console | ✅ | ![AP-15](./docs/screenshots/jira/AP-15.png) |
| AP-16 | 7 | Déploiement et finalisation du README | ✅ | ![AP-16](./docs/screenshots/jira/AP-16.png) |

> ✏️ Remplace les clés, les titres et les statuts par ceux de ton vrai tableau Jira.

### Git / GitHub

- **Branche principale :** `main`
- **Branches de fonctionnalités :** `feature/affichage-tableau`, `feature/ajout-voiture`, `feature/modification-suppression`, `feature/localstorage`, `feature/recherche-filtres-tri`, `feature/dashboard`
- **Convention de commits :** `feat:` · `fix:` · `style:` · `refactor:` · `docs:`
- **Pull Requests :** une PR documentée par fonctionnalité (description, captures, checklist de tests)

| Pull Request | Historique des commits |
|:---:|:---:|
| ![Pull Request](./docs/screenshots/github-pull-request.png) | ![Commits](./docs/screenshots/github-commits.png) |

---

## ✅ Tests effectués

| # | Scénario | Résultat attendu | Statut |
|---|----------|------------------|:------:|
| 1 | Ajouter une voiture valide | Ligne ajoutée sans rechargement, formulaire réinitialisé | ☐ |
| 2 | Soumettre un formulaire vide | Erreurs affichées près des champs | ☐ |
| 3 | Saisir uniquement des espaces | Champ refusé | ☐ |
| 4 | Prix égal à 0 ou négatif | Erreur affichée | ☐ |
| 5 | Immatriculation en doublon (casse / espaces différents) | Erreur affichée | ☐ |
| 6 | Modifier une voiture en gardant son immatriculation | Modification acceptée, `id` inchangé | ☐ |
| 7 | Annuler la modification | Formulaire réinitialisé, aucune donnée modifiée | ☐ |
| 8 | Supprimer puis annuler la confirmation | Voiture conservée | ☐ |
| 9 | Supprimer puis confirmer | Voiture supprimée | ☐ |
| 10 | Recharger la page | Données conservées | ☐ |
| 11 | Vider tout le parc puis recharger | Le parc reste vide (pas de retour aux données initiales) | ☐ |
| 12 | Rechercher « dAcIa » | Résultats insensibles à la casse | ☐ |
| 13 | Combiner recherche + filtres + tri | Résultats cohérents | ☐ |
| 14 | Recherche sans résultat | Message d'absence de résultats | ☐ |
| 15 | Ouvrir le dashboard en premier (sans sauvegarde) | Pas d'erreur, données cohérentes | ☐ |
| 16 | Dashboard avec parc vide | Les 4 compteurs affichent 0, pas d'erreur console | ☐ |
| 17 | Dashboard avec moins de 5 voitures | Toutes les voitures s'affichent, pas d'erreur | ☐ |
| 18 | Dashboard sans voiture « En maintenance » (ou autre statut absent) | Statistiques correctes, pas d'erreur | ☐ |
| 19 | Modifier un statut puis ouvrir le dashboard | Compteurs mis à jour | ☐ |
| 20 | Affichage mobile / tablette / desktop | Interface utilisable | ☐ |
| 21 | Console du navigateur | Aucune erreur JavaScript | ☐ |

> ✏️ Remplace ☐ par ✅ au fur et à mesure.

---

## 🧗 Difficultés rencontrées

| Difficulté | Solution apportée |
|------------|-------------------|
| *Ex. : erreur CORS avec les modules ES6* | *Utilisation d'un serveur local au lieu de `file://`* |
| *Ex. : doublon d'immatriculation lors de la modification* | *Exclure la voiture en cours de modification de la vérification* |
| *Ex. : parc vidé qui se remplit à nouveau au rechargement* | *Tester `localStorage.getItem("voitures") === null` plutôt que la longueur du tableau* |
| *Ex. : statistiques en erreur quand un statut n'a aucune voiture* | *Calculer à partir des compteurs au lieu de `t_status[0]`* |

> ✏️ Complète avec tes propres difficultés : elles serviront pour la présentation orale.

---

## 🔮 Améliorations possibles

- Mutualiser la lecture / écriture du `localStorage` dans un module `storage.js` commun aux deux pages
- Pagination du tableau
- Export / import des données en JSON
- Thème sombre
- Tests automatisés

---

## 👤 Auteur

**TON NOM PRÉNOM**
Projet individuel — *Développer les interactions et fonctionnalités dynamiques d'une interface Web*

- GitHub : [@TON_PSEUDO](https://github.com/TON_PSEUDO)
- Date de rendu : 30 octobre 2026

---

<p align="center">AutoPark © 2026 — Atlas Auto (agence fictive)</p>
