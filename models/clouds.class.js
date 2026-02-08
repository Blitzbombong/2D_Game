class Clouds extends MovableObject {
    height = 250;
    width = 350;

     
    
    constructor(imagePath) {
        super();
        this.loadImage(imagePath); // Nutzt den Pfad, den du im Array übergeben hast
        this.y = 0 + Math.random() * 100;
        this.x = 100 + Math.random() * 2500;
        this.speed = 0.01 + Math.random() * 0.5; // Zufallisge Geschwindigkeit 
        this.animate();
    }

    animate() {
         setInterval(() => {
             this.moveLeft();
         }, 1000 / 60);
        // Ein Intervall lässt den Code immer wieder ausführen
        setInterval(() => {
            // Hier kommt die if Bedinung damit die Wollken immer wieder Rechts neu anfangeg
            if (this.x < -this.width) {
                this.x = 2500;
                this.y = 10 + Math.random() * 100;
            } 
        }, 200);
    }
}