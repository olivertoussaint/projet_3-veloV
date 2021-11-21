   var Canvas = {
      //Dessin à la souris
      draw: function (e){
         // Si isDrawing est false
         if (!this.isDrawing) return;
         //listen for mouse move event
         this.ctx.beginPath();
         this.ctx.moveTo(this.lastX, this.lastY);
         this.ctx.lineTo(e.offsetX, e.offsetY);
         this.ctx.stroke();
         [this.lastX, this.lastY] = [e.offsetX, e.offsetY];
      },
      //effacement du Canvas
      clearCanvas: function () {
         this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
         this.canvas.width = this.canvas.width; //effacement tactile
         this.validCanvas = false; //passage de la validation a fausse
      },
      //fonction de dessin en touch
      drawTact: function () {
         // Si isDrawing est false
         if (!this.isDrawing) return;
         //listen for mouse move event
         this.lastX = this.startx + this.distx;
         this.lastY = this.starty + this.disty;
         var rect = this.canvas.getBoundingClientRect();
         this.ctx.arc((this.lastX - rect.left), (this.lastY - rect.top), 0.1, 0, 180);
         this.ctx.stroke();
      },
      //initialisation de l'Object Canvas
      initCanvas: function () {
         this.erase = document.getElementById('erase');
         this.canvas = document.getElementById('canvas');
         this.ctx = this.canvas.getContext('2d');
         this.isDrawing = false;
         this.validCanvas = false;
         this.canvas.width = 260;
         this.canvas.height = 180;
         this.ctx.lineJoin = 'round';
         this.ctx.lineCap = 'round';
         this.ctx.lineWidth = 3;
         this.ctx.strokeStyle = "#000000";
         //propriété Souris
         this.lastX = 0;
         this.lastY = 0;
         //propriétés tactiles
         this.startx = 0;
         this.starty = 0;
         this.distx = 0; 
         this.disty = 0;     
      }
   };




