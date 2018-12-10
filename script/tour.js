$(document).ready( function() {

console.log("tableau du tour : ");
console.log(tableau_original);
console.log("la donne : ");
console.log(donne);

/*
    initialisation des variables 
*/

    // cumul de la main du jouer
    if ( typeof main_joueur === "undefined" ){
        var main_joueur = 0;
    } 

    // cumul de la main de la banque
    if ( typeof main_banque === "undefined" ){
        var main_banque = 0;
    }

/*
    creation de la fonction de tirage de la donne
*/

    function TirageDonne (){
        var carte;
        carte = donne[compteur_donne];
        compteur_donne = compteur_donne + 1;
        return carte;
    }

/*
    creation de la fonction de recupération de la 
    valeur de la carte pour calculer la main
*/
    function ValeurCarte (nomCarte) {
        // recupération de l'attribut
        var carte = nomCarte;
        // controle si c'est une figure -> attribuer une valeur de 10
        // sinon prendre la valeur
            // recuperer la premiere lettre pour controler
            var premiere_lettre = carte.substring(0, 1) ;

            if (premiere_lettre == "R" || premiere_lettre == "D" || premiere_lettre =="V" ){
               // attribution de la valeur 10
                var valeur = 10;

            } else {
                // recupération de la valeur numérique de la carte
                var valeur = parseFloat(carte) ;
                
            }
        return valeur;
    }


/*
    Creation de la fonction de controle de l'As
*/
    function ControleAs (valeur){
        if (valeur == 1){
            var saisie = confirm("As tiré, Voulez vous la valeur 11 ?");
            if (saisie == true) {
                valeur = 11;
            } else { valeur = 1; }
        
        }
        return valeur;
    }



// affichage des scores totaux
    $('#montant_score_banque').html(score_total_banque);
    $('#montant_score_joueur').html(score_total_joueur);



/*
    Creation de la premiere donne joueur et banque
*/

for (var i=0 ; i < 2 ; i++) {
    // Declaration des variable pour le for
        var nomCarte = "";
        var valeur_de_carte = "";
        var carte_joueur = "";
        var carte_banquier = "";
    
    
    
    // inserer les cartes au banquier et au joueur

    // inserer la carte au joueur
        nomCarte = TirageDonne();
        // recupere sa valeur numérique pour calculer la main
             valeur_de_carte = ValeurCarte(nomCarte);
            // controle si c'est l'as
             valeur_de_carte = ControleAs(valeur_de_carte);
            // calculer la main du joueur  
             main_joueur = main_joueur + valeur_de_carte;

            console.log("valeur de la carte "+nomCarte+"est de "+valeur_de_carte);
            console.log("le total de la main est de : "+main_joueur);
        // afficher la carte à l'écran
        carte_joueur = '<img scr="img/Fond_carte.jpg" alt="'+nomCarte+'" />';
    
        $("#le_joueur_les_cartes").append(carte_joueur);
        // affichage de la main du joueur
        $('#montant_main_joueur').html(main_joueur);

    // inserer la carte au banquier
        nomCarte = TirageDonne();
        // recupere la valeur de la carte
        valeur_de_carte = ValeurCarte(nomCarte);
        // controle si c'est un As
        valeur_de_carte = ControleAs(valeur_de_carte);
        // calculer la main du banquier
        main_banque = main_banque + valeur_de_carte;
        // afficher la carte à l'écran
        carte_banquier = '<img src="img/Fond_carte.jpg" alt="'+nomCarte+'" />';
        $("#la_banque_les_cartes").append(carte_banquier);

// fin du for pour la premiere donne
}



// ajout d'un bouton pour passer son tour et un bouton pour la donne
var bouton_passe = '<button id="bouton_passe" class="bouton_choix_tour" choix="passe" >Passer</button>';
var bouton_donne = '<button id="bouton_donne" class="bouton_choix_tour" choix="donne" >Donne</button>';
$("#la_donne").append(bouton_passe+bouton_donne);

// Tour du joueur
// initialisation de la variable saisie et main
var saisie ="";
var main = main_joueur;
   
    $("#bouton_donne").on('click', function(event){
        event.preventDefault;
        choix = $(this).attr('choix');
        console.log(choix);
        
            // je prend une carte
            var nomCarte = TirageDonne();
            var valeur_carte = ValeurCarte(nomCarte);            
            valeur_carte = ControleAs(valeur_carte);            
            main = main + valeur_carte;
            main_joueur = main;
            

            var carte_joueur = '<img scr="img/Fond_carte.jpg" alt="'+nomCarte+'" />';
    
            $("#le_joueur_les_cartes").append(carte_joueur);
            // affichage de la main du joueur
            $('#montant_main_joueur').html(main_joueur);

            if (main > 21){
                // si > 21 alors je supprime la bouton de la donne pour 
                // obliger le joeur à passer
                $(this).remove();
                saisie ="passe";
                // fin du if sur > 21
                }
            
        // fin du click sur donne        
        });
   
    $('#bouton_passe').on('click', function(event){

        event.preventDefault;
        saisie = "passe";
            console.log("je suis dans le passe ...");
            console.log("la variable main est de :"+main);
            $('#bouton_donne').remove();
            // fin du if sur le choix = passe

            /*
                Tour de la banque
            */

                if (main_joueur > 21 ){
                    score_total_banque = score_total_banque + 1 ;
                    // inserer un message pour dire que la banque gagne
                        var affiche = '<p id="affichage_perdu_gagne" >La Banque Gagne<p>';
                    $("#la_banque").append(affiche);
                    // recharger la page du debut (script)
                    $('#la_page').load('nouveaujeu.html');

                } else {
                    // faire si main_banque < main_joueur et main_banque < 21
                }


            // Fin du tour de la Banque

    // fin du click sur passe
    });



    














// fin du scrypt
});