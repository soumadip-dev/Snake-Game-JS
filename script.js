document.addEventListener("DOMContentLoaded", function () {
  const gameArena = document.getElementById("game-arena");
  const arenaSize = 600;
  const callSize = 20;
  let score = 0; // score of the game
  let gameStarted = false; //Game Status
  let food = { x: 300, y: 300 }; // {x:15*20, y:15*20} // --> cell coordinate --> pixels // starting point of food
  let snake = [
    { x: 160, y: 300 },
    { x: 140, y: 300 },
    { x: 120, y: 300 },
  ]; // Starting point of snake

  let dx = callSize;
  let dy = 0;

  function updateSnake() {
    const newHead = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(newHead); // Add new head to the snake

    // check collision with food
    if (newHead.x === food.x && newHead.y === food.y) {
      score += 10;
      //TODO: Move food
    } else {
      snake.pop(); // remove tail
    }
  }
  function changeDirection(e) {
    const isGoingDown = dy === callSize;
    const isGoingUp = dy === -callSize;
    const isGoingRight = dx === callSize;
    const isGoingLeft = dx === -callSize;
    if (e.key === "ArrowUp" && dy === -callSize && !isGoingDown) {
      dx = 0;
      dy = -callSize;
    } else if (e.key === "ArrowDown" && dy === callSize && !isGoingUp) {
      dx = 0;
      dy = callSize;
    } else if (e.key === "ArrowLeft" && dx === -callSize && !isGoingRight) {
      dx = -callSize;
      dy = 0;
    } else if (e.key === "ArrowRight" && dx === callSize && !isGoingLeft) {
      dx = callSize;
      dy = 0;
    }
  }

  function drawDiv(x, y, className) {
    const divElement = document.createElement("div");
    divElement.classList.add(className);
    divElement.style.top = `${y}px`;
    divElement.style.left = `${x}px`;
    return divElement;
  }

  function drawFoodAndSnake() {
    gameArena.innerHTML = ""; //clear the game arena
    // Wipe out everything and redraw new position

    // Draw snake
    snake.forEach((snakeCell) => {
      const snakeElement = drawDiv(snakeCell.x, snakeCell.y, "snake");
      gameArena.appendChild(snakeElement);
    });
    // Draw food
    const foodElement = drawDiv(food.x, food.y, "food");
    gameArena.appendChild(foodElement);
  }
  function gameLoop() {
    setInterval(() => {
      updateSnake();
      drawFoodAndSnake();
    }, 200);
  }

  function runGame() {
    if (!gameStarted) {
      gameStarted = true;
      document.addEventListener("keydown", changeDirection);
      gameLoop();
    }
  }

  function initiateGame() {
    const scoreBoard = document.createElement("div");
    scoreBoard.id = "score-board";
    document.body.insertBefore(scoreBoard, gameArena); // Insert the scoreboard before the game arena
    const startButton = document.createElement("button");
    startButton.classList.add("start-button");
    startButton.textContent = "Start Game";
    document.body.appendChild(startButton); // Appended start button to the body
    startButton.addEventListener("click", function startGame() {
      startButton.style.display = "none";
      runGame();
    });
  }
  initiateGame();
});
