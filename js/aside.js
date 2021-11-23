    var Aside = {
        initAside: function(marker) {
            this.marker = marker;
        },

        aside: function() {
            Map.currentMarker = this.marker;
            // Resize de la map
            this.sizeMap = document.getElementById('map');

            // La aside apparaitra au click sur un marker
            this.info = document.getElementById('infos');
            this.aside = document.getElementById('stations');

            // Le span comprenant la croix de fermeture de l'aside
            this.span = document.getElementsByClassName("close")[0];

            this.stationName = document.getElementById("station_name");
            this.bikeAdress = document.getElementById("bikeAdress");
            this.available_bikes = document.getElementById("available_bikes");
            this.banking = document.getElementById("banking");
            this.available_bike_stands = document.getElementById("available_bike_stands");
            this.status = document.getElementById("status");
            this.signInfo = document.getElementById('signInfo');
            this.signaturesCanvas = document.getElementById('signaturesCanvas');
            this.booking = document.getElementById('booking');
            this.cancel = document.getElementById('cancel');
            this.validation = document.getElementById('validation');
            this.erase = document.getElementById('erase');
            this.reservationSection = document.getElementById('reservationSection');
            this.stationName.textContent = this.marker.station_name;
            this.bikeAdress.textContent = this.marker.bikeAdress;
            this.status.textContent = this.marker.status;
            this.available_bikes.textContent = this.marker.available_bikes;
            this.available_bike_stands.textContent = this.marker.available_bike_stands;
            // Resize de la map sur 8 colonnes
            this.sizeMap.className = "col-md-8";
            // Affichage du aside 
            this.aside.style.display = 'block';
            // Affichage et positionnement des infos de la station
            this.info.style.display = 'block';
            // Fermeture de la Aside à l'évènement click
            this.span.addEventListener('click', function() {
                document.getElementById('stations').style.display = 'none';
                document.getElementById('map').className = "col-lg-12";
            });

            // pas de réservation si vélos non dispo ou si station en travaux
            if(this.marker.available_bikes === 0 || this.marker.status != 'OPEN') {
                this.available_bikes.textContent = " Actuellement indisponible.";
                this.available_bikes.style.color = "initial";
                this.signaturesCanvas.style.display = "none";
                this.booking.style.display = 'none';
                this.cancel.style.display = 'none';
            }else{
                this.booking.style.display = 'inline-block';
                this.available_bikes.style.color = "green";
            };
            if(this.marker.available_bike_stands === 0) {
                this.available_bike_stands.style.color = "red";
            }else{
                this.available_bike_stands.style.color = "green";

            }
            if(this.marker.status != 'CLOSED') {
                this.status.textContent = "Ouverte";
                this.status.style.color = "green";
            }else{
                this.status.textContent = "Fermée";
                this.status.style.color = "red";
            }
            if(this.marker.banking == true)
            {
                this.banking.textContent = 'Oui';
                this.banking.style.color = "yellowGreen";
            }else{
                this.banking.textContent = 'Non';
                this.banking.style.color = '#330000';
            }
        }
    };