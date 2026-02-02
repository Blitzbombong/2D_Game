class Clouds extends MovableObject {
    height = 200;
    width = 300;
    y = 50;
    x = 100 + Math.random() * 500; // Zufallisge Startposition
    speed = 0.1 + Math.random() * 1.5; // Zufallisge Geschwindigkeit  
    
    constructor(imagePath) {
        super();
        this.loadImage(imagePath); // Nutzt den Pfad, den du im Array übergeben hast
    }
}