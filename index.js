window.onload = () => {

    document.getElementById("start-button").onclick = () => {
      startGame();
    };
  
    function startGame() { }
  };
  
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");
  var frames = 0;

  
  //pontuação
  function score() {
    const points = Math.floor(this.frames / 100);
    ctx.font = "32px Serif";
    ctx.fillStyle = "white";
    ctx.fillText(`Score: ${points}`, 80, 50);
  }

  // player
player = new Image();
player.src = "../imgs/player.png";
let playerX =380;
let playerY = 519;
player.onload = function () {
  ctx.drawImage(player, playerX, playerY, 78, 120);
};

// function clear() {
//   ctx.clearRect(0, 0, canvas.width, canvas.height);
// }

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

function playerUpdate() {
  player = new Image();
  player.src = "../imgs/player.png";
  player.onload = function () {
    ctx.drawImage(player, playerX, playerY, 78, 120);
  };
}

