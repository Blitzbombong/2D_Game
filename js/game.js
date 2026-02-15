let canvas;
let world;
let keyboard = new Keyboard();
let audioManager = new AudioManager();

function init() {
    canvas = document.getElementById("myCanvas");
    
}


function startGame() {
    document.getElementById('start-screen').classList.add('d-none');

    canvas = document.getElementById("myCanvas");
    world = new World(canvas, keyboard, audioManager);

    audioManager.playMusic();
}


function toggleFullscreen() {
    let container = document.getElementById('game-container');
    if (!document.fullscreenElement) {
        container.requestFullscreen().catch(err => {
            alert(`Error: ${err.message}`);
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
