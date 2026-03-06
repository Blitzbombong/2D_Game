class ThrowableObject extends MovableObject {
  isBroken = false;

  offset = {
    top: 10,
    left: 15,
    right: 10,
    bottom: 5,
  };

  IMAGES_BOTTLE_ROTATED = [
    "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];

  IMAGES_BOTTLE_SPLASH = [
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
  ];

  constructor(x, y, direction) {
    super();
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

  /**
   * Checks if the object is above the ground (i.e. y-coordinate less than 195).
   * This method always returns true, as the object is always above the ground.
   * @returns {boolean} True if the object is above the ground, false otherwise.
   */
  isAboveGround() {
    return true;
  }

  /**
   * Throws the bottle object in the given direction (true for left, false for right).
   * This method applies gravity to the object and moves it in the given direction every 25 milliseconds until it breaks.
   * The object's horizontal speed is set to 10 pixels per frame, and its vertical speed is set to 30 pixels per frame.
   * @param {boolean} direction - True for left, false for right.
   */
  throw(direction) {
    this.speedY = 30;
    this.applyGravity();

    let throwInterval = setStoppableInterval(() => {
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

  /**
   * Animates the bottle object.
   * If the bottle object is broken, this method plays the animation of the bottle splashing.
   * Otherwise, this method plays the animation of the bottle rotating.
   * The animation is played every 50 milliseconds.
   */
  animate() {
    setStoppableInterval(() => {
      if (this.isBroken) {
        this.playAnimation(this.IMAGES_BOTTLE_SPLASH);
      } else {
        this.playAnimation(this.IMAGES_BOTTLE_ROTATED);
      }
    }, 50);
  }

  /**
   * Sets the bottle object to a broken state.
   * This method sets the object's isBroken property to true, sets its vertical and horizontal speeds to 0, and resets its current image index to 0, which is the first image of the splash animation.
   */
  break() {
    this.isBroken = true;
    this.speedY = 0;
    this.speed = 0;
    this.currentImage = 0; // Zurücksetzen auf den Anfang der Splash-Animation
  }
}
