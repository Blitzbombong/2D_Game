class World {
  character = new Character();
  healthBar = new HealthBar();
  coinBar = new CoinBar();
  bottleBar = new BottleBar();
  endbossBar = new EndbossBar();

  showEndbossBar = false;
  level = level1;
  audioManager = audioManager;
  collisionManager = new CollisionManager(this);

  throwableObjects = [];
  lastThrow = 0;
  bossFightStarted = false;
  gameEnded = false;

  canvas;
  ctx;
  keyboard;
  cameraX = 0;

  /**
   * Initializes the World object by setting the canvas, context, and keyboard properties.
   * Sets the initial world state by calling the setWorld method.
   * Draws the world by calling the draw method.
   * Starts the game loop by calling the run method.
   * @param {HTMLCanvasElement} canvas - The canvas element to draw on.
   * @param {Keyboard} keyboard - The keyboard object to handle input events.
   */
  constructor(canvas, keyboard) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.keyboard = keyboard;
    this.setWorld();
    this.draw();
    this.run();
  }

  /**
   * Sets the world property of the character, endboss and enemies.
   * This property is used to access the world's properties and methods
   * from the character, endboss and enemies.
   * @memberof World
   */
  setWorld() {
    this.character.world = this;
    if (this.level.endboss) this.level.endboss.world = this;
    this.level.enemies.forEach((enemy) => (enemy.world = this));
  }

  /**
   * Clears the canvas and redraws the world space and fixed elements.
   * This method is responsible for the main drawing loop of the game.
   * It clears the canvas, redraws the world space (background, enemies, character, etc.),
   * and then redraws the fixed elements (health bar, coin bar, etc.).
   * After drawing, it requests the next frame using requestAnimationFrame.
   */
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawWorldSpace();
    this.drawFixedElements();
    requestAnimationFrame(() => this.draw());
  }

  /**
   * Draws all objects in the world space, which are objects that move with the camera.
   * This includes background objects, clouds, coins, bottles, enemies, the character, and thrown objects.
   * The canvas is translated to the camera's position at the start of the method, and then translated back at the end.
   * This is done to ensure that all objects in the world space are drawn relative to the camera's position.
   */
  drawWorldSpace() {
    this.ctx.translate(this.cameraX, 0);
    this.addObjectsToMap(this.level.backgroundObjects);
    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.level.coins);
    this.addObjectsToMap(this.level.bottles);
    this.addObjectsToMap(this.level.enemies);
    if (this.level.endboss) this.addToMap(this.level.endboss);
    this.addToMap(this.character);
    this.addObjectsToMap(this.throwableObjects);
    this.ctx.translate(-this.cameraX, 0);
  }

  /**
   * Draws all objects that are not affected by the camera's movement.
   * This includes the health bar, coin bar, bottle bar and the endboss bar.
   * The endboss bar is only drawn if the showEndbossBar property is set to true.
   */
  drawFixedElements() {
    this.addToMap(this.healthBar);
    this.addToMap(this.coinBar);
    this.addToMap(this.bottleBar);
    if (this.showEndbossBar) this.addToMap(this.endbossBar);
  }

  /**
   * Iterates over an array of objects and calls the addToMap method for each one.
   * This method is used to easily add multiple objects to the drawing map.
   * @param {Array<MovableObject>} objects - The array of objects to add to the drawing map.
   */
  addObjectsToMap(objects) {
    objects.forEach((object) => this.addToMap(object));
  }

  /**
   * Adds a MovableObject to the drawing map.
   * If the object is drawn in reverse, this method first calls flipImage to
   * reverse the image, then calls draw on the object, and finally calls
   * flipImageBack to restore the original image.
   * @param {MovableObject} mo - The MovableObject to add to the drawing map.
   */
  addToMap(mo) {
    if (mo.otherDirection) this.flipImage(mo);
    if (mo.img) mo.draw(this.ctx);
    if (mo.otherDirection) this.flipImageBack(mo);
  }

  /**
   * Reverses the image of the given MovableObject by translating it to its width and scaling it by -1.
   * This method is used to draw the object in reverse.
   * @param {MovableObject} mo - The MovableObject to reverse the image of.
   */
  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x *= -1;
  }

  /**
   * Restores the image of the given MovableObject by restoring the canvas state and scaling it by -1.
   * This method is used to restore the original image after drawing the object in reverse.
   * @param {MovableObject} mo - The MovableObject to restore the image of.
   */
  flipImageBack(mo) {
    mo.x *= -1;
    this.ctx.restore();
  }

  /**
   * Main game loop.
   * This method starts a setStoppableInterval which checks for level progress, collisions between objects, and the game state.
   * The interval runs every 50 milliseconds.
   */
  run() {
    setStoppableInterval(() => {
      this.checkLevelProgress();
      this.collisionManager.checkCollisions();
      this.checkGameState();
    }, 1000 / 60);
  }

  /**
   * Handles the logic for when the character is hit.
   * This method checks if the character is not already hurt, then
   * reduces the character's energy, plays the hurt sound effect, and
   * updates the health bar to reflect the character's new energy level.
   */
  handleCharacterHit() {
    if (!this.character.isHurt() && !this.character.isDead()) {
      this.character.hit();
      this.healthBar.setPercentage(this.character.energy);
      if (this.character.isDead()) {
        this.audioManager.play("character_death");
        this.character.isDeathSoundPlayed = true;
      } else {
        this.audioManager.play("character_hurt");
      }
    }
  }

  /**
   * Handles the logic for when an enemy is killed.
   * This method makes the enemy die, plays the chicken pop sound effect, bounces the character, and removes the enemy from the level with a delay of 500 milliseconds.
   * @param {MovableObject} enemy - The enemy object to kill.
   */
  killEnemy(enemy) {
    enemy.die();
    this.audioManager.play("chicken_plop");
    this.character.bounce();
    this.removeEnemyWithDelay(enemy);
  }

  /**
   * Removes an enemy from the level with a delay of 500 milliseconds.
   * @param {MovableObject} enemy - The enemy object to remove.
   */
  removeEnemyWithDelay(enemy) {
    setTimeout(() => {
      let index = this.level.enemies.indexOf(enemy);
      if (index > -1) this.level.enemies.splice(index, 1);
    }, 500);
  }

  /**
   * Handles the logic for when the boss is hit by a bottle.
   * @param {ThrowableObject} bottle - The bottle object that hit the boss.
   * @param {Endboss} boss - The boss object that was hit.
   */
  handleBossHit(bottle, boss) {
    bottle.break();
    boss.hit();
    this.audioManager.play("glass_splash");
    this.audioManager.play("endboss_hit");
    this.showEndbossBar = true;
    this.endbossBar.setPercentage(boss.energy);
    if (boss.isDead() && !boss.isDeadSoundPlayed) {
      this.handleBossDeath(boss);
    }
  }

  /**
   * Handles the logic for when the boss is killed.
   * @param {Endboss} boss - The boss object that was killed.
   */
  handleBossDeath(boss) {
    boss.isDeadSoundPlayed = true;
    this.audioManager.pause("endboss_fight");
    this.audioManager.play("you_win");
  }

  /**
   * Removes all broken bottles from the list of thrown bottles.
   * A bottle is considered broken if its current image index is equal to or greater than the length of the bottle splash animation array.
   * This method is called after checking for collisions between thrown bottles and enemies or the endboss.
   */
  cleanUpBottles() {
    this.throwableObjects = this.throwableObjects.filter((b) => {
      return !b.isBroken || b.currentImage < b.IMAGES_BOTTLE_SPLASH.length;
    });
  }

  /**
   * Checks if the player can throw a bottle.
   * This method checks if the spacebar is pressed, if the character has at least one bottle left, and if at least one second has passed since the last throw.
   * @returns {boolean} True if the player can throw a bottle, false otherwise.
   */
  canThrow() {
    const timePassed = new Date().getTime() - this.lastThrow;
    return this.keyboard.S && this.character.bottles > 0 && timePassed > 1000;
  }

  /**
   * Executes the throwing of a bottle.
   * This method creates a new ThrowableObject at the character's position with the correct direction.
   * It then adds the bottle to the list of thrown bottles, reduces the character's bottles by 20, and sets the last throw time.
   * Finally, it updates the bottle bar and plays the bottle flying sound effect.
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
   * Checks if the level has been completed and if the endboss fight has already started.
   * If the character has moved past the level end (x > 1900), the game has not ended, and the endboss fight has not started, it starts the endboss fight.
   */
  checkLevelProgress() {
    if (!this.gameEnded && this.character.x > 1500 && !this.bossFightStarted) {
      this.bossFightStarted = true;
      this.startBossFight();
    }
  }

  /**
   * Starts the endboss fight by stopping the game sound, clearing the level enemies, and enabling the endboss bar.
   * After a short delay, the endboss fight sound effect is played.
   * @private
   */
  startBossFight() {
    this.audioManager.pause("game_sound");
    const boss = this.level.endboss;
    if (boss) {
      boss.hadFirstContact = true;
      this.showEndbossBar = true;
    }
    setTimeout(() => {
      if (!this.gameEnded) this.audioManager.playSingle("endboss_fight");
    }, 1000);
  }

  /**
   * Checks the game state and ends the game if the character's energy is 0 or the endboss's energy is 0.
   * If the character's energy is 0, the game over screen is shown.
   * If the endboss's energy is 0, the you win screen is shown.
   * @private
   */
  checkGameState() {
    if (this.gameEnded) return;
    if (this.level.endboss?.energy <= 0) {
      this.handleEnd(showYouWin);
    } else if (this.character.energy <= 0) {
      this.handleEnd(showGameOver);
    }
  }

  /**
   * Handles the end of the game by pausing the game sound and endboss fight, and showing the game over or you win screen after a short delay.
   * @param {Function} showScreenFunc - The function to call to show the game over or you win screen.
   * @private
   */
  handleEnd(showScreenFunc) {
    this.gameEnded = true;
    this.audioManager.pause("game_sound");
    this.audioManager.pause("endboss_fight");
    setTimeout(() => {
      stopGame();
      showScreenFunc();
    }, 2000);
  }
}
