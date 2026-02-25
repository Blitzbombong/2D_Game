let canvas;
let world;
let keyboard = new Keyboard();
let audioManager = new AudioManager();

/**
 * Initializes the game by getting the canvas element and binding
 * touch events to the keyboard object.
 */
function init() {
  canvas = document.getElementById("myCanvas");
  keyboard.bindTouchEvents();
}


/**
 * Starts the game by hiding the start screen, showing mobile controls
 * if necessary, initializing the first level, the game world, playing
 * the background music, and showing the in-game user interface.
 */
function startGame() {
  document.getElementById("start-screen").classList.add("d-none");
  checkAndShowMobileControls();
  initLevel1();
  initWorld();
  audioManager.playMusic();
  document.getElementById("ingame-ui").classList.remove("d-none");
}


/**
 * Checks if the current device is a mobile device and shows the
 * mobile controls if necessary. This function is called at the
 * start of the game to determine if mobile controls should be
 */
function checkAndShowMobileControls() {
  const isMobile = window.innerWidth <= 1024 || window.matchMedia("(pointer: coarse)").matches;
  if (isMobile) {
    document.getElementById("mobile-controls").classList.remove("d-none");
  }
}


/**
 * Initializes the game world by creating a new World object
 * with the canvas element, the keyboard object, and the audio
 * manager object.
 */
function initWorld() {
  canvas = document.getElementById("myCanvas");
  world = new World(canvas, keyboard, audioManager);
}


/**
 * Enters the given HTML element into fullscreen mode, if supported.
 * If the screen orientation API is supported, the screen will be
 * locked to landscape mode to prevent the screen from rotating.
 * @param {HTMLElement} element - The HTML element to enter into fullscreen mode.
 */
function enterFullscreen(element) {
  if (element.requestFullscreen) {
    element.requestFullscreen().then(() => {
      // Handy automatisch ins Querformat drehen (wenn möglich)
      if (screen.orientation && screen.orientation.lock) {
        screen.orientation.lock("landscape").catch(() => {
          // Fehler wird abgefangen, aber nicht mehr geloggt
        });
      }
    });
  }
}


/**
 * Toggles the game container element into and out of fullscreen mode.
 * If the element is not currently in fullscreen mode, it will be
 * requested to enter fullscreen mode. If the element is currently
 * in fullscreen mode, it will exit fullscreen mode.
 * If an error occurs while attempting to enter or exit fullscreen mode,
 * the error will be caught but not re-thrown.
 */
function toggleFullscreen() {
  let container = document.getElementById("game-container");
  if (!document.fullscreenElement) {
    container.requestFullscreen().catch((err) => {
        // Fehler wird abgefangen, aber nicht mehr geloggt
    });
  } else {
    document.exitFullscreen();
  }
}


/**
 * Toggles the mute state of the game's audio.
 * If the audio is currently muted, it will be unmuted, and vice versa.
 * The mute button in the start screen and the in-game user interface will
 * be updated with the new mute state.
 */
function toggleMute() {
  audioManager.toggleMute();
  let btn = document.getElementById("mute-button");
  let ingameBtn = document.getElementById("mute-btn-ingame");
  let icon = audioManager.isMuted ? "🔇" : "🔊";
  if (btn) btn.innerHTML = icon;
  if (ingameBtn) ingameBtn.innerHTML = icon;
}


/**
 * Shows the game over screen, stops all game logic, stops all
 * sounds, and plays the game over sound.
 */
function showGameOver() {
  stopGame();
  audioManager.stopAllSounds();
  document.getElementById("game-over-screen").classList.remove("d-none");
  audioManager.play("game_over");
  document.getElementById("mobile-controls").classList.add("d-none");
  document.getElementById("ingame-ui").classList.add("d-none");
}


/**
 * Shows the you win screen, stops all game logic, stops all
 * sounds, and plays the you win sound.
 */
function showYouWin() {
  stopGame();
  audioManager.stopAllSounds();
  document.getElementById("you-win-screen").classList.remove("d-none");
  audioManager.play("you_win");
  document.getElementById("mobile-controls").classList.add("d-none");
  document.getElementById("ingame-ui").classList.add("d-none");
}


/**
 * Restarts the game by stopping all game logic, stopping all
 * sounds, and re-calling the startGame function.
 */
function restartGame() {
  audioManager.allSoundsDisabled = false;
  document.getElementById("game-over-screen").classList.add("d-none");
  document.getElementById("you-win-screen").classList.add("d-none");
  startGame();
}


/**
 * Stops the game, stops all sounds, resets audio manager state, hides all in-game UI elements, and shows the start screen again.
 * Also resets the world object to null.
 */
function backToMenu() {
  stopGame();
  audioManager.stopAllSounds();
  audioManager.allSoundsDisabled = false;
  document.getElementById("game-over-screen").classList.add("d-none");
  document.getElementById("you-win-screen").classList.add("d-none");
  document.getElementById("start-screen").classList.remove("d-none");
  document.getElementById("mobile-controls").classList.add("d-none");
  document.getElementById("ingame-ui").classList.add("d-none");
  world = null;
}
