class World {
    
    character = new Character();
    healthBar = new HealthBar();
    coinBar = new CoinBar();
    bottleBar = new BottleBar();
    endbossBar = new EndbossBar();

    showEndbossBar = false;
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
        this.addObjectsToMap(this.level.coins);
         this.addObjectsToMap(this.level.bottles);

        this.ctx.translate(-this.cameraX, 0);

        this.addToMap(this.healthBar);
        this.addToMap(this.coinBar);
        this.addToMap(this.bottleBar);

        if (this.showEndbossBar) {
            this.addToMap(this.endbossBar);
        }

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
    }
        if (typeof mo.drawFrame === 'function') {
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
            this.checkEnemyCollisions();
            this.checkItemCollisions();
            // this.checkThrowingCollisions(); // Erst aktivieren, wenn du Flaschen werfen kannst!
        }, 50);
}

    checkEnemyCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                this.character.hit();
                 // Logik für Pepe vs. Hühner / Endboss
                console.log('Pepe wurde getroffen!' + this.character.energy);
            }
        });
    }

    checkItemCollisions() {
        // Hier prüfen wir später Coins und Bottles
        // Wir lassen sie erst einmal leer, damit kein Fehler kommt
    }


    


    checkCollisions() {
        this.checkEnemyCollisions(); // Pepe vs Hühner
        this.checkItemCollisions();  // Pepe vs Salsa-Flaschen
        //this.checkThrowingCollisions(); // Flasche vs Endboss
        //this.checkEndbossCollisions(); // Pepe vs Endboss
    }
}