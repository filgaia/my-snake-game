/** 
 * get random whole numbers in a specific range
 * @see https://stackoverflow.com/a/1527820/2124254
 * @param {integer} min - Minimum value to generate the random
 * @param {integer} max - Maximun value to generate the random
 */
export const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
}