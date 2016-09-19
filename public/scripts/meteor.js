var meteors = [];
var meteorCounter = 0;

var firstMeteor = true;

function Meteor () {
   this.x = Math.floor (Math.random () * canvas.width);
   this.y = 0;
   var size = Math.floor (Math.random () * 40) + 20;
   var ySpeed = 30;
   var xSpeed = Math.floor (Math.random () * 20) - 10;
   var sprite = new Image ();
   sprite.src = "sprites/meteor.png";

   this.draw = function () {
      canvasContext.drawImage (sprite, this.x, this.y, size, size)
      // drawRect (this.x, this.y, size, size, 'blue');
   }

   this.move = function () {
      this.y += ySpeed;
      this.x += xSpeed;
   }  

   this.offscreen = function () {
      if (this.y > canvas.height) {
         return true;
      } else {
         return false;
      }
   }

   this.genCollision = function () {
      var col = new CollisionObject (this.x, this.y, size);
      return col;
   }
}

function generateMeteors () {
   if (meteorCounter === Math.floor (1000/FRAMES_PER_SEC/4)) {
      var meteor = new Meteor ();
      meteors.push (meteor);
      meteorCounter = 0;
      firstMeteor = false; 
   } else {
      meteorCounter++;
   }

   if (!firstMeteor) {
      if (meteors[0].offscreen ()) {
         meteors.splice(0, 1);
      }
   }
}

function drawMeteors () {
   for (var i = 0; i < meteors.length; i++) {
      meteors[i].draw ();
   }
}

function moveMeteors () {
   for (var i = 0; i < meteors.length; i++) {
      meteors[i].move ();
   }
}