class ThrowableObject extends MovableObject {
    isBroken = false;

    offset = {
        top: 10,
        left: 15,
        right: 10,
        bottom: 5
    }

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

    constructor(x, y, direction) {
        super()
        this.loadImage(this.IMAGES_BOTTLE_ROTATED[0]);
        this.loadImages(this.IMAGES_BOTTLE_ROTATED);
        this.loadImages(this.IMAGES_BOTTLE_SPLASH);
        this.x = x;
        this.y = y;
        this.width = 60;
        this.height = 50;
        this.throw(direction);
        this.animate();
    }


    isAboveGround() {
        return true;
    }


    throw(direction) {
        this.speedY = 30;
        this.applyGravity();
        
        let throwInterval = setInterval(() => {
            if (!this.isBroken) {
                if (direction) {
                    this.x -= 10;
                } else {
                    this.x += 10;
                }
            } else {
                clearInterval(throwInterval);
            }
        }, 25);
    }


    animate() {
        setInterval(() => {
            if (this.isBroken) {
                this.playAnimation(this.IMAGES_BOTTLE_SPLASH);
            } else {
                this.playAnimation(this.IMAGES_BOTTLE_ROTATED);
            }
        }, 50);
    }


    break() {
        this.isBroken = true;
        this.speedY = 0;
        this.speed = 0;
        this.currentImage = 0; // Zurücksetzen auf den Anfang der Splash-Animation
    }
}