var globalMain = {
    init: function() {

        var sessionsStorage = window.sessionStorage; // Variable dans la portée globale
        var sessionStation, sessionHeure; // Variables dans la portée globale

        // création et initialisation de l'Objet myMap
        var myMap = Object.create(Map);
        var myMap = Map.initMap();

        var next = document.getElementById('next');
        var prev = document.getElementById('prev');

        // structure des images du carrousel
        var slide1 = Object.create(Slide);
        slide1.initImage("images/visuel_mode-emploi.jpg", "images/zoom.PNG", "1/5 Zoomer sur la carte pour choisir une des stations.");

        var slide2 = Object.create(Slide);
        slide2.initImage("images/lyon_1.jpg", "images/selection.PNG", "2/5 Selectionnez une station.");

        var slide3 = Object.create(Slide);
        slide3.initImage("images/lyon_2.jpg", "images/validation.PNG", "3/5 Cliquez sur le bouton Réserver.");

        var slide4 = Object.create(Slide);
        slide4.initImage("images/lyon_3.jpg", "images/signature.PNG", "4/5 Signez et cliquez sur le bouton Valider.");

        var slide5 = Object.create(Slide);
        slide5.initImage("images/lyon_4.jpg", "images/reservation.PNG", "5/5 Vous disposez de 20 minutes pour finaliser la réservation.");

        // mise en place des images dans un tableau
        var slider = [];
        slider.push(slide1);
        slider.push(slide2);
        slider.push(slide3);
        slider.push(slide4);
        slider.push(slide5);

        // gestion du changement de slide par flèches gauche et droite du clavier
        document.addEventListener("keydown", function(e) {
            if (e.keyCode === 37) {
                monSlider.deplacement(-1);
            } else if (e.keyCode === 39) {
                monSlider.deplacement(1);
            }
        });
        // création et initialisation de l'Objet monSlider
        var monSlider = Object.create(Slider);
        monSlider.initSlider(slider);

        //*****************************************
        // gestion des clics du carrousel
        next.addEventListener("click", function() {
            monSlider.deplacement(1);
        });

        prev.addEventListener("click", function() {
            monSlider.deplacement(-1);
        });

        document.getElementById("auto").addEventListener("click", slideShow);

        function slideShow() {
            this.timer = 5000;
            auto.disabled = true;
            play = setInterval(function() {
                monSlider.deplacement(1);
            }, timer);
            document.getElementById("pause").addEventListener("click", stop);

            function stop() {
                clearInterval(play);
                auto.disabled = false;
            }
        }
        window.onload = slideShow();

        //******************************************
        //Events of several buttons
        booking.addEventListener('click', function(e) {
            var reservation = Object.create(Booking);
            reservation.initBooking();
        });

        cancel.addEventListener('click', function(e) {
            var annulation = Object.create(Cancel);
            annulation.initCancel();
        });

        annulation.addEventListener('click', function(e) {
            var annulationReservation = Object.create(CancelReservation);
            annulationReservation.initCancelReservation(1);
        });

        //********************************************
        var ajaxGet = Object.create(Ajax);
        ajaxGet.init("https://api.jcdecaux.com/vls/v1/stations?contract=Lyon&apiKey=b49097adb4d15deb03b36e63d2409771ceced11d");

        ajaxGet.response(function(reponse) {
            // Transforme la réponse en tableau d'objets JavaScript
            this.stations = JSON.parse(reponse);
            // Tableau qui contiendra nos markers & stations
            this.markers = [];
            // instanciation de l'info bulle
            var infowindow = new google.maps.InfoWindow();
            // Si il y a une réservation dans le storage
            if (typeof sessionStorage.station != 'undefined') {
                document.getElementById("reservationFooter").innerHTML = "Vous avez une réservation en cours à la station : " + sessionStorage.station;
                document.getElementById("reservationFooter").style.color = "initial";
                document.getElementById("countdown").innerHTML = Timer.initChrono();
                document.getElementById("reservationFooter").style.display = "block";
                document.getElementById("countdown").style.display = "block";
                document.getElementById("annulation").style.display = "block";
                document.getElementById("footer").style.backgroundColor = "honeydew";
                document.getElementById("footer").style.opacity = "0.9";
            } else {
                document.getElementById("reservationFooter").style.display = "block";
                document.getElementById("reservationFooter").innerHTML = "Vous n'avez pas de réservation";
                document.getElementById("reservationFooter").style.color = "initial";
                document.getElementById("footer").style.backgroundColor = "";
                document.getElementById("footer").style.opacity = "";
            };

            this.stations.forEach(function(station) {
                // Si il y a une réservation, on lui soustrait un vélo
                if (station.name === sessionStorage.getItem('station')) {
                    station.available_bikes--;
                }

                // création et initialisation de l'Objet icon
                var icon = Object.create(Iconstation);
                var myIcon = icon.initIconstation(station);

                // création de marker à partir de l'objet google Marker
                var marker = new google.maps.Marker({
                    title: station.name,
                    station_name: station.name,
                    bikeAdress: station.address,
                    available_bikes: station.available_bikes,
                    available_bike_stands: station.available_bike_stands,
                    status: station.status,
                    terminalPaie: station.banking,
                    last_update: station.last_update,
                    number: station.number,
                    position: station.position,
                    map: Map.map,
                    icon: myIcon,
                    // Fin de la méthode          
                });

                // création d'un évènement click qui ouvre une infowindow sur chaque marker selectionné ainsi qu'une fenêtre contenant diverses infos de la stations. 
                marker.addListener('click', function() {
                    speechBubble = Object.create(Tooltip);
                    speechBubble.initTool(marker, infowindow);
                    speechBubble.tool();
                    aside = Object.create(Aside);
                    aside.initAside(marker);
                    aside.aside();
                });
                // ajout du markers dans le tableau des markers
                Map.markers.push(marker);

            });
            // Regroupement des markers 
            this.markerCluster = new MarkerClusterer(Map.map, Map.markers, {
                imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
            });
        });

        //************************************************
        // création et initialisation de l'Objet Canvas
        var canvasSignature = Object.create(Canvas);
        canvasSignature.initCanvas();

        //Evenements Souris
        canvasSignature.canvas.addEventListener('mousedown', function(e) {
            canvasSignature.isDrawing = true;
            [canvasSignature.lastX, canvasSignature.lastY] = [e.offsetX, e.offsetY];
            canvasSignature.validCanvas = true
        });
        canvasSignature.canvas.addEventListener('mousemove', function(e) {
            canvasSignature.draw(e)
        });
        canvasSignature.canvas.addEventListener('mouseup', function() {
            canvasSignature.isDrawing = false
        });
        canvasSignature.canvas.addEventListener('mouseout', function() {
            canvasSignature.isDrawing = false
        });

        //Evenements Tactile
        canvasSignature.canvas.addEventListener('touchstart', function(e) {
            var touchobj = e.changedTouches[0]; // reference first touch point (ie: first finger)
            canvasSignature.startx = parseInt(touchobj.clientX); // récupération du point de depart en x
            canvasSignature.starty = parseInt(touchobj.clientY); // récupération du pojnt de depart en y
            canvasSignature.isDrawing = true;
            e.preventDefault();
        });
        canvasSignature.canvas.addEventListener('touchmove', function(e) {
            var touchobj = e.changedTouches[0]; // reference first touch point (ie: first finger)
            canvasSignature.distx = parseInt((touchobj.clientX) - canvasSignature.startx);
            canvasSignature.disty = parseInt((touchobj.clientY) - canvasSignature.starty);
            canvasSignature.drawTact();
            canvasSignature.isDrawing = true;
            canvasSignature.validCanvas = true;
            e.preventDefault();
        });
        canvasSignature.canvas.addEventListener('touchend', function(e) {
            canvasSignature.isDrawing = false;
            e.preventDefault();
        });

        //********************************************
        // création et initialisation de l'Objet Timer
        var Timer = Object.create(Chrono);
        Timer.initChrono();

        validation.addEventListener('click', function(e) {
            var validation = Object.create(Validation);
            validation.initValidation(canvasSignature, Timer);
        });
    }

}
//******************************************************
// création et initialisation de l'Objet Main
var Main = Object.create(globalMain);
Main.init();