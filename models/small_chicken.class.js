
class SmallChicken extends Chicken {

    height = 50;
    width = 40;
    y = 372;
    offset = {
        top: 5,
        left: 0,
        right: 0,
        bottom: 5
    }

    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ]
    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ]

    /**
     * Initializes a new SmallChicken object.
     * Calls the parent constructor, loads the walking and dead images, and sets the speed of the chicken.
     * The speed is a random number between 0.15 and 0.7.
     */
    constructor() {
        super();
        this.loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.speed = 0.15 + Math.random() * 0.5;
    }
}