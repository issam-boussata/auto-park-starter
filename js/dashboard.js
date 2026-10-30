import { voitures } from './data.js';


function creer_tr_voiture(liste_voitures, voiture) {
    // creer les élements html pour afficher les voiture sur tableau
    const tr_voiture = document.createElement("tr");
    const td_marque = document.createElement("td");
    const td_modele = document.createElement("td");
    const td_immatriculation = document.createElement("td");
    const td_categorie = document.createElement("td");
    const td_prixJour = document.createElement("td");
    const td_statut = document.createElement("td");

    const strong_marque = document.createElement("strong");
    const span_immatriculation = document.createElement("span");
    const span_prixJour = document.createElement("span");
    span_prixJour.textContent = " DH / jour";
    const span_status = document.createElement("span");


    // ajouter les atributes html
    span_immatriculation.classList.add("registration");
    td_prixJour.classList.add("price");
    switch (voiture.statut) {
        case "Disponible":
            span_status.classList.add("badge", "badge-disponible");
            break;

        case "Louée":
            span_status.classList.add("badge", "badge-louee");
            break;

        default:
            span_status.classList.add("badge", "badge-maintenance");
            break;
    }

    td_marque.append(strong_marque);
    td_immatriculation.append(span_immatriculation);
    td_prixJour.appendChild(span_prixJour);
    td_statut.append(span_status);
    tr_voiture.append(td_marque, td_modele, td_immatriculation, td_categorie, td_prixJour, td_statut)
    liste_voitures.append(tr_voiture);

    return { strong_marque: strong_marque, td_modele: td_modele, span_prixJour: span_prixJour, span_immatriculation: span_immatriculation, td_categorie: td_categorie, td_prixJour: td_prixJour, span_status: span_status }
}

// une fonction pour remplir les information du voiture su tr du tableau
function remplir_info(voiture, elements) {

    elements.strong_marque.textContent = voiture.marque;
    elements.td_modele.textContent = voiture.modele;
    elements.span_immatriculation.textContent = voiture.immatriculation;
    elements.td_categorie.textContent = voiture.categorie;
    elements.td_prixJour.textContent = voiture.prixJour;
    elements.td_prixJour.appendChild(elements.span_prixJour)
    elements.span_status.textContent = voiture.statut;

}

console.log(voitures);

// une fonction pour afficher les voitures sur un tableau html daynamiquement
function Afficher(voitures) {

    const liste_voitures = document.getElementById("liste-voitures");
    liste_voitures.innerHTML = "";
    const etat_vide = document.getElementById("etat-vide");


    if (voitures.length != 0) {

        etat_vide.setAttribute("hidden", "")

        voitures.forEach(voiture => {

            // creer les élements html et les retourne par un objet elements_tr
            const elements_tr = creer_tr_voiture(liste_voitures, voiture);

            // remplire tr par des informations du voiture
            remplir_info(voiture, elements_tr);
        });

    } else {

        etat_vide.removeAttribute("hidden")
    }
}
Afficher(voitures);


// les elements des cartes des statistique
const total_voitures = document.getElementById("total");
total_voitures.textContent = voitures.length;
const Disponibles = document.getElementById("Disponibles");
const Louées = document.getElementById("Louées");
const En_maintenance = document.getElementById("En_maintenance");

// remplire les cartes des statistique
const V_disponible = voitures.filter(v => v.statut.trim().toLowerCase() === "Disponible".toLowerCase());
const V_louiees = voitures.filter(v => v.statut.trim().toLowerCase() === "Louée".toLowerCase());
const V_enMaintenance = voitures.filter(v => v.statut.trim().toLowerCase() === "En maintenance".toLowerCase());

const N_V_disponible = V_disponible.length;
const N_V_louiees = V_louiees.length;
const N_V_enMaintenance = V_enMaintenance.length;

Disponibles.textContent = N_V_disponible;
Louées.textContent = N_V_louiees;
En_maintenance.textContent = N_V_enMaintenance;



// le porcentage des voiture en chaque status



const Disponible_p = document.getElementById("Disponible_p");
const Louée_p = document.getElementById("Louée_p");
const En_maintenance_p = document.getElementById("En_maintenance_p");




