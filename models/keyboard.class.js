class Keyboard {
  LEFT = false;
  RIGHT = false;
  SPACE = false;
  S = false;
  constructor() {
    this.keyPressEvent();
  }

  /**
   * Adds event listeners for the keyboard events of the keys left, right, space and S.
   * The event listeners set the corresponding properties of the Keyboard object to true when the key is pressed down and false when the key is released.
   */
  keyPressEvent() {
    window.addEventListener("keydown", (e) => {
      if (e.code === "ArrowLeft") {
        this.LEFT = true;
      }
      if (e.code === "ArrowRight") {
        this.RIGHT = true;
      }
      if (e.code === "Space") {
        this.SPACE = true;
      } else if (e.code === "KeyS") {
        this.S = true;
      }
    });

    window.addEventListener("keyup", (e) => {
      if (e.code === "ArrowLeft") {
        this.LEFT = false;
      }
      if (e.code === "ArrowRight") {
        this.RIGHT = false;
      }
      if (e.code === "Space") {
        this.SPACE = false;
      } else if (e.code === "KeyS") {
        this.S = false;
      }
    });
  }

  /**
   * Binds touch events to the keyboard object. Listeners are added to the left, right, space and S buttons on the mobile screen.
   * When a touch event is triggered, the corresponding property of the Keyboard object is set to true or false.
   * This function is used to enable mobile controls for the game.
   */
  bindTouchEvents() {
    document.getElementById("btn-left").addEventListener("touchstart", (e) => {
      e.preventDefault(); // Verhindert nerviges Zoomen/Scrollen am Handy
      this.LEFT = true;
    });
    document.getElementById("btn-left").addEventListener("touchend", (e) => {
      e.preventDefault();
      this.LEFT = false;
    });

    document.getElementById("btn-right").addEventListener("touchstart", (e) => {
      e.preventDefault();
      this.RIGHT = true;
    });
    document.getElementById("btn-right").addEventListener("touchend", (e) => {
      e.preventDefault();
      this.RIGHT = false;
    });

    document.getElementById("btn-jump").addEventListener("touchstart", (e) => {
      e.preventDefault();
      this.SPACE = true;
    });
    document.getElementById("btn-jump").addEventListener("touchend", (e) => {
      e.preventDefault();
      this.SPACE = false;
    });

    document.getElementById("btn-throw").addEventListener("touchstart", (e) => {
      e.preventDefault();
      this.S = true; // Oder welche Taste du für Werfen nutzt
    });
    document.getElementById("btn-throw").addEventListener("touchend", (e) => {
      e.preventDefault();
      this.S = false;
    });
  }
}
