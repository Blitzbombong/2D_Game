let canvas;
let world;
let keyboard = new Keyboard();
let audioManager = new AudioManager();

function init() {
    canvas = document.getElementById("myCanvas");
    world = new World(canvas, keyboard, audioManager);
    
}

