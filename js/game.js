let canvas;
let world;
let keyboard = new Keyboard();

function init() {
    canvas = document.getElementById("myCanvas");
    world = new World(canvas);
    
}

window.addEventListener("keypress", (e) => {
    console.log(e);  
});