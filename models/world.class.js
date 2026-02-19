class World {
    
    character = new Character();
    healthBar = new HealthBar();
    coinBar = new CoinBar();
    bottleBar = new BottleBar();
    endbossBar = new EndbossBar();

    showEndbossBar = false; // Flag, um die Endboss-Bar anzuzeigen, wenn der Endboss getroffen wird
    level;
    audioManager;

    throwableObjects = []; // Liste der fliegenden Flaschen
    lastThrow = 0;         // Zeitstempel des letzten Wurfs
    bossFightStarted = false; // Flag, um den Start des Bosskampfs zu verfolgen
    gameEnded = false; // Flag, um zu verhindern, dass das Spiel mehrfach endet

    canvas;
    ctx;
    keyboard;
    cameraX = 0;

    constructor(canvas, keyboard) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.keyboard = keyboard;
        this.level = level1;
        this.audioManager = audioManager;
        this.endboss = this.level.enemies.find(e => e.isBoss);
        this.setWorld();
        this.draw();
        this.run();
    }


    setWorld() {
        this.character.world = this;
        // Wir müssen dem Boss auch die Welt zuweisen!
        if (this.level.endboss) {
            this.level.endboss.world = this;
        }
        this.level.enemies.forEach((enemy) => {
            enemy.world = this;
        });
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

        // 1. Zeichne nur die normalen Hühner
        this.addObjectsToMap(this.level.enemies.filter(e => !e.isBoss));

        // 2. Zeichne den Boss separat, wenn er "aktiv" ist
        this.addToMap(this.level.endboss);

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
        setStoppableInterval(() => {
            this.checkLevelProgress();
            this.checkEnemyCollisions();
            this.checkItemCollisions();
            this.checkThrowingCollisions();
            this.checkBottleGroundCollision();
            this.checkThrowObjects();
            this.checkGameState();
        }, 50);
}

    checkEnemyCollisions() {
        // 1. Hühner (lassen wir so)
        this.level.enemies.forEach((enemy) => {
            if (!enemy.isDead && this.character.isColliding(enemy)) {
                this.handleChickenCollision(enemy);
            }
        });

        // 2. BOSS-CHECK (Radikal vereinfacht zum Testen)
        let boss = this.level.endboss;
        if (boss) {
            // Wir ignorieren isColliding für einen Moment und schauen nur auf den Abstand
            let distanz = Math.abs(this.character.x - boss.x);
            
            // Jedes Mal, wenn Pepe dem Boss näher als 500 Pixel kommt, MUSS das in die Konsole
            if (distanz < 500) {
                console.log('ENTFERNUNG ZUM BOSS:', distanz);
                console.log('Pepe steht bei:', this.character.x);
                console.log('Boss steht bei:', boss.x);
            }

            if (this.character.isColliding(boss)) {
                console.log('KOLLISION ERKANNT! Pepe kriegt jetzt Schaden.');
                this.handleCharacterHit(); // Nur Pepe verliert Leben!
            }
        }
    }


    handleCharacterHit() {
        if (!this.character.isHurt()) {
            this.character.hit();
            this.audioManager.play('character_hurt');
            this.healthBar.setPercentage(this.character.energy);
            console.log('Pepe Energie jetzt:', this.character.energy);
        }
    }


    handleChickenCollision(enemy) {
    // Wenn Pepe in der Luft ist, tötet er das Huhn
    // Wir nehmen hier erst mal nur isAboveGround(), um sicherzugehen, dass es klappt
        if (this.character.isAboveGround()) {
            this.killEnemy(enemy);
        } else {
            // Wenn er am Boden ist und gegen das Huhn läuft -> Schaden für Pepe
            this.handleCharacterHit();
        }
    }


    killEnemy(enemy) {
        enemy.die(); 
        this.audioManager.play('chicken_plop');
        this.character.bounce(); // Pepe hüpft kurz hoch
        
        // Nach einer kurzen Zeit verschwindet das tote Huhn
        setTimeout(() => {
            let index = this.level.enemies.indexOf(enemy);
            if (index > -1) {
                this.level.enemies.splice(index, 1);
            }
        }, 500);
    }


    checkItemCollisions() {
        // Logik fuer Pepe vs Coins
        this.level.coins.forEach((coin, index) => {
            if (this.character.isColliding(coin)) {
                this.audioManager.play('collect_coin');
                this.character.collectCoin(coin);
                this.level.coins.splice(index, 1); // Entferne die Coins aus dem Level
                this.coinBar.setPercentage(this.character.coins); // Aktualisiere die CoinBar (5 Coins = 100%)
            }
        });

        // Logik fuer Pepe vs Salsa-Flaschen
        this.level.bottles.forEach((bottle, index) => {
        if (this.character.isColliding(bottle)) {
            
            
            // NEU: Nur sammeln, wenn noch Platz im Rucksack ist (weniger als 100%)
            if (this.character.bottles < 100) {
                this.character.collectBottle(bottle);
                this.audioManager.play('collect_bottle');
                this.level.bottles.splice(index, 1); // Flasche aus der Welt entfernen
                this.bottleBar.setPercentage(this.character.bottles);
            } else {
                // Optional: Hier könntest du ein Geräusch abspielen, 
                // das signalisiert: "Ich bin voll!"
            }
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
            // A: Check für normale Hühner
            this.level.enemies.forEach((enemy) => {
                if (this.isHit(bottle, enemy)) {
                    bottle.break();
                    enemy.die();
                    this.audioManager.play('glass_splash');
                }
            });

            // B: NEU - Check für den Endboss (da er nicht mehr in der Liste ist)
            let boss = this.level.endboss;
            if (boss && this.isHit(bottle, boss)) {
                bottle.break();
                boss.hit(); // Boss verliert Energie
                this.audioManager.play('glass_splash');
                this.showEndbossBar = true;
                this.endbossBar.setPercentage(boss.energy);
                console.log('BOSS WURDE GETROFFEN! Energie:', boss.energy);
            }
        });

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
                this.audioManager.play('bottle_flies'); // Flaschen-Wurf-Sound abspielen
                
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
                    this.audioManager.play('glass_splash');
                }
            });
    }


    checkLevelProgress() {
    // Wenn Pepe z.B. die 2500 Pixel Marke knackt
        if (!this.gameEnded && this.character.x > 1900 && !this.bossFightStarted) {
            this.bossFightStarted = true;
            this.startBossFight();
        }
    }


    startBossFight() {
        this.audioManager.pause('game_sound'); 

        this.level.enemies.forEach(enemy => enemy.energy = 0); // Alle Hühner sterben gleichzeitig
        setTimeout(() => {
            this.level.enemies = []; // Und erst nach 500ms verschwinden sie ganz
        }, 500);

        setTimeout(() => {
            if (!this.gameEnded) {
                this.audioManager.playSingle('endboss_fight'); 
            }
        }, 1000);

        // Wir greifen DIREKT auf den VIP-Platz zu
        let boss = this.level.endboss; 

        if (boss) {
            boss.hadFirstContact = true;
            this.showEndbossBar = true;
            console.log("Boss erfolgreich aus der VIP-Box aktiviert!");
        }
    }


    checkGameState() {
    // Wenn das Spiel schon vorbei ist, machen wir gar nichts mehr
       // FALL 1: Pepe verliert
        if (this.character.energy <= 0) {
        this.gameEnded = true;
        
        // Wir geben Pepe 2 Sekunden Zeit für seine "Hurt/Dead"-Animation
        setTimeout(() => {
            showGameOver();
        }, 2000); 

        }
        
        // 2. Prüfen: Hat der Boss verloren?
        // Wir greifen direkt auf den VIP-Endboss im Level zu
        else if (this.level.endboss && this.level.endboss.energy <= 0) {
            this.gameEnded = true;
            
            // Wir geben dem Boss 2 Sekunden Zeit, seine Todes-Animation 
            // (IMAGES_DEAD) in Ruhe zu Ende zu spielen.
            setTimeout(() => {
                showYouWin();
            }, 2000); 
        }
    }

}