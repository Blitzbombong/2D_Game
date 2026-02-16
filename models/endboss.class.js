class Endboss extends MovableObject {
    height = 350
    width = 400
    y = 95
    x = 2200
    speed = 0.15;
    hadFirstContact = false; // Flag, um den ersten Kontakt zu verfolgen

    offset = {
        top: 60,
        left: 70, 
        right: 15,
        bottom: 20
    }

    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png'
    ];

    IMAGES_ALERT = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ]

    IMAGES_ATTACK = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png'
    ]

    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png'
    ]

    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png'
    ]

    constructor() {
        super();
        this.loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.animate();
        this.playAttackOrWalk();
    }

    animate() {
            setStoppableInterval(() => {
            if (this.isDead()) {
                // 1. Höchste Priorität: Tot
                this.playAnimation(this.IMAGES_DEAD);
            } else if (this.isHurt()) {
                // 2. Priorität: Verletzt (wenn die Flasche trifft)
                this.playAnimation(this.IMAGES_HURT);
            } else if (this.hadFirstContact) {
                // 3. Priorität: Kampf läuft
                this.playAttackOrWalk();
            } else {
                // 4. Standard: Warten/Aufmerksam
                this.playAnimation(this.IMAGES_ALERT);
            }
        }, 200);

        setStoppableInterval(() => {
            if (this.hadFirstContact && !this.isDead() && !this.isHurt()) {
                this.moveLeft();
            }
        }, 1000 / 60);
    }

    playAttackOrWalk() {
        // Hier könnte man eine Logik einbauen, um zwischen Angriff und Gehen zu wechseln, z.B. basierend auf der Entfernung zum Spieler
        // Für den Anfang spielen wir einfach die Angriffsanimation
        this.playAnimation(this.IMAGES_ATTACK);
    }
}