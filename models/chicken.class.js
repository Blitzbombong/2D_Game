class Chicken extends MovableObject {
    height = 70;
    width = 60;
    x = 200 + Math.random() * 500; // Zufällige Startposition
    y = 352; // Bodenposition
    currentImage = 0;

    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 5
    }

    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ]

    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ];
   

    constructor() {
        super();
        this.loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
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