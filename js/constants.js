import { getRandomInt } from './utils.js';

export const canvas = document.getElementById('game');
export const context = canvas.getContext('2d');
export const grid = 16; // Dimension of the snake and food
export const reduceSize = 113;
export const tolerance = 16;

export const snake = {
  x: 160,
  y: 160,
  dx: grid, // snake speed. moves one grid length every frame in either the x or y direction
  dy: 0,
  cells: [], // keep track of all grids the snake body occupies
  maxCells: 5 // length of the snake. grows when eating an apple
};

export const apple = {
  x: getRandomInt(0, 50) * grid,
  y: getRandomInt(0, 50) * grid,
  lifespan: getRandomInt(4, 10),
  created: Date.now()
};