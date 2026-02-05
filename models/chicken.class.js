class Chicken extends MovableObject {
    height = 70;
    width = 60;
    x = 200 + Math.random() * 500; // Zufällige Startposition
    y = 352; // Bodenposition
    speed = 0.15 + Math.random() * 1.5; // Zufallisge Geschwindigkeit
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ]
    currentImage = 0;

    constructor() {
        super();
        this.loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.moveLeft();
        } , 1000 / 60);
        
        setInterval(() => {
            let path = this.IMAGES_WALKING[this.currentImage];
            this.img = this.imageCache[path];
            this.currentImage = (this.currentImage + 1) % this.IMAGES_WALKING.length; 
            if (this.x < -this.width) {
                this.x = 720;
            }    
        }, 500);
    }


}