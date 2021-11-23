var Map = {
    // Initialise la Map
    initMap: function() {
        this.map = null;
        this.currentMarker = null;
        this.stations = [];
        this.markers = [];
        this.booking = document.getElementById('booking');
        this.cancel = document.getElementById('cancel');
        this.validation = document.getElementById('validation');
        this.erase = document.getElementById('erase');
        this.annulation = document.getElementById('annulation');
        this.reservationSection = document.getElementById('reservationSection');
        this.myLatLng = new google.maps.LatLng(45.767395998075955, 4.839092227539027);
        this.options = {
            center: this.myLatLng,
            zoom: 12,
            mapTypeId: 'terrain',
            keyboardShortcuts: false, //empêche le mouvement sur la map avec les touches directionnelles.
        };

        this.map = new google.maps.Map(document.getElementById("map"), this.options);
    }
};
  


