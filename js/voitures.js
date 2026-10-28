import { voitures , ajouterVoiture } from './data.js';

//=====================Afficher================
// une fonction pour creer les élements html pour afficher un voiture
function creer_tr_voiture(liste_voitures, voiture) {
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
    const span_prixJour = document.createElement("span");
    span_prixJour.textContent = " DH / jour";
    const span_status = document.createElement("span");

    // buttons
    const div_buttons = document.createElement("div");
    const btn_modifier = document.createElement("button");
    btn_modifier.textContent = "Modifier";
    const btn_supprimer = document.createElement("button");
    btn_supprimer.textContent = "Supprimer";

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
    div_buttons.classList.add("row-actions");
    // button modifier
    btn_modifier.setAttribute("type", "button");
    btn_modifier.classList.add("button", "button-edit");
    btn_modifier.setAttribute("data-action", "modifier");
    btn_modifier.setAttribute("data-id", "1");
    btn_modifier.setAttribute("aria-label", `Modifier ${voiture.marque, voiture.modele, voiture.immatriculation}`);
    // button supprimer
    btn_supprimer.setAttribute("type", "button");
    btn_supprimer.classList.add("button", "button-delete");
    btn_supprimer.setAttribute("data-action", "supprimer");
    btn_supprimer.setAttribute("data-id", "1");
    btn_supprimer.setAttribute("aria-label", `Supprimer ${voiture.marque, voiture.modele, voiture.immatriculation}`);

    td_marque.append(strong_marque);
    td_immatriculation.append(span_immatriculation);
    td_prixJour.appendChild(span_prixJour);
    // td_prixJour.innerHTML = span_prixJour ;
    td_statut.append(span_status);
    div_buttons.append(btn_modifier, btn_supprimer);
    td_action.append(div_buttons);
    tr_voiture.append(td_marque, td_modele, td_immatriculation, td_categorie, td_prixJour, td_statut, td_action)
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

// une fonction pour afficher les voitures sur un tableau html daynamiquement
function Afficher(voitures) {

    const liste_voitures = document.getElementById("liste-voitures");
    liste_voitures.innerHTML = "";

    if (voitures.length != 0) {

        voitures.forEach(voiture => {

            // creer les élements html et les retourne par un objet elements_tr
            const elements_tr = creer_tr_voiture(liste_voitures, voiture);

            // remplire tr par des informations du voiture
            remplir_info(voiture, elements_tr);
        });

    } else {
        const etat_vide = document.getElementById("etat-vide");
        etat_vide.removeAttribute("hidden")
    }
}
Afficher(voitures);


//=====================Ajouter================
// une fonction pour retourne les les inputs de html en javascript
function getInputsHtmlForm() {
    const formulaire_voiture = document.getElementById("formulaire-voiture");
    const marque_input = document.getElementById("marque");
    const modele_input = document.getElementById("modele");
    const immatriculation_input = document.getElementById("immatriculation");
    const categorie_input = document.getElementById("categorie");
    const prix_jour_input = document.getElementById("prix-jour");
    const statut_input = document.getElementById("statut");
    const bouton_enregistrer = document.getElementById("bouton-enregistrer");
    const annuler_modification = document.getElementById("annuler-modification");

    const erreur_marque = document.getElementById("erreur-marque") ;
    const erreur_modele= document.getElementById("erreur-modele") ;
    const aide_immatriculation = document.getElementById("aide-immatriculation") ;
    const erreur_immatriculation = document.getElementById("erreur-immatriculation") ;
    const erreur_categorie = document.getElementById("erreur-categorie") ;
    const erreur_prix_jour = document.getElementById("erreur-prix-jour") ;
    const erreur_statut = document.getElementById("erreur-statut") ;
    const message_formulaire = document.getElementById("message-formulaire") ;
    return {
        formulaire_voiture: formulaire_voiture,
        marque_input: marque_input,
        modele_input: modele_input,
        immatriculation_input: immatriculation_input,
        categorie_input: categorie_input,
        prix_jour_input: prix_jour_input,
        statut_input: statut_input,
        bouton_enregistrer: bouton_enregistrer,
        annuler_modification: annuler_modification , 
        erreur_statut :erreur_statut ,
        erreur_prix_jour : erreur_prix_jour ,
        erreur_categorie : erreur_categorie ,
        erreur_immatriculation :erreur_immatriculation , 
        aide_immatriculation : aide_immatriculation ,
        erreur_modele : erreur_modele ,
        erreur_marque :erreur_marque , 
        message_formulaire:message_formulaire
    }
}

// get les variable des element form de fonction getInputsHtmlForm()
const {
    formulaire_voiture,
    marque_input,
    modele_input,
    immatriculation_input,
    categorie_input,
    prix_jour_input,
    statut_input,
    bouton_enregistrer,
    annuler_modification ,
    erreur_marque ,
    erreur_modele ,
    aide_immatriculation ,
    erreur_immatriculation ,
    erreur_categorie , 
    erreur_prix_jour , 
    erreur_statut ,
    message_formulaire
} = getInputsHtmlForm();
const listeInputs = document.querySelectorAll("#marque", "#modele", "#immatriculation", "#categorie", "#prix-jour", "#statut")

// une fonction pour creer et ajouter la nouvelle voiture
function Ajouter(){
    const voiture = {
        id : voitures.length + 1 ,
        marque : marque_input.value ,
        modele : modele_input.value ,
        immatriculation : immatriculation_input.value ,
        categorie : categorie_input.value ,
        prixJour : prix_jour_input.value ,
        statut : statut_input.value 
    }

    ajouterVoiture(voiture) ;
    Afficher(voitures) ;
}

// une fonction pour valide les champs est afficher les error si exist avant d'ajouter ou modifier
function Valider_champs(){
    
    let is_immatricule_exist = false ; 
    !marque_input.value.trim() ? erreur_marque.textContent = "entrer la marque du voiture"  : erreur_marque.textContent = "" ;
    !modele_input.value.trim() ? erreur_modele.textContent = "entrer le modele du voiture" : erreur_modele.textContent = "" ;
    // !immatriculation_input.value.trim() ? erreur_immatriculation.textContent = "entrer l'immatricule du voiture" : erreur_immatriculation.textContent = "" ;
    !categorie_input.value.trim() ? erreur_categorie.textContent = "choisir la categorie du voiture" : erreur_categorie.textContent = "" ;
    !prix_jour_input.value.trim() ? erreur_prix_jour.textContent = "entrer le prix par jour du voiture" : erreur_prix_jour.textContent = "" ;
    !statut_input.value.trim() ? erreur_statut.textContent = "choisir le status " : erreur_statut.textContent = "" ;

    if (!immatriculation_input.value.trim()) {
        erreur_immatriculation.textContent = "entrer l'immatricule du voiture" ;
    }
    else if (voitures.some( v => v.immatriculation.toLowerCase() === immatriculation_input.value.trim().toLowerCase())) {
        erreur_immatriculation.textContent = "c'immatricule est deja exist" ;
        is_immatricule_exist = true ;
    }else if(!(/^[a-zA-Z]{4}-\d{3}$/.test(immatriculation_input.value))){
        
        erreur_immatriculation.textContent = "respecter la form du matricule(4 lettres - 3 chifres)" ;
    }
    else{
        erreur_immatriculation.textContent = "" ;
        is_immatricule_exist = false ;
    }


    if (prix_jour_input.value < 0) {
        erreur_prix_jour.textContent = "entrer le prix par jour du voiture" ;
    }else{
        erreur_prix_jour.textContent = "" ;

    }

    if(/^[a-zA-Z]{4}-\d{3}$/.test(immatriculation_input.value) && marque_input.value.trim() && modele_input.value.trim() && categorie_input.value.trim() && prix_jour_input.value.trim() && statut_input.value.trim() && immatriculation_input.value.trim() && !is_immatricule_exist && prix_jour_input.value > 0 ){
        Ajouter()
    }

    
}

// appel au fonction losque on submit le form
formulaire_voiture.addEventListener("submit" , (e)=>{
    e.preventDefault() ;
    Valider_champs() ;
    
} ) ;



