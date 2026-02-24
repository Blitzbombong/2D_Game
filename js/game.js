let canvas;
let world;
let keyboard = new Keyboard();
let audioManager = new AudioManager();


function init() {
    canvas = document.getElementById("myCanvas");

    keyboard.bindToouchEvents();
    
}


function startGame() {
    document.getElementById('start-screen').classList.add('d-none');
   

    // 1. Wir prüfen: Ist der Bildschirm schmal?
    const isSmallScreen = window.innerWidth <= 1024;
    
    // 2. Wir prüfen: Ist es WIRKLICH ein Touch-Gerät (keine Maus)?
    const isTouch = window.matchMedia("(pointer: coarse)").matches;

    // Nur wenn BEIDES stimmt, gehen wir automatisch in den Fullscreen
    if (isSmallScreen && isTouch) {
        let container = document.getElementById('game-container');
        document.getElementById('mobile-controls').classList.remove('d-none');
    }

    // Rest der Funktion bleibt gleich...
    initLevel1();
    canvas = document.getElementById("myCanvas");
    world = new World(canvas, keyboard, audioManager);
    audioManager.playMusic();
     document.getElementById('ingame-ui').classList.remove('d-none');
}

// Eine saubere Hilfsfunktion für den Fullscreen inkl. Drehen
function enterFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen().then(() => {
            // Handy automatisch ins Querformat drehen (wenn möglich)
            if (screen.orientation && screen.orientation.lock) {
                screen.orientation.lock('landscape').catch(() => {
                    console.log("Automatisches Drehen vom Browser blockiert.");
                });
            }
        });
    }
}


function toggleFullscreen() {
    let container = document.getElementById('game-container');
    if (!document.fullscreenElement) {
        container.requestFullscreen().catch(err => {
            console.error(`Fehler beim Aktivieren: ${err.message}`);
        });
    } else {
        document.exitFullscreen();
    }
}


function toggleMute() {
    audioManager.toggleMute();
    let btn = document.getElementById('mute-button');
    let ingameBtn = document.getElementById('mute-btn-ingame');
    let icon = audioManager.isMuted ? '🔇' : '🔊';
    btn.innerHTML = icon;
    ingameBtn.innerHTML = icon;
}


function showGameOver() {
    stopGame();

    audioManager.stopAllSounds();
    document.getElementById('game-over-screen').classList.remove('d-none');
    audioManager.play('game_over');
    document.getElementById('mobile-controls').classList.add('d-none');
    document.getElementById('ingame-ui').classList.add('d-none');
}


function showYouWin() {
    stopGame();
    audioManager.stopAllSounds();
    document.getElementById('you-win-screen').classList.remove('d-none');
    audioManager.play('you_win');
    document.getElementById('mobile-controls').classList.add('d-none');
    document.getElementById('ingame-ui').classList.add('d-none');
}


function restartGame() {
    audioManager.allSoundsDisabled = false;
    document.getElementById('game-over-screen').classList.add('d-none');
    document.getElementById('you-win-screen').classList.add('d-none');
    
    startGame();
}


function backToMenu() {
    stopGame();
    audioManager.stopAllSounds();
    audioManager.allSoundsDisabled = false;
    document.getElementById('game-over-screen').classList.add('d-none');
    document.getElementById('you-win-screen').classList.add('d-none');
    document.getElementById('start-screen').classList.remove('d-none');
    document.getElementById('mobile-controls').classList.add('d-none');
     document.getElementById('ingame-ui').classList.add('d-none');
    world = null;
}