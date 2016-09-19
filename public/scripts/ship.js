const SIZE = 50;
const SHOTS_PER_SEC = 4;

function Ship (x, y) {
   this.x;
   this.y;
   var shootTimer = 0;
   var sprite = new Image ();
   sprite.src = "sprites/spaceShip.png";

   this.setup = function (x, y) {
      this.x = x;
      this.y = y;
   }

   this.draw = function () {
      canvasContext.drawImage (sprite, this.x, this.y, SIZE, SIZE);
      // drawRect (this.x, this.y, SIZE, SIZE, 'red');   
   }

   this.move = function (direction) {
      if (direction == dir.LEFT) {
         this.x -= 10;
         if (this.x < 0) {
            this.x = 0;
         }
      } else if (direction == dir.RIGHT) {
         this.x += 10;
         if (this.x > canvas.width - SIZE) {
            this.x = canvas.width - SIZE;
         }
      }
   }

   this.shoot = function (isShooting) {
      if (isShooting && shootTimer === 0) {
         shootTimer++;
         var bullet = new Bullet ();
         bullet.setup (this.x + 4, this.y);
         bullets.push (bullet);

         var leftBullet = new Bullet ();
         leftBullet.setup (this.x - 17 + 4.5, this.y);
         bullets.push (leftBullet);

         var rightBullet = new Bullet ();
         rightBullet.setup (this.x + 17 + 5, this.y);
         bullets.push (rightBullet);
         // shoot bullet
      } else if (shootTimer > 0) {
         if (shootTimer === Math.floor (1000/FRAMES_PER_SEC/SHOTS_PER_SEC)) {
            shootTimer = 0;
         } else {
            shootTimer++;
         }
      }
   }

   this.genCollision = function () {
      var col = new CollisionObject (this.x, this.y, SIZE);
      return col;
   }
}