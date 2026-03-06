class Endboss extends MovableObject {
  height = 350;
  width = 400;
  y = 95;
  x = 2200;
  speed = 0.5;
  hadFirstContact = false;
  isDeadSoundPlayed = false;
  rageFactor = 0;

  offset = {
    top: 60,
    left: 70,
    right: 15,
    bottom: 20,
  };

  IMAGES_WALKING = [
    "img/4_enemie_boss_chicken/1_walk/G1.png",
    "img/4_enemie_boss_chicken/1_walk/G2.png",
    "img/4_enemie_boss_chicken/1_walk/G3.png",
    "img/4_enemie_boss_chicken/1_walk/G4.png",
  ];

  IMAGES_ALERT = [
    "img/4_enemie_boss_chicken/2_alert/G5.png",
    "img/4_enemie_boss_chicken/2_alert/G6.png",
    "img/4_enemie_boss_chicken/2_alert/G7.png",
    "img/4_enemie_boss_chicken/2_alert/G8.png",
    "img/4_enemie_boss_chicken/2_alert/G9.png",
    "img/4_enemie_boss_chicken/2_alert/G10.png",
    "img/4_enemie_boss_chicken/2_alert/G11.png",
    "img/4_enemie_boss_chicken/2_alert/G12.png",
  ];

  IMAGES_ATTACK = [
    "img/4_enemie_boss_chicken/3_attack/G13.png",
    "img/4_enemie_boss_chicken/3_attack/G14.png",
    "img/4_enemie_boss_chicken/3_attack/G15.png",
    "img/4_enemie_boss_chicken/3_attack/G16.png",
    "img/4_enemie_boss_chicken/3_attack/G17.png",
    "img/4_enemie_boss_chicken/3_attack/G18.png",
    "img/4_enemie_boss_chicken/3_attack/G19.png",
    "img/4_enemie_boss_chicken/3_attack/G20.png",
  ];

  IMAGES_HURT = [
    "img/4_enemie_boss_chicken/4_hurt/G21.png",
    "img/4_enemie_boss_chicken/4_hurt/G22.png",
    "img/4_enemie_boss_chicken/4_hurt/G23.png",
  ];

  IMAGES_DEAD = [
    "img/4_enemie_boss_chicken/5_dead/G24.png",
    "img/4_enemie_boss_chicken/5_dead/G25.png",
    "img/4_enemie_boss_chicken/5_dead/G26.png",
  ];

  /**
   * Constructor for Endboss class.
   * Calls the MovableObject constructor and sets the isBoss and energy properties.
   * Loads the endboss images and starts the animation loop.
   */
  constructor() {
    super();
    this.isBoss = true;
    this.energy = 100;
    this.acceleration = 2.5;
    this.loadBossImages();
    this.applyGravity();
    this.animate();
  }

  /**
   * Loads all endboss-related image sets.
   * This method is called in the Endboss constructor and is responsible for loading
   * the walking, alert, attack, hurt, and death image sets for the endboss.
   */
  loadBossImages() {
    this.loadImage(this.IMAGES_WALKING[0]);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_ALERT);
    this.loadImages(this.IMAGES_ATTACK);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
  }

  /**
   * Main animation and logic loops for the boss.
   */
  animate() {
    setStoppableInterval(() => this.handleMovement(), 1000 / 60);
    setStoppableInterval(() => this.handleAnimation(), 200);
  }

  /**
   * Orchestrates which animation to play based on current state.
   */
  handleAnimation() {
    if (this.isDead()) {
      this.playAnimation(this.IMAGES_DEAD);
    } else if (this.isHurt()) {
      this.playAnimation(this.IMAGES_HURT);
    } else if (this.speedY > 0 || this.speedY < 0) {
      this.playAnimation(this.IMAGES_ATTACK);
    } else {
      this.playAnimation(this.IMAGES_ALERT);
    }
  }

  /**
   * Handles the boss movement towards the left when active.
   */
  handleMovement() {
    if (!this.isAboveGround()) {
      this.y = 95;
      this.speedY = 0;
    }
    if (this.hadFirstContact && !this.isDead()) {
      this.updateSpeed();
      this.moveLeft();
    }
  }

  /**
   * Increases movement speed if boss energy is low.
   */
  updateSpeed() {
    let lostEnergy = 100 - this.energy;
    this.speed = 0.5 + lostEnergy / 15;

    if (this.speed > 3.0) {
      this.speed = 3.0;
    }
    if (this.energy < 25) {
      this.speed += 1.0;
    }
  }

  /**
   * Handles the logic when the boss gets hit by a bottle.
   */
  hit() {
    super.hit();
    this.attackJump();
  }

  /**
   * Makes the boss jump aggressively towards the character.
   */
  attackJump() {
    this.speedY = 18;
    let originalSpeed = this.speed;
    this.speed = 5;
    this.playAnimation(this.IMAGES_ATTACK);

    setTimeout(() => {
      this.speed = originalSpeed;
    }, 1200);
  }

  /**
   * Applies gravity to the endboss every 16.7 milliseconds (60 FPS).
   * If the endboss is above the ground or its vertical speed is greater than 0, it moves down by its vertical speed and reduces its vertical speed by its acceleration.
   * If the endboss is not above the ground (i.e. it is on the ground), its vertical speed is set to 0.
   */
  applyGravity() {
    setStoppableInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      } else {
        this.speedY = 0;
      }
    }, 1000 / 60);
  }

  /**
   * Checks if the boss is in the air.
   * @returns {boolean}
   */
  isAboveGround() {
    return this.y < 95;
  }
}
