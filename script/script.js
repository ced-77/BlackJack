$(document).ready( function() {

    /*
        initialisation des variables
    */
        // Varoabme tableau originel pour la création de la Donne
        tableau_original = new Array();
        tableau_original[0] = "1co"; tableau_original[1] = "Rco"; tableau_original[2] = "Dco"; tableau_original[3] = "Vco"; tableau_original[4] = "10co"; tableau_original[5] = "9co"; tableau_original[6] = "8co"; tableau_original[7] = "7co"; tableau_original[8] = "6co"; tableau_original[9] = "5co"; tableau_original[10] = "4co"; tableau_original[11] = "3co"; tableau_original[12] = "2co";

        tableau_original[13] = "1ca"; tableau_original[14] = "Rca"; tableau_original[15] = "Dca"; tableau_original[16] = "Vca"; tableau_original[17] = "10ca"; tableau_original[18] = "9ca"; tableau_original[19] = "8ca"; tableau_original[20] = "7ca"; tableau_original[21] = "6ca"; tableau_original[22] = "5ca"; tableau_original[23] = "4ca"; tableau_original[24] = "3ca"; tableau_original[25] = "2ca";

        tableau_original[26] = "1pi"; tableau_original[27] = "Rpi"; tableau_original[28] = "Dpi"; tableau_original[29] = "Vpi"; tableau_original[30] = "10pi"; tableau_original[31] = "9pi"; tableau_original[32] = "8pi"; tableau_original[33] = "7pi"; tableau_original[34] = "6pi"; tableau_original[35] = "5pi"; tableau_original[36] = "4pi"; tableau_original[37] = "3pi"; tableau_original[38] = "2pi";

        tableau_original[39] = "1tr"; tableau_original[40] = "Rtr"; tableau_original[41] = "Dtr"; tableau_original[42] = "Vtr"; tableau_original[43] = "10tr"; tableau_original[44] = "9tr"; tableau_original[45] = "8tr"; tableau_original[46] = "7tr"; tableau_original[47] = "6tr"; tableau_original[48] = "5tr"; tableau_original[49] = "4tr"; tableau_original[50] = "3tr";  tableau_original[51] = "2tr";

        // initialisation de la variable de cumul de point
            // verification de l'existance de la variable pour le joueur
                if ( typeof score_total_joueur === "undefined" ){
                    score_total_joueur = 0;
                } 

            // verification de l'existance de la variable pour la banque
                if ( typeof score_total_banque === "undefined" ){
                    score_total_banque = 0;
                } 

        // initialisation du compteur de carte de la nouvelle donne
                if (typeof compteur_donne === "undefined" ){
                    compteur_donne = 0;
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




        // essai de la fonction pour la nouvelle donne
            // verification de l'existance de la variable
            if ( typeof donne === "undefined" ){
                donne = nouvelleDonne(tableau_original);
            } 

        /*
            essai d'utilisation d'une foction dans un autre script
        */
            direBonjours = function () {
                var bonjours = "Hello Word...";
                return bonjours;
            };

            var salut;
            salut = direBonjours();
            console.log(salut);

            console.log("le tableau de carte du script ");
            console.log(tableau_original);







    /*
        affichage de la page d'entrée
    */

    $("#la_page").load("nouveauJeu.html");



   







});