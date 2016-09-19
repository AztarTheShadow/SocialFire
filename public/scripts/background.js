function Background () {
   this.x = 0;
   this.y = 0;
   var sprite = new Image ();
   sprite.src = "sprites/earth.jpg";
   var ySpeed;

   this.draw = function () {
      canvasContext.drawImage (sprite, this.x, this.y, sprite.width, sprite.width);
   }

   this.move = function () {
      if (this.y > canvas.height - 100) {
         ySpeed = -1;
      } else if (this.y < 0 + 100) {
         ySpeed = 1;
      }
      this.y += ySpeed;
   }
}