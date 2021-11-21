var Ajax = {
    // initialise Ajax GET
    init: function(url) {
        this.url = url;
    },
    response: function(callback) {
        var req = new XMLHttpRequest();
        req.open("GET", this.url);
        req.addEventListener("load", function() {
            if (req.status >= 200 && req.status < 400) {
                // Appelle la fonction callback en lui passant la réponse de la requête
                callback(req.responseText);
            } else {
                console.error(req.status + " " + req.statusText + " " + url);
            }
        });
        req.addEventListener("error", function() {
            console.error("Erreur réseau avec l'URL " + url);
        });
        req.send(null);
    }
};

  