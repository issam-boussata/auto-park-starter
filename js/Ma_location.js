const voitures = getVoitures();

const config = {
    voitures: voitures,

    modesRecuperation: [
        { id: "agence", nom: "Ã€ lâ€™agence", fraisFixes: 0 },
        { id: "aeroport", nom: "Ã€ lâ€™aÃ©roport", fraisFixes: 150 },
        { id: "adresse", nom: "Ã€ une adresse", fraisFixes: 100 },
    ],

    agences: ["Casablanca â€” Centre-ville", "Rabat â€” Agdal", "Marrakech â€” GuÃ©liz"],

    aeroports: ["Casablanca â€” Mohammed V", "Rabat â€” SalÃ©", "Marrakech â€” MÃ©nara"],

    options: [
        { id: "siegeBebe", nom: "SiÃ¨ge bÃ©bÃ©", prixParJour: 30 },
        {
            id: "conducteurSupplementaire",
            nom: "Conducteur supplÃ©mentaire",
            prixParJour: 200,
        },
    ],
};

const selectedConfig = {
    etape: 1,
    voitureId: null,
    dateDebut: "",
    dateFin: "",
    nbrJour: 0 ,

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
// localStorage
function setConfig_local() {
    localStorage.setItem("config", JSON.stringify(config))
}
function getConfig_local() {
    const config = localStorage.getItem("config");
    return JSON.parse(config);
}
function setSelectedConfig(selectedConfig) {
    localStorage.setItem("selectedConfig", JSON.stringify(selectedConfig));
}
function getSelectedConfig() {
    const selectedConfig = localStorage.getItem("selectedConfig");
    return JSON.parse(selectedConfig);
}

function getVoitures() {
    const voitures = localStorage.getItem("voitures");
    return JSON.parse(voitures);
}

// ================ Véhicule ================
// afficher le véhicule 
// min='2028-10-05'
function AfficherVéhicule() {

    const listes_voitures = document.getElementById("listes_voitures");
    const veihcules_message = document.getElementById("veihcules_message");

    // ajouter la date minimum ou input date debut et date fin de location
    const input_date_debut = document.getElementById("date_debut");
    const input_date_fin = document.getElementById("date_fin");
    let date_now = new Date()
    input_date_debut.setAttribute("min", date_now.toLocaleDateString('en-CA'));
    date_now.setDate(date_now.getDate() + 1)
    input_date_fin.setAttribute("min", date_now.toLocaleDateString('en-CA'))


    const voitures = getVoitures().filter(v => v.statut === "Disponible");
    voitures.forEach(voiture => {
        // creer les elements   
        const container_v = document.createElement("label");
        const div_categorie_check = document.createElement("div");
        const label_categorie = document.createElement("p");
        const input_check = document.createElement("input");
        const p_nom_v = document.createElement("p");
        const p_status_v = document.createElement("p");
        const p_prixJour_v = document.createElement("p");

        // strecturer
        div_categorie_check.append(label_categorie, input_check);
        container_v.append(div_categorie_check, p_nom_v, p_status_v, p_prixJour_v);
        listes_voitures.append(container_v);

        // ajouter style tailwind css
        container_v.className = "border-2 border-[#D8E1EF] rounded-md p-3 space-y-4  has-[:checked]:bg-[#F8FAFF] has-[:checked]:border-[#2852E3]";
        div_categorie_check.className = "flex justify-between items-center";
        label_categorie.className = "bg-[#EEF2FF] text-[#2852E3] pr-8 py-2 pl-2";
        input_check.type = 'radio';
        input_check.className = "h-6 w-6 accent-blue-600 ";
        input_check.id = "input_check";
        input_check.name = "input-radio";
        // input_check.value = voiture.nom;
        p_nom_v.className = "text-xl font-bold";
        p_status_v.className = " text-[#16835C]";
        p_prixJour_v.className = "text-[#2852E3] font-bold text-xl";

        //remplir des valeurs
        label_categorie.textContent = voiture.categorie;
        p_nom_v.textContent = voiture.marque + " " + voiture.modele;
        p_status_v.textContent = voiture.statut;
        p_prixJour_v.textContent = voiture.prixJour + " MAD / jour";

        // lorse que un event
        input_check.addEventListener("click", () => { choisirVoiture(voiture.id) })

        // input_date_debut.addEventListener("input", () => { formEtape1(input_check, input_date_debut, input_date_fin) })
        // input_date_fin.addEventListener("input", () => { formEtape1(input_check, input_date_debut, input_date_fin) })
    });

}
AfficherVéhicule();
function validerChampsDates() {
    const input_date_debut = document.getElementById("date_debut");
    const input_date_fin = document.getElementById("date_fin");

    let dateFin = (!input_date_debut.value) ? new Date() : new Date(input_date_debut.value);
    dateFin.setDate(dateFin.getDate() + 1);
    input_date_fin.setAttribute("min", dateFin.toLocaleDateString(`en-CA`));

    if (input_date_fin) {
        let date_input_fin = new Date(input_date_fin.value) ;
        date_input_fin.setDate(date_input_fin.getDate() - 1)        
        input_date_debut.setAttribute("max", date_input_fin.toLocaleDateString(`en-CA`));
    }

    if (input_date_debut.value && input_date_fin.value) {
        const selectedConfig = getSelectedConfig() ;
        selectedConfig.dateDebut = new Date(input_date_debut.value).toLocaleDateString(`en-CA`);
        selectedConfig.dateFin = new Date(input_date_fin.value).toLocaleDateString(`en-CA`) ;
        let nbr_jour = (new Date(input_date_fin.value) - new Date(input_date_debut.value)) / (1000 * 60 * 60 * 24) ;         
        selectedConfig.nbrJour = nbr_jour ;
        setSelectedConfig(selectedConfig) ;
    }

}

document.getElementById("date_debut").addEventListener("input", () => {validerChampsDates()}) ;
document.getElementById("date_fin").addEventListener("input", () => {validerChampsDates()}) ;
const choisirVoiture = (id_voiture) => {
    const selectedConfig = getSelectedConfig() ;
    selectedConfig.voitureId = id_voiture ;
    console.log(id_voiture);
    setSelectedConfig(selectedConfig) ;
    
};

// une fonction pour afficher la cate de votre location
function afficherVotreLocation() {
    const selectedConfig = getSelectedConfig();
    const voitures = getVoitures();
    const config = getConfig_local();

    const voiture = voitures.find(v => v.id === selectedConfig.voitureId);
    const recuperation = config.modesRecuperation.find(R => R.id === selectedConfig.modeRecuperation);

    const nom_voiture = document.getElementById("nom-voiture");
    const prix_voiture = document.getElementById("prix-voiture");
    const date_debut_fin = document.getElementById("date-debut-fin");
    const nb_jour = document.getElementById("nb-jour");
    const prix_fois_jour = document.getElementById("prix-fois-jour");
    const prix_total = document.getElementById("prix-total");
    const prix_recuperation = document.getElementById("prix-recuperation");
    const prix_net = document.getElementById("prix-net");


    nom_voiture.textContent = voiture.marque + " " + voiture.modele;
    prix_voiture.textContent = voiture.prixJour + " DH / Jour";
    date_debut_fin.textContent = selectedConfig.dateDebut + "  -->  " + selectedConfig.dateFin;
    nb_jour.textContent = selectedConfig.nbrJour + " jours · dates incluses";
    prix_fois_jour.textContent = selectedConfig.nbrJour + " * " + voiture.prixJour + " MAD ";
    prix_total.textContent = selectedConfig.nbrJour + voiture.prixJour + " MAD ";
    prix_recuperation.textContent = recuperation.fraisFixes === 0 ? "gratuit" : recuperation.fraisFixes + " MAD "
    prix_net.textContent = (recuperation.fraisFixes + selectedConfig.nbrJour + voiture.prixJour) + " MAD ";
}


