class BackgroundObject extends MovableObject {
    height = 480;
    width = 720;
    y = 0;  // Bodenposition    
    x = 0;  // Bodenposition  
    
    constructor(imagePath, x, y) {
        super();
        this.loadImage(imagePath); // Nutzt den Pfad, den du im Array übergeben hast
        this.x = x;
        this.y = y;
    }
}