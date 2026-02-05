class Character extends MovableObject {
    height = 230
    width = 120
    y = 195; // Bodenposition
    world;
    speed = 8;
    IMAGES_WALKING = [
            'img/2_character_pepe/2_walk/W-21.png',
            'img/2_character_pepe/2_walk/W-22.png',
            'img/2_character_pepe/2_walk/W-23.png',
            'img/2_character_pepe/2_walk/W-24.png',
            'img/2_character_pepe/2_walk/W-25.png',
            'img/2_character_pepe/2_walk/W-26.png'
    ];
    currentImage = 0;

    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        this.animate();
    }


    animate() {

        setInterval(() => {
            if (this.world.keyboard.RIGHT  && this.x < this.world.level.Level_end_x - this.width) {
                this.x += this.speed;
                this.otherDirection = false;
            } else if (this.world.keyboard.LEFT && this.x > 0) {
                this.x -= this.speed;
                this.otherDirection = true;
            }
            this.world.cameraX = -this.x + 100;
        }, 1000 / 60);

        setInterval(() => {
            if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
            // Walk Animation
            let path = this.IMAGES_WALKING[this.currentImage];
            this.img = this.imageCache[path];
            this.currentImage = (this.currentImage + 1) % this.IMAGES_WALKING.length;
            }
        }, 50);
    }


    

    jump() {
        
    } 
}