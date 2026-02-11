class Chicken extends MovableObject {
    height = 70;
    width = 60;
    x = 400 + Math.random() * 1800; // Zufällige Startposition
    y = 352; // Bodenposition
    currentImage = 0;
    speed = 0.15 + Math.random() * 0.5;
    isDead = false;

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
    // 1. Intervall: Alles was mit POSITION zu tun hat (Bewegung)
    setInterval(() => {
        if (!this.isDead) {
            this.moveLeft();
        }
        
        // Deine Logik: Wenn das Huhn links rausläuft, kommt es rechts wieder rein
        if (this.x < -this.width) {
            this.x = 1700 + Math.random() * 500; // Ein bisschen Zufall macht es natürlicher
        }
    }, 1000 / 60);

    // 2. Intervall: Alles was mit AUSSEHEN zu tun hat (Animation)
    setInterval(() => {
        if (this.isDead) {
            this.loadImage(this.IMAGES_DEAD[0]); // Sofort das flache Bild zeigen
        } else {
            this.playAnimation(this.IMAGES_WALKING); // Nutzt die Logik aus MovableObject
        }
    }, 150); // 150ms sieht deutlich flüssiger aus!
}


    die() {
        this.isDead = true;
        this.speed = 0;
    }


}