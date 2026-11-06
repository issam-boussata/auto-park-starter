const voitures = getVoitures();

const config = {
    voitures: voitures,

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

const selectedConfig = {
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

// sissionStorage
function setSelectedConfig(selectedConfig) {
    sessionStorage.setItem("selectedConfig", JSON.stringify(selectedConfig));
}
function getSelectedConfig() {
    const selectedConfig = sessionStorage.getItem("selectedConfig");
    return JSON.parse(selectedConfig);
}
// localStorage
function setConfig_local(config) {
    localStorage.setItem("config", JSON.stringify(config))
}
function getConfig_local() {
    const config = localStorage.getItem("config");
    return JSON.parse(config);
}
function getVoitures() {
    const voitures = localStorage.getItem("voitures");
    return JSON.parse(voitures);
}

// ================ Véhicule ================
// afficher le véhicule 
function AfficherVéhicule() {
    document.getElementById("cinqEtapes").className ="bg-[#FFFFFF] p-3 my-10 space-y-6 rounded-md md:p-6 lg:col-span-3"

    const listes_voitures = document.getElementById("listes_voitures");

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

// valider les champs dates est ajouter les valeur(id_voiture , date debut fin)
function validerChampsDates() {
    const input_date_debut = document.getElementById("date_debut");
    const input_date_fin = document.getElementById("date_fin");

    let dateFin = (!input_date_debut.value) ? new Date() : new Date(input_date_debut.value);
    dateFin.setDate(dateFin.getDate() + 1);
    input_date_fin.setAttribute("min", dateFin.toLocaleDateString(`en-CA`));

    if (input_date_fin) {
        let date_input_fin = new Date(input_date_fin.value);
        date_input_fin.setDate(date_input_fin.getDate() - 1)
        input_date_debut.setAttribute("max", date_input_fin.toLocaleDateString(`en-CA`));
    }

    if (input_date_debut.value && input_date_fin.value) {
        const selectedConfig = getSelectedConfig();
        selectedConfig.dateDebut = new Date(input_date_debut.value).toLocaleDateString(`en-CA`);
        selectedConfig.dateFin = new Date(input_date_fin.value).toLocaleDateString(`en-CA`);
        let nbr_jour = (new Date(input_date_fin.value) - new Date(input_date_debut.value)) / (1000 * 60 * 60 * 24);
        selectedConfig.nbrJour = nbr_jour;
        setSelectedConfig(selectedConfig);
        afficherVotreLocation();

        const veihcules_message = document.getElementById("veihcules_message");
        veihcules_message.removeAttribute("hidden");
        veihcules_message.textContent = ` Durée : ${nbr_jour} jours. Les dates de début et de fin sont incluses.`;

    }

}

document.getElementById("date_debut").addEventListener("input", () => { validerChampsDates() });
document.getElementById("date_fin").addEventListener("input", () => { validerChampsDates() });
const choisirVoiture = (id_voiture) => {
    // const selectedConfig = getSelectedConfig();
    selectedConfig.voitureId = id_voiture;
    console.log(id_voiture);
    setSelectedConfig(selectedConfig);
    console.log(selectedConfig);

    afficherVotreLocation();
    document.getElementById("facture").removeAttribute("hidden");
    document.getElementById("cinqEtapes").className ="bg-[#FFFFFF] p-3 my-10 space-y-6 rounded-md md:p-6 lg:col-span-2"

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
    prix_voiture.textContent = voiture.categorie + " . " + voiture.prixJour + " DH / Jour";
    if (new Date(selectedConfig.dateDebut).getMonth() === new Date(selectedConfig.dateFin).getMonth()) {
        date_debut_fin.textContent = new Date(selectedConfig.dateDebut).getDate() + " → " + new Date(selectedConfig.dateFin).toLocaleDateString('fr-FR', { day: "numeric", month: "long", year: "numeric" });
    } else {
        date_debut_fin.textContent = new Date(selectedConfig.dateDebut).toLocaleDateString('fr-FR', { day: "numeric", month: "long" }) + " → " + new Date(selectedConfig.dateFin).toLocaleDateString('fr-FR', { day: "numeric", month: "long", year: "numeric" });
    }
    nb_jour.textContent = selectedConfig.nbrJour + " jours · dates incluses";
    prix_fois_jour.textContent = "Véhicule · " + selectedConfig.nbrJour + " * " + voiture.prixJour + " MAD ";
    prix_total.textContent = (selectedConfig.nbrJour * voiture.prixJour) + " MAD ";
    prix_recuperation.textContent = recuperation.fraisFixes === 0 ? "gratuit" : recuperation.fraisFixes + " MAD ";
    console.log(recuperation.fraisFixes);

    prix_net.textContent = (recuperation.fraisFixes + (selectedConfig.nbrJour * voiture.prixJour)) + " MAD ";
}


// ================ RÉCUPÉRATION ================

function AfficherRepuration(){
    const config = getConfig_local() ;
    const listes_modesRecuperation = document.getElementById("listes_modesRecuperation") ;

    config.modesRecuperation.forEach( modeRecuperation => {
        const container = document.createElement("label") ;
        const  nom = document.createElement("h2") ;
        const prix = document.createElement("p") ;
        const input_radio = document.createElement("input") ;
        
        container.className = "border-2 border-[#D8E1EF] rounded-md p-3 space-y-4  has-[:checked]:bg-[#F8FAFF] has-[:checked]:border-[#2852E3]" ;
        input_radio.type = "radio" ;
        input_radio.name = "input_radio" ;
        input_radio.addEventListener("click" , ()=>{choisModeRecuperation(modeRecuperation.id)});
        nom.className = "text-xl font-bold" ;
        prix.className = "text-blue-600"


        container.append( input_radio , nom , prix) ;
        listes_modesRecuperation.append(container) ;



        nom.textContent = modeRecuperation.nom ;
        prix.textContent = modeRecuperation.fraisFixes === 0 ? "gratuit" : "+ "+modeRecuperation.fraisFixes + " DH" ;

    })
}
AfficherRepuration() ;

function afficherForm(id) {
    if (id==="agence") {
        document.getElementById("agence_form").removeAttribute("hidden") ;
        document.getElementById("aeroport_form").setAttribute("hidden" , "")
        document.getElementById("adresse_form").setAttribute("hidden" , "")
        
        
    }else if(id === "aeroport"){
        document.getElementById("aeroport_form").removeAttribute("hidden")
        document.getElementById("agence_form").setAttribute("hidden" , "") ;
        document.getElementById("adresse_form").setAttribute("hidden" , "")
        
    }else{
        document.getElementById("adresse_form").removeAttribute("hidden")
        document.getElementById("aeroport_form").setAttribute("hidden" , "")
        document.getElementById("agence_form").setAttribute("hidden" , "") ;

    }
        
}

