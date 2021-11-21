    var Tooltip = {
        initTool: function(marker, infoWindow) {
            this.marker = marker;
            this.infoWindow = infoWindow;
        }, // Fin de la méthode initTool.

        tool: function() {
            // Vérifie que l'infowindow n'est pas déjà ouvert sur ce marqueur.
            if (this.infoWindow.marker != this.marker) {
                this.infoWindow.setContent('<div>' + 'Station: ' + this.marker.title + '</div>');
                this.infoWindow.open(Map.map, this.marker);
                // vérifie que la propriété marqueur est effacée si l'infowindow est fermé.
                this.infoWindow.addListener('closeclick', function() {
                    this.infoWindow.setMap(null);
                });
            }
        }
    };