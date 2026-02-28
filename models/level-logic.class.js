class CollisionManager {
  constructor(world) {
    this.world = world;
  }

  /**
   * Returns the character object associated with the world.
   * @return {Character} The character object.
   */
  get character() {
    return this.world.character;
  }
  get level() {
    return this.world.level;
  }
  get audioManager() {
    return this.world.audioManager;
  }
  get throwableObjects() {
    return this.world.throwableObjects;
  }
  get coinBar() {
    return this.world.coinBar;
  }
  get bottleBar() {
    return this.world.bottleBar;
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
   * Main handler for enemy collisions (Chickens & Small Chickens).
   * @param {MovableObject} enemy
   */
  handleEnemyCollision(enemy) {
    if (enemy.isDead) {
      return;
    }

    const isStomping = this.isCharacterStomping(enemy);
    const isFalling = this.character.speedY < 0;

    if (isStomping && isFalling) {
      this.world.killEnemy(enemy);
    } else {
      this.world.handleCharacterHit();
    }
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
    this.world.cleanUpBottles();
  }

  /**
   * Checks if the player wants to throw a bottle and if the requirements are met.
   */
  checkThrowObjects() {
    if (this.world.canThrow()) {
      this.world.executeThrow();
    }
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
        this.world.removeEnemyWithDelay(enemy);
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
      this.world.handleBossHit(bottle, boss);
    }
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
   * Checks if the character is stomping on an enemy.
   * @param {MovableObject} enemy
   * @returns {boolean}
   */
  isCharacterStomping(enemy) {
    const characterBottom =
      this.character.y + this.character.height - this.character.offset.bottom;
    const enemyTopThreshold = enemy.y + enemy.offset.top + enemy.height * 0.5;
    return characterBottom < enemyTopThreshold;
  }

  /**
   * Checks if a specific bottle hits an enemy and hasn't already shattered.
   * @param {ThrowableObject} bottle - The bottle object to check.
   * @param {MovableObject} enemy - The enemy object to check against.
   * @returns {boolean} True if the bottle hits the enemy and hasn't already shattered, false otherwise.
   */
  isHit(bottle, enemy) {
    return bottle.isColliding(enemy) && !bottle.isBroken;
  }
}
