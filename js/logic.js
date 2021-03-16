import { context, snake, apple, grid, canvas, reduceSize, tolerance } from './constants.js';
import { getRandomInt } from './utils.js';

const positionApple = () => {
    apple.x = getRandomInt(0, canvas.width - grid);
    apple.y = getRandomInt(0, canvas.height - grid);
}

/**
 * Snake touch an edge te position is wrapped
 * @param {object} cell - Cell position of the apple
 */
export const touchEdge = () => {
  // wrap snake position horizontally on edge of screen
  if (snake.x < 0) {
    snake.x += 40;
    snake.dx = grid;
    canvas.width = canvas.width - reduceSize;
    positionApple();
  } else if (snake.x >= canvas.width) {
    snake.x -= reduceSize;
    snake.dx = -grid;
    canvas.width = canvas.width - reduceSize;
    positionApple();
  }
  
  // wrap snake position vertically on edge of screen
  if (snake.y < 0) {
    snake.y += 40;
    snake.dy = grid;
    canvas.height = canvas.height - reduceSize;
    positionApple();
  } else if (snake.y >= canvas.height) {
    snake.y -= reduceSize;
    snake.dy = -grid;
    canvas.height = canvas.height - reduceSize;
    positionApple();
  }
}

/**
 * Draw an apple
 */
export const drawApple = () => {
  let dif = (apple.created - Date.now()) / 1000;
  dif = Math.abs(dif);
    
  if (dif > apple.lifespan) {
      positionApple();
      apple.lifespan = getRandomInt(4, 10);
      apple.created = Date.now();
  }
    
  context.fillStyle = 'red';
  context.fillRect(apple.x, apple.y, grid-1, grid-1);
}

/**
 * Snake ate apple
 * @param {object} cell - Cell position of the apple
 */
export const eatApple = (cell, score) => {
    // Needs a collision area because of the redimension
    if ((cell.x <= apple.x + tolerance && cell.x >= apple.x - tolerance) && 
        (cell.y <= apple.y + tolerance && cell.y >= apple.y - tolerance)) {
      snake.maxCells++;
      
      score += 1;
      document.getElementById('score').innerHTML = score;
      positionApple();
    }
    
    return score;
}

/**
 * Move snake a grid at the time
 */
export const moveSnake = () => {
  snake.x += snake.dx;
  snake.y += snake.dy;
}

/** 
 * Reset when snake occupies same space as a body part
 * @param {integer} i - position to being check if there is a collision
 * @param {object} cell - Cell position of the apple
 */
export const reset = (i, cell, score, max) => {
  let gameover = false;
    
  if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
    
    if (score > max) {
        // If high score is higher than previous and high score is not 0, assign a new color
        const maxValue = parseInt(document.getElementById('high').innerHTML);
        if (maxValue > 0) {
            document.getElementById('high').style.color = "red";
        }
        
        max = score;
        score = 0;
    }
      
    gameover = true;
      
    snake.x = 160;
    snake.y = 160;
    snake.cells = [];
    snake.maxCells = 5;
    snake.dx = grid;
    snake.dy = 0;

    positionApple();
      
    document.getElementById('high').innerHTML = max;
    document.getElementById('score').innerHTML = score;
    document.getElementById('restart').style.display = "block";
  }

  return { score, gameover };
}
