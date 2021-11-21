    // construction d'un slider en POO
    var Slide = {       
        // Initialise l'image
        initImage: function(slide, slideImg, title) {
            this.slide = slide;
            this.slideImg = slideImg;
            this.title = title;

        }
    };

    // déplacement des images dans le slider
    var Slider = {      
        deplacement: function(mouvement) {
            this.index = this.index + mouvement;
            if (this.index > this.tabSlide.length - 1) {
                this.index = 0;
            }
            if (this.index < 0) {
                this.index = this.tabSlide.length - 1;
            }
            document.getElementById("image").src = this.tabSlide[this.index].slide;
            document.getElementById("img-bulle").src = this.tabSlide[this.index].slideImg;
            document.getElementById("titre").textContent = this.tabSlide[this.index].title;
        },
        initSlider: function(tableau) {
            this.index = 0;
            this.tabSlide = tableau;
        }
    };


    

