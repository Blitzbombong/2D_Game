class Keyboard {
    LEFT = false;
    RIGHT = false;
    SPACE = false;
    S = false;
    constructor() {
        this.keyPressEvent();
    }

    keyPressEvent() {
        // Wenn die Taste gedrückt wird wird die entsprechende Variable true
       window.addEventListener("keydown", (e) => {
            if (e.code === "ArrowLeft"){
            this.LEFT = true;
        }
         if (e.code === "ArrowRight"){
            this.RIGHT = true;
        }
         if (e.code === "Space"){
            this.SPACE = true;
        } else
         if (e.code === "KeyS"){
            this.S = true;
        }
       });
       

       // Wenn die Taste losgelassen wird wird die entsprechende Variable false
       window.addEventListener("keyup", (e) => {
        if (e.code === "ArrowLeft"){
            this.LEFT = false;
        }
         if (e.code === "ArrowRight"){
            this.RIGHT = false;
        }
         if (e.code === "Space"){
            this.SPACE = false;
        } else
         if (e.code === "KeyS"){
            this.S = false;
        }
       });
    }
}