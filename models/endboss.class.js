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

  constructor() {
    super();
    this.isBoss = true;
    this.energy = 100;
    this.loadBossImages();
    this.animate();
  }

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
   * Handles the boss movement towards the left when active.
   */
  handleMovement() {
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

    if (this.speed > 2.0) {
    this.speed = 2.0; 
  }

    if (this.energy < 25) {
      this.speed += 1.0;
    }
  }

  /**
   * Handles the logic for when the boss is hit by a bottle.
   * @param {ThrowableObject} bottle - The bottle object that hit the boss.
   * @param {Endboss} boss - The boss object that was hit.
   */
  hit() {
    super.hit();
    if (!this.isAboveGround()) {
      this.jump();
    }
  }

  /**
   * Orchestrates which animation to play based on current state.
   */
  handleAnimation() {
    if (this.isDead()) {
      this.playAnimation(this.IMAGES_DEAD);
    } else if (this.isHurt()) {
      this.playAnimation(this.IMAGES_HURT);
    } else if (this.hadFirstContact) {
      this.playAnimation(this.IMAGES_ATTACK);
    } else {
      this.playAnimation(this.IMAGES_ALERT);
    }
  }
}