function statistiqueStatus() {

    const container_status = document.getElementById("container_status");
    let tableau_status_trie = [V_disponible, V_louiees, V_enMaintenance];

    console.log(tableau_status_trie);
    tableau_status_trie = tableau_status_trie.sort((a, b) => b.length - a.length);

    tableau_status_trie.forEach(t_status => {
        if (t_status[0].statut === "Disponible") {
            const Disponible_div = document.createElement("div");
            const Disponible_p_num = document.createElement("p");
            const Disponible_p_nom = document.createElement("p");
            // const Louée_p = document.createElement("p") ;
            // const En_maintenance_p = document.createElement("p") ;
            Disponible_p_nom.textContent = "Disponible";
            Disponible_p_num.textContent = ((N_V_disponible * 100) / voitures.length).toFixed(1) + " %";
            Disponible_div.append(Disponible_p_nom, Disponible_p_num);
            container_status.append(Disponible_div);


            Disponible_p_nom.className = "badge badge-disponible"

        }
        if (t_status[0].statut === "Louée") {
            const Louée_div = document.createElement("div");
            const Louée_p_num = document.createElement("p");
            const Louée_p_nom = document.createElement("p");
            // const Louée_p = document.createElement("p") ;
            // const En_maintenance_p = document.createElement("p") ;
            Louée_p_nom.textContent = "Disponible";
            Louée_p_num.textContent = ((N_V_louiees * 100) / voitures.length).toFixed(1) + " %";
            Louée_div.append(Louée_p_nom, Louée_p_num);
            container_status.append(Louée_div);


            Louée_p_nom.className = "badge-louee badge" ;

        }
        if (t_status[0].statut === "En maintenance") {
            const En_maintenance_div = document.createElement("div");
            const En_maintenance_p_num = document.createElement("p");
            const En_maintenance_p_nom = document.createElement("p");
            // const Louée_p = document.createElement("p") ;
            // const En_maintenance_p = document.createElement("p") ;
            En_maintenance_p_nom.textContent = "Disponible";
            En_maintenance_p_num.textContent = ((N_V_enMaintenance * 100) / voitures.length).toFixed(1) + " %";
            En_maintenance_div.append(En_maintenance_p_nom, En_maintenance_p_num);
            container_status.append(En_maintenance_div);

            En_maintenance_p_nom.className = "badge badge-maintenance" ;

        }

        console.log(t_status[0].statut);

    })



}
statistiqueStatus();


// le pourcentage des voiture pour chaque categorie
function statistiqueCategorie() {


    let tableauCategorie = [];
    voitures.forEach(v => {

        if (!(tableauCategorie.some(cat => cat.categorie === v.categorie))) {
            let count = 0;
            let voitre1 = {};
            voitures.forEach(voiture => {
                if (v.categorie === voiture.categorie) {
                    count++
                    voitre1 = { categorie: v.categorie, N_categorie: count }
                }
            })
            tableauCategorie.push(voitre1);
        }

    })


    let tableauCategorie_trie = tableauCategorie.sort((a, b) => b.N_categorie - a.N_categorie);

    const container = document.getElementById("container");
    tableauCategorie_trie.map(c => {


        const div_parent = document.createElement("div");
        const div_nom_num_categorie = document.createElement("div");
        const div_graphique = document.createElement("div");

        div_nom_num_categorie.className = "w-[90%] flex justify-between  rounded-md mx-auto mt-4"
        div_graphique.className = "w-[90%] bg-slate-300 rounded-md mt-2 mx-auto"

        const p_nom_categorie = document.createElement("p");
        const p_num_categorie = document.createElement("p");
        const p_graphique = document.createElement("p");


        p_graphique.classList.add("h-3", "bg-blue-900", "rounded-md", `w-[${((c.N_categorie * 100) / voitures.length)}%]`);

        p_nom_categorie.textContent = c.categorie;
        p_num_categorie.textContent = c.N_categorie;

        div_nom_num_categorie.append(p_nom_categorie, p_num_categorie);
        div_graphique.append(p_graphique);
        div_parent.append(div_nom_num_categorie, div_graphique);
        container.append(div_parent)
    })

}
statistiqueCategorie();