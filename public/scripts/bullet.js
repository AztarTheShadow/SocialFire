const Y_SPEED = 20;
const BULLET_SIZE = 10;

function Bullet () {
   this.x;
   this.y;
   var sprite = new Image ();
   sprite.src = "sprites/bullet.png";
   
   this.setup = function (x, y) {
      this.x = x;
      this.y = y;
   }

   this.draw = function () {
      canvasContext.drawImage (sprite, this.x + SIZE / 2 - BULLET_SIZE, this.y, BULLET_SIZE, BULLET_SIZE);
      // drawRect (this.x + SIZE / 2 - BULLET_SIZE / 2, this.y, BULLET_SIZE, BULLET_SIZE, 'green');
   }

   this.move = function () {
      this.y -= Y_SPEED;
   }

   this.genCollision = function () {
      var col = new CollisionObject (this.x, this.y, BULLET_SIZE);
      return col;
   }
}