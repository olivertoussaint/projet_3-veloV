    // EVENTS WHEN BUTTONS ARE CLICK ON

    // affichage du canvas pour approuver la réservation via une signature
    var Booking = {
        initBooking: function() {
            document.getElementById("signaturesCanvas").style.display = "block";
            cancel.style.display = 'inline-block';
            cancel.disabled = false;
        }
    };
    // Reset de la réservation et non affichage de la partie du canvas
    var Cancel = {
        initCancel: function() {
            document.getElementById("signaturesCanvas").style.display = "none";
            cancel.style.display = "none";
            booking.disabled = false;
        }
    };
    // Validation de la réservation
    var Validation = {
        initValidation: function(canvasSignature, Timer) {
            annulation.style.display = 'block';
            if (Map.currentMarker.available_bikes > 0 && canvasSignature.validCanvas === true) {
                cancel.disabled = true;
                Map.currentMarker.available_bikes--;
                Aside.initAside();
                reservationSection.style.display = 'inline-block';
                document.getElementById("footer").style.backgroundColor = "";
                document.getElementById("footer").style.backgroundColor = "honeydew";
                document.getElementById("footer").style.opacity = "0.8";
                signaturesCanvas.style.display = 'none';

                // Récupération et stockage des données nécessaire à la réservation
                var heureReservation = new Date().getTime();
                sessionStorage.setItem('heure', heureReservation);
                sessionStorage.setItem('station', Map.currentMarker.station_name);
                sessionStorage.setItem('dispo', Map.currentMarker.available_bikes);

                //Valeur du storage dans variable globales
                sessionStation = sessionStorage.getItem('station');
                sessionHeure = sessionStorage.getItem('heure');
                reservationSection.textContent = "Vous avez réservé un vélo à la station : " + sessionStorage.station;

                //Démarrage du compte à rebours
                Timer.initChrono();

                //affichage de la div countDown
                Timer.countdown.style.display = "block";
                
                //on efface la signature du canvas
                canvasSignature.clearCanvas();
            }
            //si absence de signature
            else if (canvasSignature.validCanvas === false) {
                setTimeout(function() {
                    signInfo.textContent = "";
                }, 3000);
                signInfo.textContent = "Veuillez signer :-) ";
                signInfo.style.color = "rgb(178, 39, 37)";
                erase.disabled = false;
                validation.disabled = false;
                annulation.style.display = "none";
            }
        }
    };

    var CancelReservation = {
        initCancelReservation: function(approve) {
            if (approve === 1) {
                var answer = window.confirm("êtes-vous sûr de vouloir annuler votre réservation ?");
                if (answer == false) {
                    return;
                }
            }
            document.getElementById("reservationSection").innerHTML = "Réservation annulée";
            document.getElementById("reservationSection").style.color = "#ffffff"; 

            //Affichage ou non des éléments après 3 secondes
            setTimeout(function() {
                document.getElementById("reservationSection").innerHTML = "Vous n'avez pas de réservation";
                document.getElementById("reservationSection").style.color = "initial";
                booking.disabled = false;
                document.getElementById("cancel").style.display = "none";
                document.getElementById("footer").style.backgroundColor = "";
            }, 3000);
            sessionStorage.clear();
            document.getElementById("annulation").style.display = "none";
            document.getElementById("countdown").style.display = "none";
        }
    };
   
    // annulation de l'Object Canvas
    document.getElementById('cancel').addEventListener('click', function() {
        this.canvas = document.getElementById('canvas');
        this.ctx = canvas.getContext('2d');
        this.ctx.clearRect(0, 0, canvas.width, canvas.height);
        canvas.width = this.canvas.width; //effacement tactile
        this.validCanvas = false; //passage de la validation a fausse
    }, false);

    // effacement de l'Object Canvas
    document.getElementById('erase').addEventListener('click', function() {
        this.canvas = document.getElementById('canvas');
        this.ctx = canvas.getContext('2d');
        this.ctx.clearRect(0, 0, canvas.width, canvas.height);
        canvas.width = this.canvas.width; //effacement tactile
        this.validCanvas = false; //passage de la validation a fausse     
    }, false);