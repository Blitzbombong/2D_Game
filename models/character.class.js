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

    IMAGES_JAMPING = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png'
    ];
    

    constructor() {
        super();
        this.loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JAMPING);
        this.animate();
        this.applyGravity();
        this.jump();
    }


    animate() {

        setInterval(() => {
            if (this.world.keyboard.SPACE && !this.isAboveGround()) {
                this.jump();
            }
            if (this.world.keyboard.RIGHT  && this.x < this.world.level.Level_end_x - this.width) {
                this.moveRight();
                this.otherDirection = false;
            } else if (this.world.keyboard.LEFT && this.x > 0) {
                this.moveLeft();
                this.otherDirection = true;
            }
            this.world.cameraX = -this.x + 100;
        }, 1000 / 60);

        setInterval(() => {
            if (this.isAboveGround()) {
            // Jump Animation
            this.playAnimation(this.IMAGES_JAMPING);
            }
            if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
            // Walk Animation
            this.playAnimation(this.IMAGES_WALKING);
            }
        }, 50);
    }


    

   
}