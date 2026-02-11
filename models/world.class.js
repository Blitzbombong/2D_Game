class World {
    
    character = new Character();
    healthBar = new HealthBar();
    coinBar = new CoinBar();
    bottleBar = new BottleBar();
    endbossBar = new EndbossBar();

    showEndbossBar = false;
    level;

    throwableObjects = []; // Liste der fliegenden Flaschen
    lastThrow = 0;         // Zeitstempel des letzten Wurfs

    canvas;
    ctx;
    keyboard;
    cameraX = 0;

    constructor(canvas, keyboard) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.keyboard = keyboard;
        this.level = level1;
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
            this.checkThrowingCollisions();
            this.checkBottleGroundCollision();
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
        // Logik fuer Pepe vs Coins
        this.level.coins.forEach((coin, index) => {
            if (this.character.isColliding(coin)) {
                this.character.collectCoin(coin);
                this.level.coins.splice(index, 1); // Entferne die Coins aus dem Level
                this.coinBar.setPercentage(this.character.coins); // Aktualisiere die CoinBar (5 Coins = 100%)
            }
        });

        // Logik fuer Pepe vs Salsa-Flaschen
        this.level.bottles.forEach((bottle, index) => {
            if (this.character.isColliding(bottle)) {
                this.character.collectBottle(bottle);
                this.level.bottles.splice(index, 1); // Entferne die Flaschen aus dem Level
                this.bottleBar.setPercentage(this.character.bottles); // Aktualisiere die BottleBar (5 Flaschen = 100%)
            }
        });
    }


    checkCollisions() {
        this.checkEnemyCollisions(); // Pepe vs Hühner
        this.checkItemCollisions();  // Pepe vs Salsa-Flaschen und Coins
        this.checkThrowingCollisions(); // Flasche vs Endboss
        //this.checkEndbossCollisions(); // Pepe vs Endboss
    }


       checkThrowingCollisions() {
        this.throwableObjects.forEach((bottle) => {
            this.level.enemies.forEach((enemy) => {
                if (this.isHit(bottle, enemy)) {
                    // 1. Die Flasche zerbricht immer
                    bottle.break(); 

                    // 2. Logik für normale Hühner
                    if (enemy instanceof Chicken || enemy instanceof SmallChicken) {
                        enemy.die(); 
                    }

                    // 3. Logik für den Endboss (dein neuer Teil!)
                    if (enemy instanceof Endboss) {
                        enemy.hit();
                        this.showEndbossBar = true; // Bar einblenden
                        this.endbossBar.setPercentage(enemy.energy);
                    }
                }
            });
        });

            // 4. AUFRÄUMEN (Das gehört ans Ende der Funktion, außerhalb der Schleifen!)
            this.cleanUpBottles();
    }



// Hilfsfunktion zum Aufräumen der Flaschen, damit kaputte Flaschen nicht ewig in der Welt bleiben
        cleanUpBottles() {
            this.throwableObjects = this.throwableObjects.filter(b => {
                return !b.isBroken || b.currentImage < b.IMAGES_BOTTLE_SPLASH.length;
            });
    }
    


        isHit(bottle, enemy) {
            return bottle.isColliding(enemy) && !bottle.isBroken; // Nur Treffer, wenn die Flasche noch nicht kaputt ist
     }


        checkBottleGroundCollision() {
            this.throwableObjects.forEach((bottle) => {
                // Wenn die Flasche den Boden (y > 350) erreicht und noch nicht kaputt ist
                if (bottle.y > 350 && !bottle.isBroken) {
                    bottle.break(); // Gleiche Funktion wie beim Treffer am Huhn!
                }
            });
    }


}