let canvas;
let world;
let keyboard = new Keyboard();
let audioManager = new AudioManager();


function init() {
    canvas = document.getElementById("myCanvas");

    keyboard.bindToouchEvents();
    
}


function startGame() {
    // 1. Fullscreen nur auf Mobilen Geräten automatisch mit "PLAY" triggern
    if (window.innerWidth <= 1024) {
        let container = document.getElementById('game-container');
        enterFullscreen(container); // Wir rufen unsere Fullscreen-Logik auf
    }

    // 2. Das eigentliche Spiel starten
    document.getElementById('start-screen').classList.add('d-none');
    initLevel1();
    canvas = document.getElementById("myCanvas");
    world = new World(canvas, keyboard, audioManager);
    audioManager.playMusic();
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
    btn.innerHTML = audioManager.isMuted ? '🔇' : '🔊';
}


function showGameOver() {
    stopGame();

    audioManager.stopAllSounds();
    document.getElementById('game-over-screen').classList.remove('d-none');
    audioManager.play('game_over');
}


function showYouWin() {
    stopGame();
    audioManager.stopAllSounds();
    document.getElementById('you-win-screen').classList.remove('d-none');
    audioManager.play('you_win');
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
    world = null;
}