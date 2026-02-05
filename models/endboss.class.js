class Endboss extends MovableObject {
    height = 350
    width = 400
    y = 95
    x = 2200
    speed = 0.15;

    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png'
    ];

    constructor() {
        super();
        this.loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.animate();
    }

    animate() {
        this.moveLeft();
        setInterval(() => {
           this.playAnimation(this.IMAGES_WALKING);
    }, 500);
    }
}