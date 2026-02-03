class Clouds extends MovableObject {
    height = 250;
    width = 350;
    y = 50;
    x = 100 + Math.random() * 500; // Zufallisge Startposition
    speed = 0.2; // Zufallisge Geschwindigkeit  
    
    constructor(imagePath) {
        super();
        this.loadImage(imagePath); // Nutzt den Pfad, den du im Array übergeben hast
        this.animate();
    }

    animate() {
         this.moveLeft();
        // Ein Intervall lässt den Code immer wieder ausführen
        setInterval(() => {
            // Hier kommt die if Bedinung damit die Wollken immer wieder Rechts neu anfangeg
            if (this.x < -this.width) {
                this.x = 720;
            } 
        }, 1000);
    }
}