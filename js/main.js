import { grid, canvas, context, snake, apple } from './constants.js'
import { eatApple, reset, touchEdge, drawApple, moveSnake } from './logic.js';
import { movement } from './movement.js';
import { getRandomInt } from './utils.js';

let count = 0;
let score = 0;
let max = 0;
let gameover = false;

// game loop
const loop = () => {
  if (!gameover) {
    requestAnimationFrame(loop);
  }

  // slow game loop to 10 fps instead of 60 (60/10 = 6)
  if (++count < 6) {
    return;
  }

  count = 0;
  context.clearRect(0,0,canvas.width,canvas.height);

  // move snake by it's velocity
  moveSnake();

  // wrap snake position
  touchEdge();

  // keep track of where snake has been. front of the array is always the head
  snake.cells.unshift({x: snake.x, y: snake.y});

  // remove cells as we move away from them
  if (snake.cells.length > snake.maxCells) {
    snake.cells.pop();
  }
    
  drawApple();

  // draw snake one cell at a time
  context.fillStyle = 'green';
  snake.cells.forEach((cell, index) => {
    
    // drawing 1 px smaller than the grid creates a grid effect in the snake body so you can see how long it is
    context.fillRect(cell.x, cell.y, grid-1, grid-1);  
    
    score = eatApple(cell, score);

    // check collision with all cells after this one (modified bubble sort)
    for (let i = index + 1; i < snake.cells.length; i++) {
      const result = reset(i, cell, score, max);
      
      score = result.score;
      gameover = result.gameover;
    }
  });
}

const onClick = () => {
    document.getElementById('restart').style.display = "none";
    gameover = false;
    requestAnimationFrame(loop);
}

// listen to keyboard events to move the snake
document.addEventListener('keydown', (e) => movement(e));
document.getElementById('restart').addEventListener("click", onClick);

// start the game
if (!gameover) {
    requestAnimationFrame(loop);
}
