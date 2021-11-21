   //fonction de calcul de disponibilité des vélos par station et affichage d'un marqueur correspondant
   var Iconstation = {
           initIconstation: function (station) {
            this.station = station;
                   // Calcul du % de velo dispo par stations
                   // On divise les Vélo dispo par le nombre de places total qui correspond au vélo dispo + les place libres
                   this.operation = (station.available_bikes * 100) / (station.available_bike_stands + station.available_bikes);
                   if (this.station.status != 'OPEN') {
                           icon = './images/stations_icon/travaux.png';
                   } else if (this.operation === 100) {
                           icon = './images/stations_icon/station-0.png';
                   } else if (this.operation < 100 && this.operation >= 66) {
                           icon = './images/stations_icon/station-25.png';
                   } else if (this.operation < 66 && this.operation >= 33) {
                           icon = './images/stations_icon/station-50.png';
                   } else if (this.operation < 33 && this.operation > 0) {
                           icon = './images/stations_icon/station-75.png';
                   } else if (this.operation === 0) {
                           icon = './images/stations_icon/station-100.png';
                   }
                   return icon;
           }
   };