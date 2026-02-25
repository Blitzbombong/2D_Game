class Bottle extends MovableObject {
  height = 60;
  width = 50;
  y = 360;
  offset = {
    top: 10,
    left: 15,
    right: 10,
    bottom: 5,
  };

  IMAGES_BOTTLE = [
    "img/6_salsa_bottle/1_salsa_bottle_on_ground.png",
    "img/6_salsa_bottle/2_salsa_bottle_on_ground.png",
  ];

  /**
   * Creates a new Bottle object.
   * @param {number} x - the x position of the bottle
   */
  constructor(x) {
    super();
    this.loadImage(this.IMAGES_BOTTLE[0]);
    this.loadImages(this.IMAGES_BOTTLE);
    this.x = x;
    this.animate();
  }

  /**
   * Plays the animation of the bottle.
   * The animation is played every 500ms.
   */
  animate() {
    setStoppableInterval(() => {
      this.playAnimation(this.IMAGES_BOTTLE);
    }, 500);
  }
}
