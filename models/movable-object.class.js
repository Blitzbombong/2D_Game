
class MovableObject extends DrawableObject {
  otherDirection = false;
  speedY = 0;
  acceleration = 2.5;
  speed = 0.15;
  energy = 100;
  lastHit = 0;

  offset = {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  };

  /**
   * Applies constant gravity to the object.
   */
  applyGravity() {
  setStoppableInterval(() => {
    if (this.isAboveGround() || this.speedY > 0) {
      this.y = Math.min(this.y - this.speedY, 195); 
      this.speedY -= this.acceleration;
    } else {
      this.y = 195;
      this.speedY = 0;
    }
  }, 1000 / 60);
}

  /**
   * Checks if the object is above the ground (i.e. y-coordinate less than 195).
   * @returns {boolean} True if the object is above the ground, false otherwise.
   */
  isAboveGround() {
    return this.y < 195;
  }

  /**
   * Checks if the object should be drawn based on its type.
   * @returns {boolean} True if the object should be drawn, false otherwise.
   */
  shouldDrawFrame() {
    return (
      this instanceof Character ||
      this instanceof Chicken ||
      this instanceof SmallChicken ||
      this.isBoss ||
      this instanceof Bottle ||
      this instanceof Coins
    );
  }

  /**
   * Cycles through an array of images to play an animation.
   * @param {string[]} images - Array of image paths.
   */
  playAnimation(images) {
    if (!images || images.length === 0) return;
    let i = this.currentImage % images.length;
    let path = images[i];
    if (this.imageCache[path]) {
      this.img = this.imageCache[path];
    }
    this.currentImage++;
  }

  /** Movement and State Methods */

  /**
   * Moves the object to the left by its speed.
   */
  moveLeft() {
    this.x -= this.speed;
  }

  /**
   * Moves the object to the right by its speed.
   */
  moveRight() {
    this.x += this.speed;
  }
  
  /**
   * Sets the vertical speed of the object to 25, which causes the object to jump.
   * This method is typically called when the space key is pressed and the object is on the ground.
   */
  jump() {
    this.speedY = 25;
  }

  /**
   * Reduces energy and saves the timestamp of the hit.
   */
  hit() {
    this.energy -= 20;
    if (this.energy < 0) {
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  /**
   * Checks if the object has run out of energy.
   * @returns {boolean} True if the object is dead, false otherwise.
   */
  isDead() {
    return this.energy == 0;
  }

  /**
   * Checks if the object was hit within the last second.
   * @returns {boolean}
   */
  isHurt() {
    let timePassed = (new Date().getTime() - this.lastHit) / 1000;
    return timePassed < 1;
  }

  /**
   * Precision collision detection using offsets.
   * @param {MovableObject} mo - The other movable object.
   * @returns {boolean}
   */
  isColliding(mo) {
    return (
      this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
      this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
      this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
      this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
    );
  }
}
