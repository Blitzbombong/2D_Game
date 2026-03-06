
let intervalIds = [];

/**
 * Sets a interval that can be stopped later
 * @param {function} fn - the function to be called
 * @param {number} time - the time between calls to fn in milliseconds
 * @returns {number} the ID of the interval that can be stopped later
 */
function setStoppableInterval(fn, time) {
  let id = setInterval(fn, time);
  intervalIds.push(id);
  return id;
}

/**
 * Stops all currently running intervals
 * @description
 * This function stops all intervals that have been set with setStoppableInterval.
 * It does this by calling clearInterval on each ID in the intervalIds array.
 * After stopping all intervals, the array is also cleared to prevent memory leaks.
 */
function stopGame() {
  intervalIds.forEach((id) => clearInterval(id));
  intervalIds = [];
}
