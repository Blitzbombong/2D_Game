class Coins extends MovableObject {
  width = 80;
  height = 80;
  y = 320;
  offset = {
    top: 25,
    left: 25,
    right: 25,
    bottom: 25,
  };

  IMAGES_COINS = ["img/8_coin/coin_1.png", "img/8_coin/coin_2.png"];

  constructor(x) {
    super();
    this.loadImage(this.IMAGES_COINS[0]);
    this.loadImages(this.IMAGES_COINS);
    this.y = 60 + Math.random() * 150;
    this.x = x;
    this.animate();
  }

  /**
   * Starts the animation loop for the coin's blinking effect.
   */
  animate() {
    setStoppableInterval(() => this.handleAnimation(), 300);
  }

  /**
   * Cycles through the coin images to create a glimmering effect.
   */
  handleAnimation() {
    this.playAnimation(this.IMAGES_COINS);
  }
}

