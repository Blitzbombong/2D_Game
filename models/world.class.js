class World {
    
    character = new Character();
    healthBar = new HealthBar();
    coinBar = new CoinBar();
    bottleBar = new BottleBar();
    endbossBar = new EndbossBar();

    showEndbossBar = false; // Flag, um die Endboss-Bar anzuzeigen, wenn der Endboss getroffen wird
    level;

    throwableObjects = []; // Liste der fliegenden Flaschen
    lastThrow = 0;         // Zeitstempel des letzten Wurfs
    bossFightStarted = false; // Flag, um den Start des Bosskampfs zu verfolgen

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

        // --- START Welt-Raum (Alles, was sich mit der Kamera bewegt) ---
        this.ctx.translate(this.cameraX, 0);

        // 1. Hintergrund (Ganz hinten)
        this.addObjectsToMap(this.level.backgroundObjects);
        
        // 2. Wolken (Hinter den Gegnern)
        this.addObjectsToMap(this.level.clouds);

        // 3. Sammelobjekte (Coins & Bottles)
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);

        // 4. Gegner (Hühner ODER Boss)
        if (!this.bossFightStarted) {
            this.addObjectsToMap(this.level.enemies.filter(e => !(e instanceof Endboss)));
        } else {
            this.addObjectsToMap(this.level.enemies.filter(e => e instanceof Endboss));
        }

        // 5. Pepe (Sollte meistens vor den Gegnern zu sehen sein)
        this.addToMap(this.character);

        // 6. Fliegende Flaschen (Ganz vorne im Raum)
        this.addObjectsToMap(this.throwableObjects);

        this.ctx.translate(-this.cameraX, 0);
        // --- ENDE Welt-Raum ---

        // 7. HUD / Statusbars (Fixiert am Bildschirm, bewegen sich NICHT mit)
        this.addToMap(this.healthBar);
        this.addToMap(this.coinBar);
        this.addToMap(this.bottleBar);

        if (this.showEndbossBar) {
            this.addToMap(this.endbossBar);
        }

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
            this.checkLevelProgress();
            this.checkEnemyCollisions();
            this.checkItemCollisions();
            this.checkThrowingCollisions();
            this.checkBottleGroundCollision();
            this.checkThrowObjects();
        }, 50);
}

    checkEnemyCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                // Prüfung: Ist Pepe in der Luft UND fällt er gerade nach unten?
                if (this.character.isAboveGround() && this.character.speedY < 0) {
                    enemy.die(); // Das Huhn stirbt (Animation/isDead)
                    this.character.bounce(); // Pepe bekommt einen kleinen "Bounce"-Sprung nach oben
                    
                    // Huhn nach 500ms entfernen
                    setTimeout(() => {
                        let index = this.level.enemies.indexOf(enemy);
                        if (index > -1) this.level.enemies.splice(index, 1);
                    }, 500);
                } 
                // Nur wenn er NICHT draufspringt und NICHT bereits verletzt ist, kriegt er Schaden
                else if (!this.character.isHurt()) {
                    this.character.hit();
                    this.healthBar.setPercentage(this.character.energy);
                }
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
        this.checkThrowObjects(); // Überprüfen, ob die Wurf-Logik ausgelöst werden soll
        this.checkBottleGroundCollision(); // Überprüfen, ob Flaschen den Boden berühren
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


        checkThrowObjects() {
            // 1. Zuerst prüfen: Wird die Taste gedrückt UND sind Flaschen da?
            if (this.keyboard.S && this.character.bottles > 0) {
                let currentTime = new Date().getTime();
                
                // 2. Dann prüfen: Ist die Sekunde Wartezeit (Cooldown) vorbei?
                if (currentTime - this.lastThrow > 1000) {
                    
                    // 3. ERST JETZT erstellen wir die Flasche wirklich!
                    let bottle = new ThrowableObject(
                        this.character.x + 40, 
                        this.character.y + 100, 
                        this.character.otherDirection
                    );
                    
                    // 4. In die Liste schieben, damit sie gezeichnet wird
                    this.throwableObjects.push(bottle);

                    // 5. Inventar abziehen und Zeit speichern
                    this.character.bottles -= 20;
                    this.bottleBar.setPercentage(this.character.bottles);
                    this.lastThrow = currentTime;
                }
            }
        }


        checkBottleGroundCollision() {
            this.throwableObjects.forEach((bottle) => {
                // Wenn die Flasche den Boden (y > 350) erreicht und noch nicht kaputt ist
                if (bottle.y > 350 && !bottle.isBroken) {
                    bottle.break(); // Gleiche Funktion wie beim Treffer am Huhn!
                }
            });
    }


    checkLevelProgress() {
    // Wenn Pepe z.B. die 2500 Pixel Marke knackt
        if (this.character.x > 1900 && !this.bossFightStarted) {
            this.bossFightStarted = true;
            this.startBossFight();
        }
    }


    startBossFight() {
        // 1. Wir löschen alle normalen Hühner aus dem Level
        this.level.enemies = this.level.enemies.filter(e => e instanceof Endboss);

        // 2. Jetzt den Boss aktivieren
        let boss = this.level.enemies.find(e => e instanceof Endboss);
        if (boss) {
            boss.hadFirstContact = true;
            this.showEndbossBar = true;
        }
    }

}