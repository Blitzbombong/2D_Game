class Bottle extends MovableObject {    
    height = 60;
    width = 50;
    y = 360;

    offset = {
        top: 10,
        left: 15,
        right: 10,
        bottom: 5
    }

    IMAGES_BOTTLE = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ];

    

    constructor(x) {
        super();
        this.loadImage(this.IMAGES_BOTTLE[0]);
        this.loadImages(this.IMAGES_BOTTLE);
        this.loadImages(this.IMAGES_BOTTLE_ROTATED);
        this.loadImages(this.IMAGES_BOTTLE_SPLASH);
        this.x = x;
        this.animate();
        
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_BOTTLE);
        }, 500);
    }
}