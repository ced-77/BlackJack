$(document).ready( function() {

console.log("tableau du tour : ");
console.log(tableau_original);


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
        Initialisation de la fonction de la donne
*/
    
    function nouvelleDonne ( original){
        var i;
        var Num;
        var Nbr = original.length;
        var nouvelleDonne = new Array();
        //-- Copie le contenu
        nouvelleDonne = nouvelleDonne.concat(original);
        //-- Lance la boucle
        while( Nbr> 0){
            //-- Recup nombre aleatoire
            Num = Math.floor(Math.random() * Nbr);
            //-- 1 de moins a traiter
            Nbr--;
            //-- Stock l'element tire
            szTmp = nouvelleDonne[Num];
            //-- Decalage les valeur du tableau
            for( i= Num; i < Nbr; i++)
                nouvelleDonne[i] = nouvelleDonne[i+1]
            //-- Stock l'element tire en fin
            nouvelleDonne[ Nbr] = szTmp;
        }
        //-- On peut remettre dans l'ordre du tirage
        nouvelleDonne.reverse();
        //-- Retourne resultat
        return( nouvelleDonne);
    } 

// verification de l'existance de la variable donne
// si elle n'existe pas on crée une nouvelle donne
    if ( typeof donne === "undefined" ){
        donne = nouvelleDonne(tableau_original);
    } 

// affichage de la donne pour controle
console.log("la donne : ");
console.log(donne);



/*
    creation de la fonction de tirage de la donne
*/

    function TirageDonne (){
        let carte;

        // controle si la donne n'est pas vide si c'est le cas
        // on crée une nouvelle donne et on remet le compteur à zéro
        if (compteur_donne >= 52 ){
            donne = nouvelleDonne(tableau_original);
            compteur_donne = 0;
        }
        // on tire une carte
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
        let carte = nomCarte;
        // controle si c'est une figure -> attribuer une valeur de 10
        // sinon prendre la valeur
            // recuperer la premiere lettre pour controler
            let premiere_lettre = carte.substring(0, 1) ;

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
            let saisie = confirm("As tiré, Voulez vous la valeur 11 ?");
            if (saisie == true) {
                valeur = 11;
            } else { valeur = 1; }
        
        }
        return valeur;
    }

/*
    Création de la fonction du controle de l'As 
    si c'est la banque qui tire
 */
    function ControleAsBanque (valeur, main){

        if (valeur == 1){
            if ( ( main+11 ) <= 21){
                valeur = 11;
            } else { valeur = 1; }
        }
        return valeur;
    }


/*
    Création de la fonction qui gagne pour afficher le nom du gagnant
    et retour à la page de démarage du jeu pour nouveau jeu
 */

    function QuiGagne (nom){
        let gagnant = nom;

        // affichage des cartes cachées de la banque
            // recupération des valeurs alt des deux cartes
                let alt_carte_1 ="" ;
                let alt_carte_2 = "";
                alt_carte_1 = $("#la_banque_les_cartes img:nth-child(1)").attr("alt");
                alt_carte_2 = $("#la_banque_les_cartes img:nth-child(2)").attr("alt");
                
                let nom_carte_banque_1 = "img/"+alt_carte_1+".jpg";
                let nom_carte_banque_2 = "img/"+alt_carte_2+".jpg";

            // affichage des cartes cachées de la banque
                $("#la_banque_les_cartes img:nth-child(1)").attr("src", nom_carte_banque_1);
                $("#la_banque_les_cartes img:nth-child(2)").attr("src", nom_carte_banque_2);

        // affichage du message qui indique le gagnant
        let affiche = '<p id="affichage_perdu_gagne" >'+gagnant+' qui Gagne<p>';
        $("#la_banque").append(affiche);
        
        // recharger la page du debut avec une attente pour l'affichage du message (script)
        setTimeout( "$('#la_page').load('nouveauJeu.html')", 2500 );
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
        // afficher la carte à l'écran
        carte_joueur = '<img src="img/'+nomCarte+'.jpg" alt="'+nomCarte+'" />';
        $("#le_joueur_les_cartes").append(carte_joueur);
        // affichage de la main du joueur
        $('#montant_main_joueur').html(main_joueur);

    // inserer la carte au banquier
        nomCarte = TirageDonne();
        // recupere la valeur de la carte
        valeur_de_carte = ValeurCarte(nomCarte);
        // controle si c'est un As
        valeur_de_carte = ControleAsBanque(valeur_de_carte, main_banque);
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
var bouton_regle = '<button id="bouton_regle" class="bouton_choix_tour" choix="regle" >Regles du jeu</button>';
$("#la_donne").append(bouton_passe+bouton_donne+bouton_regle);

// affichage des relges
$('#bouton_regle').on('click', function(event){
    event.preventDefault;
    var section_regle = $('#regles').html();
  
    if ( section_regle === "" ){
        $('#regles').load("regles.html");
    } else { $('#regles').html(''); }
// Fin de l'appel des regles
});

// Tour du joueur
   
    $("#bouton_donne").on('click', function(event){
        event.preventDefault;
        choix = $(this).attr('choix');
                
            // je prend une carte
            var nomCarte = TirageDonne();
            var valeur_carte = ValeurCarte(nomCarte);            
            valeur_carte = ControleAs(valeur_carte);            
            main_joueur = main_joueur + valeur_carte;
            
            

            var carte_joueur = '<img src="img/'+nomCarte+'.jpg" alt="'+nomCarte+'" />';
    
            $("#le_joueur_les_cartes").append(carte_joueur);
            // affichage de la main du joueur
            $('#montant_main_joueur').html(main_joueur);

            if (main_joueur > 21){
                // si > 21 alors je supprime le bouton de la donne pour 
                // obliger le joueur à passer
                // on change la couleur du bouton passe
                $("#bouton_passe").css({"background-color":"yellow","color":"red", "font-weight":"800"});
                
                $(this).remove();
                let mot_bouton = "Fini pour toi : Clique";
                $('#bouton_passe').html(mot_bouton);
                // fin du if sur > 21
                }
            
        // fin du click sur donne        
        });
   
    $('#bouton_passe').on('click', function(event){

        event.preventDefault;
            // suppression des bouton passe et donne
            $('#bouton_donne').remove();
            $(this).remove();
           

            /*
                Tour de la banque
            */

                if (main_joueur > 21 ){
                    score_total_banque = score_total_banque + 1 ;
                    $('#montant_main_banque').html(main_banque);
                    // inserer un message pour dire que la banque gagne
                    QuiGagne('La Banque');   
                } else {
                    // faire si main_banque < main_joueur et main_banque < 21
                    
                    while ( main_banque <= main_joueur && main_banque < 21 ) {
                        // prend carte
                        // inserer la carte au banquier
                            nomCarte = TirageDonne();
                            // recupere la valeur de la carte
                            valeur_de_carte = ValeurCarte(nomCarte);
                            // controle si c'est un As
                            valeur_de_carte = ControleAsBanque(valeur_de_carte, main_banque);
                            // calculer la main du banquier
                            main_banque = main_banque + valeur_de_carte;
                            // afficher la carte à l'écran
                            carte_banquier = '<img src="img/'+nomCarte+'.jpg" alt="'+nomCarte+'" />';
                            $("#la_banque_les_cartes").append(carte_banquier);
                            // affichage de la main de la banque
                            $('#montant_main_banque').html(main_banque);

                        // fin du while
                        }

                        // controler si main_banque > main_joueur et main_banque < 21
                         if ( main_banque > main_joueur && main_banque <= 21 ){
                            score_total_banque = score_total_banque + 1 ;
                            $('#montant_main_banque').html(main_banque);
                            QuiGagne("La Banque");

                         } else {
                            if ( main_banque < main_joueur || main_banque > 21 ){
                                score_total_joueur = score_total_joueur +1;
                                $('#montant_main_banque').html(main_banque);
                                QuiGagne("Le joueur");
                            } else {
                                // ici main_banque = main_joueur
                                $('#montant_main_banque').html(main_banque);
                                QuiGagne("Personne");
                            }
                            
                         }
                 // Fin du else si la main du joueur est < 21   
                }
            // Fin du tour de la Banque

    // fin du click sur passe
    });
// fin du scrypt
});