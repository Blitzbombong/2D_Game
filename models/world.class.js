class World {
  character = new Character();
  healthBar = new HealthBar();
  coinBar = new CoinBar();
  bottleBar = new BottleBar();
  endbossBar = new EndbossBar();

  showEndbossBar = false;
  level;
  audioManager;

  throwableObjects = [];
  lastThrow = 0;
  bossFightStarted = false;
  gameEnded = false;

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
    this.endboss = this.level.endboss;
    this.setWorld();
    this.draw();
    this.run();
  }

  setWorld() {
    this.character.world = this;
    if (this.level.endboss) {
      this.level.endboss.world = this;
    }
    this.level.enemies.forEach((enemy) => {
      enemy.world = this;
    });
  }

  /**
   * Main drawing loop. Clears the canvas and renders all game elements.
   */
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.drawWorldSpace();
    this.drawFixedElements();

    requestAnimationFrame(() => this.draw());
  }

  /**
   * Draws all objects that move with the camera.
   * @private
   */
  drawWorldSpace() {
    this.ctx.translate(this.cameraX, 0);

    this.addObjectsToMap(this.level.backgroundObjects);
    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.level.coins);
    this.addObjectsToMap(this.level.bottles);
    this.addObjectsToMap(this.level.enemies);

    if (this.level.endboss) {
      this.addToMap(this.level.endboss);
    }

    this.addToMap(this.character);
    this.addObjectsToMap(this.throwableObjects);

    this.ctx.translate(-this.cameraX, 0);
  }

  /**
   * Draws all UI elements that stay fixed on the screen.
   * @private
   */
  drawFixedElements() {
    this.addToMap(this.healthBar);
    this.addToMap(this.coinBar);
    this.addToMap(this.bottleBar);
    if (this.showEndbossBar) {
      this.addToMap(this.endbossBar);
    }
  }

  /**
   * Adds all objects in the given array to the map.
   * @param {Array<MovableObject>} objects - The array of objects to add to the map.
   */
  addObjectsToMap(objects) {
    objects.forEach((object) => {
      this.addToMap(object);
    });
  }

  /**
   * Adds a movable object to the map by drawing it on the canvas.
   * If the movable object has the otherDirection property set to true, it will be flipped horizontally before and after drawing.
   * @param {MovableObject} mo - The movable object to add to the map.
   */
  addToMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo);
    }
    if (mo.img) {
      mo.draw(this.ctx);
    }
    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
  }

  /**
   * Flips the given movable object horizontally around its x-axis.
   * This is used to draw movable objects that need to be flipped
   * when they are moving to the left.
   * @param {MovableObject} mo - The movable object to flip.
   */
  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  /**
   * Reverses the effects of calling flipImage on the given movable object.
   * This method restores the original transformation matrix of the canvas and reverses the horizontal flip of the movable object.
   * @param {MovableObject} mo - The movable object to reverse the flip on.
   */
  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }

  /**
   * Main game loop. Calls several methods to update the game state and check for collisions and level progress.
   * @private
   */
  run() {
    setStoppableInterval(() => {
      this.checkLevelProgress();
      this.checkCollisions();
      this.checkGameState();
    }, 50);
  }

  /**
   * Checks for all types of collisions between the character and other objects in the level.
   * This includes checking for collisions with enemies, collectible items, thrown objects, and the ground.
   * This method is responsible for calling the other collision checking methods in the right order.
   */
  checkCollisions() {
    this.checkEnemyCollisions();
    this.checkBossCollision();
    this.checkItemCollisions();
    this.checkThrowingCollisions();
    this.checkThrowObjects();
    this.checkBottleGroundCollision();
  }

  /**
   * Specifically checks collision with the endboss.
   */
  checkBossCollision() {
    const boss = this.level.endboss;
    if (boss && this.character.isColliding(boss)) {
      this.handleCharacterHit();
    }
  }

  /**
   * Checks collisions with the regular enemies array.
   */
  checkEnemyCollisions() {
    this.level.enemies.forEach((enemy) => {
      if (!enemy.isDead && this.character.isColliding(enemy)) {
        this.handleEnemyCollision(enemy);
      }
    });
  }

  /**
   * Handles a collision between the character and an enemy.
   * If the character is above the ground, not hurt, and falling down (i.e. speedY < 0),
   * the enemy is killed. Otherwise, the character is hurt.
   * @param {Enemy} enemy - The enemy object that collided with the character
   */
  handleEnemyCollision(enemy) {
    if (
      this.character.isAboveGround() &&
      !enemy.isBoss &&
      this.character.speedY < 0
    ) {
      this.killEnemy(enemy);
    } else {
      this.handleCharacterHit();
    }
  }

  /**
   * Handles the character getting hit by an enemy.
   * If the character is not already hurt, this method reduces the character's energy and plays a hurt sound.
   * It also updates the health bar in the UI to reflect the character's new energy level.
   */
  handleCharacterHit() {
    if (!this.character.isHurt()) {
      this.character.hit();
      this.audioManager.play("character_hurt");
      this.healthBar.setPercentage(this.character.energy);
    }
  }

  /**
   * Handles a collision between the character and a chicken enemy.
   * If the character is above the ground, the chicken is killed.
   * Otherwise, the character is hurt.
   * @param {Enemy} enemy - The chicken enemy object that collided with the character
   */
  handleChickenCollision(enemy) {
    if (this.character.isAboveGround()) {
      this.killEnemy(enemy);
    } else {
      this.handleCharacterHit();
    }
  }

  /**
   * Kills the given enemy object.
   * This method is used to kill the chicken enemies when the character lands on them.
   * It removes the enemy object from the level's array of enemies and plays a sound effect.
   * It also calls the bounce method on the character to make it bounce up after killing the enemy.
   * @param {Enemy} enemy - The enemy object to kill.
   */
  killEnemy(enemy) {
    enemy.die();
    this.audioManager.play("chicken_plop");
    this.character.bounce();
    setTimeout(() => {
      let index = this.level.enemies.indexOf(enemy);
      if (index > -1) {
        this.level.enemies.splice(index, 1);
      }
    }, 500);
  }

  /**
   * Checks for collisions between the character and collectible items.
   */
  checkItemCollisions() {
    this.checkCoinCollisions();
    this.checkBottleCollisions();
  }

  /**
   * Handles collision logic for coins.
   */
  checkCoinCollisions() {
    this.level.coins.forEach((coin, index) => {
      if (this.character.isColliding(coin)) {
        this.audioManager.play("collect_coin");
        this.character.collectCoin();
        this.level.coins.splice(index, 1);
        this.coinBar.setPercentage(this.character.coins);
      }
    });
  }

  /**
   * Handles collision logic for bottles, including inventory checks.
   */
  checkBottleCollisions() {
    this.level.bottles.forEach((bottle, index) => {
      if (this.character.isColliding(bottle) && this.character.bottles < 100) {
        this.character.collectBottle();
        this.audioManager.play("collect_bottle");
        this.level.bottles.splice(index, 1);
        this.bottleBar.setPercentage(this.character.bottles);
      }
    });
  }

  /**
   * Checks if any thrown bottles collide with enemies or the endboss.
   */
  checkThrowingCollisions() {
    this.throwableObjects.forEach((bottle) => {
      this.checkBottleEnemyCollisions(bottle);
      this.checkBottleBossCollision(bottle);
    });
    this.cleanUpBottles();
  }

  /**
   * Checks collision between one specific bottle and all regular enemies.
   * @param {ThrowableObject} bottle
   */
  checkBottleEnemyCollisions(bottle) {
    this.level.enemies.forEach((enemy) => {
      if (this.isHit(bottle, enemy)) {
        bottle.break();
        enemy.die();
        this.audioManager.play("glass_splash");
      }
    });
  }

  /**
   * Checks collision between one specific bottle and the endboss.
   * @param {ThrowableObject} bottle
   */
  checkBottleBossCollision(bottle) {
    const boss = this.level.endboss;
    if (boss && this.isHit(bottle, boss)) {
      this.handleBossHit(bottle, boss);
    }
  }

  /**
   * Logic for when the boss actually gets hit by a bottle.
   * @param {ThrowableObject} bottle
   * @param {Endboss} boss
   */
  handleBossHit(bottle, boss) {
    bottle.break();
    boss.hit();
    this.audioManager.play("glass_splash");
    this.showEndbossBar = true;
    this.endbossBar.setPercentage(boss.energy);
  }

  /**
   * Removes bottles from the world that are either broken
   * and have finished their splash animation or are out of bounds.
   */
  cleanUpBottles() {
    this.throwableObjects = this.throwableObjects.filter((b) => {
      return !b.isBroken || b.currentImage < b.IMAGES_BOTTLE_SPLASH.length;
    });
  }

  /**
   * Checks if a specific bottle hits an enemy and hasn't already shattered.
   * @param {ThrowableObject} bottle
   * @param {MovableObject} enemy
   * @returns {boolean}
   */
  isHit(bottle, enemy) {
    return bottle.isColliding(enemy) && !bottle.isBroken;
  }

  /**
   * Checks if the player wants to throw a bottle and if the requirements are met.
   */
  checkThrowObjects() {
    if (this.canThrow()) {
      this.executeThrow();
    }
  }

  /**
   * Validates if a bottle can be thrown (Key pressed, bottles available, cooldown finished).
   * @returns {boolean}
   */
  canThrow() {
    const timePassed = new Date().getTime() - this.lastThrow;
    return this.keyboard.S && this.character.bottles > 0 && timePassed > 1000;
  }

  /**
   * Creates a new bottle, handles inventory reduction and plays the sound.
   */
  executeThrow() {
    let bottle = new ThrowableObject(
      this.character.x + 40,
      this.character.y + 100,
      this.character.otherDirection,
    );
    this.throwableObjects.push(bottle);
    this.character.bottles -= 20;
    this.lastThrow = new Date().getTime();

    this.bottleBar.setPercentage(this.character.bottles);
    this.audioManager.play("bottle_flies");
  }

  /**
   * Checks if any thrown bottles hit the ground and triggers the splash effect.
   */
  checkBottleGroundCollision() {
    const groundLevel = 350;

    this.throwableObjects.forEach((bottle) => {
      if (bottle.y > groundLevel && !bottle.isBroken) {
        bottle.break();
        this.audioManager.play("glass_splash");
      }
    });
  }

  /**
   * Monitors character progress to trigger the boss fight at a specific position.
   */
  checkLevelProgress() {
    const bossTriggerX = 1900;
    const isPastTrigger = this.character.x > bossTriggerX;

    if (!this.gameEnded && isPastTrigger && !this.bossFightStarted) {
      this.bossFightStarted = true;
      this.startBossFight();
    }
  }

  /**
   * Orchestrates the transition to the endboss fight.
   */
  startBossFight() {
    this.prepareArena();
    this.clearRegularEnemies();
    this.activateEndboss();
    this.startBossMusic();
  }

  /**
   * Stops regular game music and handles initial arena setup.
   */
  prepareArena() {
    this.audioManager.pause("game_sound");
  }

  /**
   * Instantly kills remaining enemies and clears them after a short delay.
   */
  clearRegularEnemies() {
    this.level.enemies.forEach((enemy) => (enemy.energy = 0));
    setTimeout(() => {
      this.level.enemies = [];
    }, 500);
  }

  /**
   * Triggers the boss behavior and shows the health bar.
   */
  activateEndboss() {
    const boss = this.level.endboss;
    if (boss) {
      boss.hadFirstContact = true;
      this.showEndbossBar = true;
    }
  }

  /**
   * Starts boss music with a slight delay for dramatic effect.
   */
  startBossMusic() {
    setTimeout(() => {
      if (!this.gameEnded) {
        this.audioManager.playSingle("endboss_fight");
      }
    }, 1000);
  }

  /**
   * Continuously checks if the game has reached a win or loss condition.
   */
  checkGameState() {
    if (this.gameEnded) return; // Guard Clause: Wenn vorbei, dann Ende.

    if (this.isCharacterDead()) {
      this.handleLoss();
    } else if (this.isBossDead()) {
      this.handleWin();
    }
  }

  /**
   * @returns {boolean} True if Pepe's energy reaches zero.
   */
  isCharacterDead() {
    return this.character.energy <= 0;
  }

  /**
   * @returns {boolean} True if the endboss exists and its energy reaches zero.
   */
  isBossDead() {
    return this.level.endboss && this.level.endboss.energy <= 0;
  }

  /**
   * Stops the game and triggers the game over sequence.
   */
  handleLoss() {
    this.gameEnded = true;
    setTimeout(() => {
      showGameOver();
    }, 2000);
  }

  /**
   * Stops the game and triggers the victory sequence.
   */
  handleWin() {
    this.gameEnded = true;
    setTimeout(() => {
      showYouWin();
    }, 2000);
  }
}
