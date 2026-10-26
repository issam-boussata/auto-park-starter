import { voitures } from './data.js';



function creer_tr_voiture(liste_voitures , voiture) {
    // creer les élements html pour afficher les voiture sur tableau
    const tr_voiture = document.createElement("tr");
    const td_marque = document.createElement("td");
    const td_modele = document.createElement("td");
    const td_immatriculation = document.createElement("td");
    const td_categorie = document.createElement("td");
    const td_prixJour = document.createElement("td");
    const td_statut = document.createElement("td");
    const td_action = document.createElement("td");

    const strong_marque = document.createElement("strong");
    const span_immatriculation = document.createElement("span");
    const span_prixJour = document.createElement("span") ;
    span_prixJour.textContent = " DH / jour";
    const span_status = document.createElement("span");

    // buttons
    const div_buttons = document.createElement("div");
    const btn_modifier = document.createElement("button") ;
    btn_modifier.textContent = "Modifier";
    const btn_supprimer = document.createElement("button") ;
    btn_supprimer.textContent = "Supprimer";

    // ajouter les atributes html
    span_immatriculation.classList.add("registration");
    td_prixJour.classList.add("price");
    switch (voiture.statut) {
        case "Disponible":
            span_status.classList.add("badge"  , "badge-disponible");
            break;

        case "Louée":
            span_status.classList.add("badge"  , "badge-louee");
            break;
            
        default:
            span_status.classList.add("badge"  , "badge-maintenance");
            break;
    }
    div_buttons.classList.add("row-actions");
    // button modifier
    btn_modifier.setAttribute("type" , "button");
    btn_modifier.classList.add("button" , "button-edit") ;
    btn_modifier.setAttribute("data-action", "modifier");
    btn_modifier.setAttribute("data-id", "1");
    btn_modifier.setAttribute("aria-label", `Modifier ${voiture.marque , voiture.modele , voiture.immatriculation}`);
    // button supprimer
    btn_supprimer.setAttribute("type", "button");
    btn_supprimer.classList.add("button", "button-delete");
    btn_supprimer.setAttribute("data-action", "supprimer");
    btn_supprimer.setAttribute("data-id", "1");
    btn_supprimer.setAttribute("aria-label", `Supprimer ${voiture.marque , voiture.modele , voiture.immatriculation}`);

    td_marque.append(strong_marque);
    td_immatriculation.append(span_immatriculation);
    td_prixJour.appendChild(span_prixJour);
    // td_prixJour.innerHTML = span_prixJour ;
    td_statut.append(span_status);
    div_buttons.append(btn_modifier, btn_supprimer);
    td_action.append(div_buttons);
    tr_voiture.append(td_marque, td_modele, td_immatriculation, td_categorie, td_prixJour, td_statut, td_action)
    liste_voitures.append(tr_voiture);

    return {strong_marque : strong_marque , td_modele : td_modele , span_prixJour : span_prixJour, span_immatriculation : span_immatriculation , td_categorie : td_categorie , td_prixJour : td_prixJour , span_status : span_status }
}

// une fonction pour remplir les information du voiture su tr du tableau
function remplir_info(voiture , elements){

    elements.strong_marque.textContent = voiture.marque ;
    elements.td_modele.textContent = voiture.modele ;
    elements.span_immatriculation.textContent = voiture.immatriculation ;
    elements.td_categorie.textContent = voiture.categorie ;
    elements.td_prixJour.textContent = voiture.prixJour ;
    elements.td_prixJour.appendChild(elements.span_prixJour)
    elements.span_status.textContent = voiture.statut ;

}

// une fonction pour afficher les voitures sur un tableau html daynamiquement
function Afficher(voitures) {

    const liste_voitures = document.getElementById("liste-voitures");
    liste_voitures.innerHTML = "" ;

    if (voitures.length != 0) {

        voitures.forEach(voiture => {
                 
            // creer les élements html et les retourne par un objet elements_tr
            const elements_tr = creer_tr_voiture(liste_voitures , voiture) ;
            
            // remplire tr par des informations du voiture
            remplir_info(voiture , elements_tr) ;
        });

    }else{
        const etat_vide = document.getElementById("etat-vide") ;
        etat_vide.removeAttribute("hidden")
    }
}
Afficher(voitures) ;
