const dir = {
   LEFT: 0,
   RIGHT: 1,
   UP: 2,
   DOWN: 3,
   NOTHING: 4
};

const keyCodes = {
   LEFT: 37,
   UP: 38,
   RIGHT: 39,
   DOWN: 40,
   SPACE: 32
};

const FRAMES_PER_SEC = 30;

var keys = [];
var bullets = [];
var canvas;
var canvasContext;
var isEndGame
var score = 0;
var highScore = 0;

var mainShip = new Ship ();
var background = new Background ();

window.onload = function () {
   canvas = document.getElementById ('gameCanvas');
   canvasContext = canvas.getContext ('2d');
   mainShip.setup (canvas.width / 2 - SIZE / 2, canvas.height - 10 - SIZE);

   setInterval (function () {
      if (!isEndGame) {
         moveEverything ();
         scores ();
         drawEverything ();
      } else {
         canvasContext.fillStyle = 'white';
         canvasContext.font = "30px Arial";
         canvasContext.fillText ("GAME OVER", canvas.width / 2 - 100, canvas.height/2 - 10);
         canvasContext.font = "20px Arial";
         canvasContext.fillText ("Press space to play again?", canvas.width / 2 - 125, canvas.height / 2 + 10);
      }
   }, 1000/FRAMES_PER_SEC);
}

document.onkeydown = function (evt) {
   if (evt.keyCode === keyCodes.LEFT && keys[evt.keyCode] != true) {
      keys[evt.keyCode] = true;
   } else if (evt.keyCode === keyCodes.UP && keys[evt.keyCode] != true) {
      keys[evt.keyCode] = true;
   } else if (evt.keyCode === keyCodes.RIGHT && keys[evt.keyCode] != true) {
      keys[evt.keyCode] = true;
   } else if (evt.keyCode === keyCodes.DOWN && keys[evt.keyCode] != true) {
      keys[evt.keyCode] = true;
   }
   if (evt.keyCode === keyCodes.SPACE && isEndGame) {
      resetGame ();
   }
}

document.onkeyup = function (evt) {
   if (evt.keyCode === keyCodes.LEFT) {
      keys[evt.keyCode] = false;
   } else if (evt.keyCode === keyCodes.UP) {
      keys[evt.keyCode] = false;
   } else if (evt.keyCode === keyCodes.RIGHT) {
      keys[evt.keyCode] = false;
   } else if (evt.keyCode === keyCodes.DOWN) {
      keys[evt.keyCode] = false;
   }
}

// ----- MOVEMENT ----- //
function moveEverything () {
   var moves = detectMovement ();
   mainShip.move (moves[0]);
   mainShip.shoot (moves[1] === dir.UP);
   for (var i = 0; i < bullets.length; i++) {
      bullets[i].move ();
   }
   generateMeteors ();
   moveMeteors ();
   collisions ();
   background.move ();
}

function detectMovement () {
   var movements = [];
   var x = 0;
   var y = 0;

   // Detects pressed keys
   if (keys[keyCodes.LEFT]) {
      x--;
   }
   if (keys[keyCodes.UP]) {
      y--;
   }
   if (keys[keyCodes.RIGHT]) {
      x++;
   }
   if (keys[keyCodes.DOWN]) {
      y++;
   }

   // Determines direction from keys
   if (x > 0) {
      movements[0] = dir.RIGHT;
   } else if (x < 0) {
      movements[0] = dir.LEFT;
   } else {
      movements[0] = dir.NOTHING;
   }

   if (y > 0) {
      movements[1] = dir.DOWN;
   } else if (y < 0) {
      movements[1] = dir.UP;
   } else {
      movements[1] = dir.NOTHING;
   }
   return movements;
}

function collisions () {
   meteorToShip ();
   bulletToMeteor ();
}

function bulletToMeteor () {
   var collided = false;
   for (var i = 0; i < meteors.length; i++) {
      collided = false;
      for (var j = 0; j < bullets.length; j++) {
         collided = isColliding (bullets[j].genCollision (), meteors[i].genCollision ());
      }

      if (collided) {
         meteors.splice (i, 1);
      }
   }
}

function meteorToShip () {
   var collided = false;
   for (var i = 0; i < meteors.length && !collided; i++) {
      collided = isColliding (mainShip.genCollision (), meteors[i].genCollision ());
   }
   if (collided) {
      endGame ();
   }
}

function endGame () {
   isEndGame = true;
   if (score > highScore) {
      highScore = score + 1;
   }
}

function scores () {
   score++;
}

function resetGame () {
   isEndGame = false;
   score = 0;
   meteors = [];
   firstMeteor = true;
}

// ----- DRAWING ----- //
function drawEverything () {
   drawRect (0, 0, canvas.width, canvas.height, 'black');
   background.draw ();
   drawMeteors ();
   mainShip.draw ();
   for (var i = 0; i < bullets.length; i++) {
      bullets[i].draw ();
   }
   canvasContext.fillStyle = "white";
   canvasContext.font = "30px Arial";
   canvasContext.fillText (score.toString (), 30, 35);
   canvasContext.fillText (highScore.toString (), 30, 70);
}

function drawRect (leftX, topY, width, height, drawColor) {
   canvasContext.fillStyle = drawColor;
   canvasContext.fillRect (leftX, topY, width, height);
}
