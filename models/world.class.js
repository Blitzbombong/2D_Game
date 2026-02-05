class World {
    
    character = new Character();
    level = level1;

    canvas;
    ctx;
    keyboard;
    cameraX = 0;

    constructor(canvas, keyboard) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.keyboard = keyboard;
        this.setWorld();
        this.draw();
        this.run();
    }


    setWorld() {
        this.character.world = this;
    }



    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.cameraX, 0);

        this.addObjectsToMap(this.level.backgroundObjects);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.clouds);

        this.ctx.translate(-this.cameraX, 0);

        // drow() wird immer wieder aufgerufen
        requestAnimationFrame(() => this.draw());
    }

    addObjectsToMap(objects) {
        objects.forEach((object) => {
            this.addToMap(object);
        });
    }

    addToMap(mo) {
    if (mo.otherDirection) {
        this.flipImage(mo);
    }
    
    // Nur zeichnen, wenn das Bild wirklich da ist
    if (mo.img) {
        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);
    }


    if (mo.otherDirection) {
        this.flipImageBack(mo);
    }
}

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }


    run() {
        setInterval(() => {
            this.checkCollisions();
        }, 200); // Wir prüfen 5 Mal pro Sekunde (reicht völlig aus)
    }


    checkCollisions() {
        this.checkEnemyCollisions(); // Pepe vs Hühner
        this.checkItemCollisions();  // Pepe vs Salsa-Flaschen
        this.checkThrowingCollisions(); // Flasche vs Endboss
        this.checkEndbossCollisions(); // Pepe vs Endboss
    }
}