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

    IMAGES_BOTTLE_ROTATED = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    IMAGES_BOTTLE_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
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