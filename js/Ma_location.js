import { data_voitures , config , selectedConfig } from './data.js';
const voitures = getVoitures() || data_voitures;


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
    let Voitures = getVoitures() || data_voitures;
    document.getElementById("cinqEtapes").className = "bg-[#FFFFFF] p-3 my-10 space-y-6 rounded-md md:p-6 lg:col-span-3"
    document.getElementById("VÉHICULE").removeAttribute("hidden");    
    document.getElementById("RÉCUPÉRATION").setAttribute("hidden" ,"");
    document.getElementById("OPTIONS").setAttribute("hidden");
    const listes_voitures = document.getElementById("listes_voitures");

    // ajouter la date minimum ou input date debut et date fin de location
    const input_date_debut = document.getElementById("date_debut");
    const input_date_fin = document.getElementById("date_fin");
    let date_now = new Date()
    input_date_debut.setAttribute("min", date_now.toLocaleDateString('en-CA'));
    date_now.setDate(date_now.getDate() + 1)
    input_date_fin.setAttribute("min", date_now.toLocaleDateString('en-CA'))


    Voitures = Voitures.filter(v => v.statut === "Disponible");
    Voitures.forEach(voiture => {
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


// valider les champs dates est ajouter les valeur(id_voiture , date debut fin)
function validerChampsDates() {
    const selected_Config = getSelectedConfig() || selectedConfig;
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
        selected_Config.dateDebut = new Date(input_date_debut.value).toLocaleDateString(`en-CA`);
        selected_Config.dateFin = new Date(input_date_fin.value).toLocaleDateString(`en-CA`);
        let nbr_jour = (new Date(input_date_fin.value) - new Date(input_date_debut.value)) / (1000 * 60 * 60 * 24);
        selected_Config.nbrJour = nbr_jour;
        setSelectedConfig(selected_Config);
        afficherVotreLocation();

        const veihcules_message = document.getElementById("veihcules_message");
        veihcules_message.removeAttribute("hidden");
        veihcules_message.textContent = ` Durée : ${nbr_jour} jours. Les dates de début et de fin sont incluses.`;

    }

}
// appeller la fonction valider les Champs des Dates
document.getElementById("date_debut").addEventListener("input", () => { validerChampsDates() });
document.getElementById("date_fin").addEventListener("input", () => { validerChampsDates() });
const choisirVoiture = (id_voiture) => {
    const selected_Config = getSelectedConfig() || selectedConfig;
    selected_Config.voitureId = id_voiture;
    setSelectedConfig(selected_Config);

    afficherVotreLocation();
    document.getElementById("facture").removeAttribute("hidden");
    document.getElementById("cinqEtapes").className = "bg-[#FFFFFF] p-3 my-10 space-y-6 rounded-md md:p-6 lg:col-span-2"

};



// ================ RÉCUPÉRATION ================

function AfficherRepuration() {
    const Config = getConfig_local() || config;
    const listes_modesRecuperation = document.getElementById("listes_modesRecuperation");
    document.getElementById("VÉHICULE").setAttribute("hidden" , "");
    document.getElementById("OPTIONS").setAttribute("hidden" , "");
    document.getElementById("RÉCUPÉRATION").removeAttribute("hidden");


    Config.modesRecuperation.forEach(modeRecuperation => {
        const container = document.createElement("label");
        const nom = document.createElement("h2");
        const prix = document.createElement("p");
        const input_radio = document.createElement("input");

        container.className = "border-2 border-[#D8E1EF] rounded-md p-3 space-y-4  has-[:checked]:bg-[#F8FAFF] has-[:checked]:border-[#2852E3]";
        input_radio.type = "radio";
        input_radio.name = "input_radio";
        input_radio.addEventListener("click", () => {
            afficherFormRepuration(modeRecuperation.id)

        });
        nom.className = "text-xl font-bold";
        prix.className = "text-blue-600"


        container.append(input_radio, nom, prix);
        listes_modesRecuperation.append(container);



        nom.textContent = modeRecuperation.nom;
        prix.textContent = modeRecuperation.fraisFixes === 0 ? "gratuit" : "+ " + modeRecuperation.fraisFixes + " DH";

    })
}


function afficherFormRepuration(id) {

    const selected_Config = getSelectedConfig() || selectedConfig;
    const Config = getConfig_local() || config;
    if (id === "agence") {
        document.getElementById("agence_form").removeAttribute("hidden");
        document.getElementById("aeroport_form").setAttribute("hidden", "")
        document.getElementById("adresse_form").setAttribute("hidden", "")
        document.getElementById("Heure_récupération").value = selected_Config.recuperation.heureRecuperation;

    } else if (id === "aeroport") {
        document.getElementById("aeroport_form").removeAttribute("hidden");
        document.getElementById("agence_form").setAttribute("hidden", "");
        document.getElementById("adresse_form").setAttribute("hidden", "");
        document.getElementById("aeroport_select").innerHTML = "";
        Config.aeroports.forEach(aeroport => {
            const option = document.createElement("option");
            option.textContent = aeroport;
            option.value = aeroport;
            document.getElementById("aeroport_select").append(option);
        });
        document.getElementById("aeroport_select").value = selected_Config.recuperation.aeroport;
        document.getElementById("Num_vol").value = selected_Config.recuperation.numeroVol;
        document.getElementById("Heure_arrive").value = selected_Config.recuperation.heureArrivee;




    } else {
        document.getElementById("adresse_form").removeAttribute("hidden")
        document.getElementById("aeroport_form").setAttribute("hidden", "")
        document.getElementById("agence_form").setAttribute("hidden", "");

    }

    selected_Config.modeRecuperation = id;
    setSelectedConfig(selected_Config)
}



function ValiderchampsRepuration() {
    const selected_Config = getSelectedConfig() || selectedConfig;
    const RÉCUPÉRATION_message = document.getElementById("RÉCUPÉRATION_message");

    if (selected_Config.modeRecuperation === "agence") {
        const Heure_récupération = document.getElementById("Heure_récupération").value;
        if (!Heure_récupération) {
            RÉCUPÉRATION_message.textContent = "vous devez entrer l'heure de récupération";
            RÉCUPÉRATION_message.style.backgroundColor = "#b423368e";
            return;
        }
        selected_Config.recuperation.heureRecuperation = Heure_récupération;

    } else if (selected_Config.modeRecuperation === "aeroport") {
        if (!document.getElementById("aeroport_select").value || !document.getElementById("Num_vol").value || !document.getElementById("Heure_arrive").value) {
            RÉCUPÉRATION_message.textContent = "vous devez remplire toutes les champs ";
            RÉCUPÉRATION_message.style.backgroundColor = "#b423368e";
            return;
        }
        selected_Config.recuperation.aeroport = document.getElementById("aeroport_select").value;
        selected_Config.recuperation.numeroVol = document.getElementById("Num_vol").value;
        selected_Config.recuperation.heureArrivee = document.getElementById("Heure_arrive").value;

    } else {
        if (!document.getElementById("Ville").value || !document.getElementById("Adresse").value || !document.getElementById("Heure_livraison").value) {
            RÉCUPÉRATION_message.textContent = "vous devez remplire toutes les champs ";
            RÉCUPÉRATION_message.style.backgroundColor = "#b423368e";
            return;
        }
        selected_Config.recuperation.ville = document.getElementById("Ville").value;
        selected_Config.recuperation.adresse = document.getElementById("Adresse").value;
        selected_Config.recuperation.heureLivraison = document.getElementById("Heure_livraison").value;

    }
    RÉCUPÉRATION_message.textContent = "Le supplément de récupération est ajouté une seule fois au total.";
    RÉCUPÉRATION_message.style.backgroundColor = "#EEF2FF";
    setSelectedConfig(selected_Config)
}

const inputs = document.querySelectorAll("#Heure_récupération , #aeroport_select , #Num_vol ,#Heure_arrive ,#Ville , #Adresse  , #Heure_livraison ");

inputs.forEach(input => {
    input.addEventListener("input", () => {
        ValiderchampsRepuration()
    });

})


