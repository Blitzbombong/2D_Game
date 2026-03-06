
class Chicken extends MovableObject {
  height = 70;
  width = 60;
  y = 352;
  speed = 0.15 + Math.random() * 0.5;
  isDead = false;

  offset = {
    top: 0,
    left: 0,
    right: 0,
    bottom: 5,
  };

  IMAGES_WALKING = [
    "img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];

  IMAGES_DEAD = ["img/3_enemies_chicken/chicken_normal/2_dead/dead.png"];

  /**
   * Creates a new Chicken object.
   * @constructor
   */
  constructor() {
    super();
    this.x = 400 + Math.random() * 1800;
    this.loadImage(this.IMAGES_WALKING[0]);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_DEAD);
    this.animate();
  }

  /**
   * Orchestrates the movement and animation loops for the chicken.
   */
  animate() {
    setStoppableInterval(() => this.handleMovement(), 1000 / 60);
    setStoppableInterval(() => this.handleAnimation(), 150);
  }

  /**
   * Handles the horizontal movement and screen wrapping.
   */
  handleMovement() {
    if (this.isDead) return;

    this.moveLeft();

    if (this.isOffScreen()) {
      if (this.world && !this.world.bossFightStarted) {
        this.respawn();
      }
    }
  }

  /**
   * Checks if the chicken has moved completely off the left side of the screen.
   * @returns {boolean}
   */
  isOffScreen() {
    return this.x < -this.width;
  }

  /**
   * Places the chicken back to the right side of the level at a random position.
   */
  respawn() {
    this.x = 1700 + Math.random() * 500;
  }

  /**
   * Manages the visual state of the chicken (walking or dead).
   */
  handleAnimation() {
    if (this.isDead) {
      this.loadImage(this.IMAGES_DEAD[0]);
    } else {
      this.playAnimation(this.IMAGES_WALKING);
    }
  }

  /**
   * Sets the chicken to dead state and stops its movement.
   */
  die() {
    this.isDead = true;
    this.speed = 0;

    if (this.IMAGES_DEAD && this.IMAGES_DEAD.length > 0) {
      this.loadImage(this.IMAGES_DEAD[0]);
    }
  }
}
