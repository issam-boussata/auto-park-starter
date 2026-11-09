// Données fictives fournies. Ne pas modifier ce tableau lors des opérations CRUD.
// Chaque voiture possède un identifiant unique.
export const data_voitures = [
  {
    "id": 1,
    "marque": "Dacia",
    "modele": "Sandero",
    "immatriculation": "AUTO-001",
    "categorie": "Citadine",
    "prixJour": 250,
    "statut": "Disponible"
  },
  {
    "id": 2,
    "marque": "Renault",
    "modele": "Mégane",
    "immatriculation": "AUTO-002",
    "categorie": "Berline",
    "prixJour": 380,
    "statut": "Louée"
  },
  {
    "id": 3,
    "marque": "Hyundai",
    "modele": "Tucson",
    "immatriculation": "AUTO-003",
    "categorie": "SUV",
    "prixJour": 550,
    "statut": "En maintenance"
  },
  {
    "id": 4,
    "marque": "Peugeot",
    "modele": "208",
    "immatriculation": "AUTO-004",
    "categorie": "Citadine",
    "prixJour": 280,
    "statut": "Disponible"
  },
  {
    "id": 5,
    "marque": "Toyota",
    "modele": "Corolla",
    "immatriculation": "AUTO-005",
    "categorie": "Berline",
    "prixJour": 420,
    "statut": "Louée"
  },
  {
    "id": 6,
    "marque": "Dacia",
    "modele": "Duster",
    "immatriculation": "AUTO-006",
    "categorie": "SUV",
    "prixJour": 450,
    "statut": "Disponible"
  },
    {
    "id": 7,
    "marque": "qqqqq",
    "modele": "Sandero",
    "immatriculation": "AUTO-001",
    "categorie": "SUV",
    "prixJour": 250,
    "statut": "Disponible"
  }
];

export const config = {
    voitures: data_voitures ,

    modesRecuperation: [
        { id: "agence", nom: "À l’agence", fraisFixes: 0 },
        { id: "aeroport", nom: "À l’aéroport", fraisFixes: 150 },
        { id: "adresse", nom: "À une adresse", fraisFixes: 100 },
    ],

    agences: ["Casablanca -- Centre-ville", "Rabat -- Agdal", "Marrakech -- Guaeliz"],

    aeroports: ["Casablanca -- Mohammed V", "Rabat -- Sala", "Marrakech -- Manara"],

    options: [
        { id: "siegeBebe", nom: "Siage bébé", prixParJour: 30 },
        {
            id: "conducteurSupplementaire",
            nom: "Conducteur supplémentaire",
            prixParJour: 200,
        },
    ],
};


export const selectedConfig = {
    etape: 1,
    voitureId: null,
    dateDebut: "",
    dateFin: "",
    nbrJour: 0,

    modeRecuperation: "agence",
    recuperation: {
        // Mode agence uniquement.
        heureRecuperation: "",

        // Mode aeroport uniquement.
        aeroport: "",
        numeroVol: "",
        heureArrivee: "",

        // Mode adresse uniquement.
        ville: "",
        adresse: "",
        heureLivraison: "",
    },

    options: {
        siegeBebe: false,
        conducteurSupplementaire: false,
    },
};
