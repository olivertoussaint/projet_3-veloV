var Chrono = {
    duration : 20, //temps de réservation en minutes
 
   initChrono: function() {
            //initialisation du compte à rebours
            this.countdown = document.getElementById('countdown');
            //On récupere l'heure de reservation dans le storage
            sessionHeure = sessionStorage.getItem('heure');
            var chronometer = setInterval(function() {
            // On récupére l'heure actuelle en secondes
            this.time = new Date().getTime();
            // On fait la différence entre l'heure actuelle et l'heure de la réservation
            this.timeDifference = this.time - Number(sessionHeure);
            // On initialise le compteur à 20 minutes (1.200.000 millisecondes)
            this.compteur = Math.round(((Chrono.duration*60*1000) - this.timeDifference) / 1000);
            // On calcule les minutes et les secondes restantes
            this.minutes = Math.floor(this.compteur / 60);
            this.secondes = this.compteur % 60;
            // On affiche le compteur en fonction du temps qu'il reste
            if (this.minutes > 0) {
                this.countdown.style.color = "initial";
                this.countdown.textContent="Vous disposez de : " + this.minutes + " minute(s) et " + this.secondes + " seconde(s) pour  valider votre choix";
            } else {
                this.countdown.textContent="Il ne vous reste que : " + this.secondes + " seconde(s) pour valider votre choix";
                this.countdown.style.color = "";
            }
            //On stop le compteur et on execute la fonction annulation
            if (this.minutes <= 0 && this.secondes <= 0) {
                clearInterval(chronometer);
                CancelReservation.initCancelReservation();
            }
        }, 0);
    }

}


