
class BottleBar extends StatusBar {
  IMAGES = [
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png",
  ];

  /**
   * Initializes a new BottleBar object.
   * This function calls the superclass constructor and sets the
   * x, y, width, height and percentage of the object.
   * The images for the object are also loaded into the imageCache.
   * @see StatusBar
   */
  constructor() {
    super();
    this.loadImages(this.IMAGES);
    this.x = 20;
    this.y = 70;
    this.width = 150;
    this.height = 35;
    this.setPercentage(0);
  }
}
