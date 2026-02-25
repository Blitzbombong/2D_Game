class BackgroundObject extends MovableObject {
  height = 480;
  width = 720;
  y = 0; // Bodenposition
  x = 0; // Bodenposition

  /**
   * Creates a new BackgroundObject.
   * @param {string} imagePath - the path to the image of the object
   * @param {number} x - the x position of the object
   * @param {number} y - the y position of the object
   */
  constructor(imagePath, x, y) {
    super();
    this.loadImage(imagePath); // Nutzt den Pfad, den du im Array übergeben hast
    this.x = x;
    this.y = y;
  }
}
