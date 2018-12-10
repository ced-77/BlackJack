$(document).ready( function(){

/*
    controle de du montant de total des parties....
*/

    if ( ( score_total_banque != 0 ) || ( score_total_joueur != 0 ) ) {

        // afficher les scores totaux
        var scores_totaux = '<p>Score total joueur : <span>'+
                            score_total_joueur+'</span></p>'+
                            '<p>Score total banque : <span>'+
                            score_total_banque+'</span></p>';


        $('#scores_totaux').html(scores_totaux);
    }



/*

    Redirection vers le jeu ou la sortie
*/

    $("#nouveau_jeu_oui").on('click', function(event){
        event.preventDefault;
        console.log("j'ai tapé oui...");
        $("#la_page").load("tour.html");
        
    // fin du click sur le bouton oui
    });

    $("#nouveau_jeu_non").on('click', function(event){
        event.preventDefault;
        console.log("j'ai papé non...");
        $("#la_page").load("finPartie.html");

    //fin du click sur le bouton non
    });



});