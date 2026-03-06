
class Clouds extends MovableObject {
  height = 250;
  width = 350;

  /**
   * Creates a new Clouds object.
   * @param {string} imagePath - The path to the image of the cloud.
   * The cloud object is given a random y position between 0 and 100,
   * a random x position between 100 and 2500, and a random speed between 0.01 and 0.5.
   * The cloud object is also started animating immediately.
   */
  constructor(imagePath) {
    super();
    this.loadImage(imagePath);
    this.y = 0 + Math.random() * 100;
    this.x = 100 + Math.random() * 2500;
    this.speed = 0.01 + Math.random() * 0.5;
    this.animate();
  }

  /**
   * Animates the cloud object by calling the handleMovement method every 16.7 milliseconds (60 FPS).
   * This method is responsible for moving the cloud object to the left and checking if it has moved off the screen.
   * If the cloud object has moved off the screen, it is respawned at a new random position.
   */
  animate() {
    setStoppableInterval(() => this.handleMovement(), 1000 / 60);
  }

  /**
   * Moves the cloud to the left by its speed and checks if it has moved off the screen.
   * If it has, it respawns the cloud at a new random position.
   */
  handleMovement() {
    this.moveLeft();
    if (this.isOffScreen()) {
      this.respawn();
    }
  }

  /**
   * Checks if the object has moved completely off the left side of the screen.
   * @returns {boolean} True if the object is off the screen, false otherwise.
   */
  isOffScreen() {
    return this.x < -this.width;
  }

  /**
   * Resets the cloud object to its initial position off the right side of the screen with a random y-coordinate.
   */
  respawn() {
    this.x = 2500;
    this.y = 10 + Math.random() * 100;
  }
}
