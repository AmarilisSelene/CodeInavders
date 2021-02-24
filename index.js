window.onload = () => {
  let canvas = document.getElementById('canvas');
  let context = canvas.getContext("2d");
  let id = null;
  let start = false;

  class Player {
    constructor(x, y, width, height) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.speedX = 0;
      this.direction = 'l';
      this.playerImg = new Image();
      this.playerImg.src = './images/player.png';
      this.playerImgDir = new Image();
      this.playerImgDir.src = './images/player_dir.png';
    }

    createPlayer() {
      if (this.direction === 'l') {
        context.drawImage(this.playerImg, this.x, this.y, this.width, this.height);
      } else {
        context.drawImage(this.playerImgDir, this.x, this.y, this.width, this.height);
      }
    }

    newPos() {
      if (this.x >= 0 && this.x <= canvas.width - this.width) {
        this.x += this.speedX;
      } else if (this.x < 0) {
        this.x = 1;
      } else if (this.x >= canvas.width - this.width) {
        this.x = canvas.width - 50;
      }
    }

    left() {
      return this.x;
    }
    right() {
      return this.x + this.width;
    }
    top() {
      return this.y + 10;
    }

    crashWith(obstacle) {
      return (
        this.top() === obstacle.bottom() &&
        this.right() >= obstacle.left() &&
        this.left() <= obstacle.right()
      )
    }
  }

  class Obstacle {
    constructor(x) {
      this.x = x;
      this.y = 0;
      this.width = 30;
      this.height = 30;
    }

    createObstacle() {
      this.bugImg = new Image();
      this.bugImg.src = './images/bug.png';
      context.drawImage(this.bugImg, this.x, this.y, this.width, this.height);
    }

    createInsecticide() {
      this.insecticideImg = new Image();
      this.insecticideImg.src = './images/insecticide.png';
      context.drawImage(this.insecticideImg, this.x, this.y, this.width + 15, this.height + 15);
    }

    moveObstacle() {
      this.y += 5;
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
  }

  let player = new Player(canvas.width / 2, canvas.height - 50, 50, 50);
  let frames = 0;
  let bludgers = [];
  let lifes = 1;
  let snitch = [];


  // Criando novos obstaculos + guardando no array + movendo
  function createObstaclesFunction() {
    frames += 1;
    if (lifes < 15) {
      if (frames % 50 === 0) {
        bludgers.push(new Obstacle(Math.floor(Math.random() * (canvas.width - 25))));
      }
    } else if (lifes >= 15) {
      if (frames % 35 === 0) {
        bludgers.push(new Obstacle(Math.floor(Math.random() * (canvas.width - 25))));
      }
    }
    if (frames % 150 === 0) {
      setTimeout(function () {
        snitch.push(new Obstacle(Math.floor(Math.random() * (canvas.width - 25))))
      }, 2000)
    }
  }

  function moveObstaclesFunction() {
    bludgers.forEach((elem, index) => {
      elem.createObstacle();
      elem.moveObstacle();
      if (elem.y >= canvas.height) {
        bludgers.splice(index, 1);
      }
    })
    snitch.forEach((elem, index) => {
      elem.createInsecticide();
      elem.moveObstacle();
      if (elem.y >= canvas.height) {
        snitch.splice(index, 1);
      }
    })
  }

  function checkCrash() {
    let crashed = bludgers.some(function (bludger) {
      return player.crashWith(bludger);
    });

    if (crashed) {
      if (lifes > 0) {
        bludgers.forEach((element, index) => {
          bludgers.splice(index, 1);
          lifes -= 1;
        })

        // GAME OVER
      } else {
        cancelAnimationFrame(id);
        bludgers.forEach((element, index) => {
          bludgers.splice(index, 1);
        })
        context.font = '40px serif';
        context.fillStyle = 'black';
        context.fillText("YOU'VE LOST", 6, canvas.height / 2);
      }
    }
  }

  function checkCatch() {
    let catched = snitch.some(function (snitch) {
      return player.crashWith(snitch);
    });

    if (catched) {
      if (lifes >= 0) {
        snitch.forEach((element, index) => {
          snitch.splice(index, 1);
          lifes += 2;
        })
      }
      if (lifes >= 25) {
        lifes = 25;
        cancelAnimationFrame(id);
        context.font = '45px serif';
        context.fillStyle = 'black';
        context.fillText('YOU WIN!', canvas.width / 3, canvas.height / 2);
      }
    }
  }

  function lifeScore(points) {
    context.beginPath();
    context.fillStyle = 'rgb(151, 76, 64)';
    context.rect(220, 0, 80, 25);
    context.fill();
    context.font = "18px serif";
    context.fillStyle = "rgb(242,222,13)";
    context.fillText("Score: " + points, 225, 17);
  }


  // MOTOR
  function gameUpdate() {

    // "CLEAR" (BG)
    context.clearRect(0, 0, 600, 700);

    // PRINT O PLAYER
    player.createPlayer();
    player.newPos();

    // PRINT OBSTACULOS 
    createObstaclesFunction();
    moveObstaclesFunction();

    // ANIMATION START
    id = requestAnimationFrame(gameUpdate);

    // WIN
    checkCatch();
    // CRASH
    checkCrash();
    // PRINT SCORE
    lifeScore(lifes);
  }


  document.onkeydown = function (e) {
    switch (e.keyCode) {
      case 37: // left arrow
        player.speedX = -4;
        player.direction = 'l'
        break;
      case 39: // right arrow
        player.speedX = 4;
        player.direction = 'r'
        break;
      case 13: // enter
        if (!start) {
          gameUpdate();
          hpsong.play();
          start = true;
        } else {
          window.location.reload()
        }
    }
  }

  document.onkeyup = function (e) {
    player.speedX = 0;
    player.speedY = 0;
  }
}


