let canvas;
let world;
let keyboard = new Keyboard();

function init() {
    canvas = document.getElementById("myCanvas");
    world = new World(canvas, keyboard);
    
}

