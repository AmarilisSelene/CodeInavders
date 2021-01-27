window.onload = () => {

  document.getElementById("start-button").onclick = () => {
    startGame();
  };

  function startGame() { }
};

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var frames = 0;
let interval = setInterval(updateGameArea, 5);



//player
player = new Image();
player.src = "../imgs/player.png";
let playerX = 380;
let playerY = 519;
player.onload = function () {
  ctx.drawImage(player, playerX, playerY, 78, 120);
};

function clear() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

//movimentaçao
document.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowLeft":
      playerX -= 20;
      console.log(playerX);
      break;
    case "ArrowRight":
      playerX += 20;
      console.log(playerX);
      break;
  }
});

function carUpdate() {
  car = new Image();
  car.src = "../images/car.png";
  car.onload = function () {
    ctx.drawImage(car, carX, carY, 50, 90);
  };
}

//obstaculos
class Component {
  constructor(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.color = color;
    this.x = x;
    this.y = y;
  }

  update() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  left() {
    return this.x;
  }
  right() {
    return this.x + this.width;
  }
  top() {
    return this.y;
  }
  bottom() {
    return this.y + this.height;
  }

  crashWith(obstacle) {
    return !(
      this.bottom() < obstacle.top() ||
      this.top() > obstacle.bottom() ||
      this.right() < obstacle.left() ||
      this.left() > obstacle.right()
    );
  }
}

var myObstacles = [];
function updateObstacles() {
  for (i = 0; i < myObstacles.length; i++) {
    myObstacles[i].y += 1;
    myObstacles[i].update();
  }

  frames += 1;
  if (frames % 200 === 0) {
    let minWidth = 20;
    let maxWidth = 50;
    let width = Math.floor(
      Math.random() * (maxWidth - minWidth + 1) + minWidth
    );
    let randomX = Math.floor(Math.random() * 300) + 50;

    myObstacles.push(new Component(width, 30, "yellow", randomX, 0));

  }
}

//
function stop() {
  clearInterval(interval);
}

function checkGameOver() {
  const crashed = myObstacles.some(function (obstacle) {
    return player.crashWith(obstacle);
  });

  if (crashed) {
    stop();
  }
}

// jogo
function updateGameArea() {
  clear();
  carUpdate();
  updateObstacles();
  checkGameOver();
  score();
}

// jogo
function updateGameArea() {
  clear();
  carUpdate();
  updateObstacles();
  score();

}















// const gameBoard = document.getElementById('game-board');
// const canvas = document.getElementById('canvas');
// const ctx = canvas.getContext('2d');

// class Game {
//   constructor(background, player) {
//     this.background = background;
//     this.player = player;
//   }

//   updateGame = () => {
//     this.clear();
//     this.background.draw();

//     this.player.move();
//     this.player.drawImage();

//   }

//   clear = () => {
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//   }

//   startGame = () => {
//     set.Interval(this.updateGame, 20);
//   }

// }
// class Component {
//   constructor(x, y, width, height, speed) {
//     this.x = x;
//     this.y = y;
//     this.width = width;
//     this.height = height;
//     this.speed = speed;
//   }
// }

// class Player extends Component {
//   constructor(x, y, width, height, speed) {
//     super(x, y, width, height, speed);
//     img = new Image();
//     this.img.src = '../imgs/player.png';


//   }
//   player = new Image();
//   player.src = "../imgs/player.png";
// let playerX = 380;
// let playerY = 519;
// player.onload = function () {
//   ctx.drawImage(player, playerX, playerY, 78, 120);


// };
// move() {

// }
// draw() {
//   ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
// }
// }

// class Background {
//   constructor(x, y, width, height) {
//     this.x = x;
//     this.y = y;
//     this.width = width;
//     this.height = height;
//     this.img = new Image().src = '../imgs/telaJogo.png';


//   }
//   draw() {
//     this.img.onload = () => {
//       ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
//     };
//   }

// }






// var canvas = document.getElementById("canvas");
// var ctx = canvas.getContext("2d");
// var frames = 0;


// const playerImg = new Image();
// playerImg.src = "./imgs/player.png";

// const bugImg = new Image();
// bugImg.src = "./imgs/bug.png";


// window.onload = () => {

//   document.getElementById("start-button").onclick = () => {
//     startGame();
//   };

//   function startGame() {
//     gameBoard.style.display = "block";

//     const game = new Game(new Background(0, 0, canvas.width, canvas.height), new
//       Player(canvas.width / 2, canvas.height - 319, 158, 319));
//     game.startGame();
//   }
// };

// var canvas = document.getElementById("canvas");
// var ctx = canvas.getContext("2d");
// var frames = 0;


// //pontuação
// function score() {
//   const points = Math.floor(this.frames / 100);
//   ctx.font = "32px Serif";
//   ctx.fillStyle = "white";
//   ctx.fillText(`Score: ${points}`, 80, 50);
// }

// player
// player = new Image();
// player.src = "../imgs/player.png";
// let playerX = 380;
// let playerY = 519;
// player.onload = function () {
//   ctx.drawImage(player, playerX, playerY, 78, 120);
// };



// function clear() {
//   ctx.clearRect(0, 0, canvas.width, canvas.height);
// }

// //movimentaçao
// document.addEventListener("keydown", (e) => {
//   switch (e.key) {
//     case "ArrowLeft":
//       playerX -= 20;
//       console.log(playerX);
//       break;
//     case "ArrowRight":
//       playerX += 20;
//       console.log(playerX);
//       break;
//   }
// });

// function playerUpdate() {
//   player = new Image();
//   player.src = "../imgs/player.png";
//   player.onload = function () {
//     ctx.drawImage(player, playerX, playerY, 78, 120);
//   };
// }



















