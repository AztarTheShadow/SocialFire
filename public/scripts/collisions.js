/*
AX + Size >= BX
AX <= BX + Size
AY + size = BY
AY <= BY + size
*/

function CollisionObject (x, y, size) {
   this.x = x;
   this.y = y;
   this.size = size;
}

function isColliding (obj1, obj2) {
   var con1 = obj1.x + obj1.size >= obj2.x;
   var con2 = obj1.x <= obj2.x + obj2.size;
   var con3 = obj1.y + obj1.size >= obj2.y;
   var con4 = obj1.y <= obj2.y + obj2.size;

   if (con1 && con2 && con3 && con4) {
      return true;
   } else {
      return false;
   }
}