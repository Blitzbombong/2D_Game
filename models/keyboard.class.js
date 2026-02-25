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


    bindTouchEvents() {
        // LINKS
        document.getElementById('btn-left').addEventListener('touchstart', (e) => {
            e.preventDefault(); // Verhindert nerviges Zoomen/Scrollen am Handy
            this.LEFT = true;
        });
        document.getElementById('btn-left').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.LEFT = false;
        });

        // RECHTS
        document.getElementById('btn-right').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.RIGHT = true;
        });
        document.getElementById('btn-right').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.RIGHT = false;
        });

        // SPRINGEN
        document.getElementById('btn-jump').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.SPACE = true;
        });
        document.getElementById('btn-jump').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.SPACE = false;
        });

        // WERFEN
        document.getElementById('btn-throw').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.S = true; // Oder welche Taste du für Werfen nutzt
        });
        document.getElementById('btn-throw').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.S = false;
        });
    }
}