import { grid, snake } from './constants.js';

/**
 * Prevent snake from backtracking on itself by checking that it's 
 * not already moving on the same axis (pressing left while moving
 * left won't do anything, and pressing right while moving left
 * shouldn't let you collide with your own body)
 *
 * @param {object} e - The event to control the keypress
 * @param {object} snake - The object snake to control his movements
 */
export const movement = (e) => {
  // left arrow key
  if (e.which === 37 && snake.dx === 0) {
    snake.dx = -grid;
    snake.dy = 0;
  }
  // up arrow key
  else if (e.which === 38 && snake.dy === 0) {
    snake.dy = -grid;
    snake.dx = 0;
  }
  // right arrow key
  else if (e.which === 39 && snake.dx === 0) {
    snake.dx = grid;
    snake.dy = 0;
  }
  // down arrow key
  else if (e.which === 40 && snake.dy === 0) {
    snake.dy = grid;
    snake.dx = 0;
  }
}
