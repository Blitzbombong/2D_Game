class DrawableObject {
  height = 150;
  width = 100;
  x = 120;
  y = 250;
  img;
  imageCache = {};
  currentImage = 0;

  /**
   * Draws the object on the canvas.
   * @param {CanvasRenderingContext2D} ctx - the context to draw on
   */
  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  /**
   * Loads an image into the imageCache object.
   * @param {string} path - the path to the image
   */
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  /**
   * Loads an array of images into the imageCache object.
   * Each image is stored with its path as the key.
   * @param {Array<string>} arr - An array of image paths.
   */
  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }
}
