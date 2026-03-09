class Character extends MovableObject {
  height = 230;
  width = 120;
  y = 195;
  world;
  speed = 8;
  hadFirstContact = false;
  lastActionTime = new Date().getTime();
  isDeathSoundPlayed = false;
  offset = {
    top: 85,
    left: 20,
    right: 20,
    bottom: 10,
  };

  IMAGES_WALKING = [
    "img/2_character_pepe/2_walk/W-21.png",
    "img/2_character_pepe/2_walk/W-22.png",
    "img/2_character_pepe/2_walk/W-23.png",
    "img/2_character_pepe/2_walk/W-24.png",
    "img/2_character_pepe/2_walk/W-25.png",
    "img/2_character_pepe/2_walk/W-26.png",
  ];

  IMAGES_JUMPING = [
    "img/2_character_pepe/3_jump/J-31.png",
    "img/2_character_pepe/3_jump/J-32.png",
    "img/2_character_pepe/3_jump/J-33.png",
    "img/2_character_pepe/3_jump/J-34.png",
    "img/2_character_pepe/3_jump/J-35.png",
    "img/2_character_pepe/3_jump/J-36.png",
    "img/2_character_pepe/3_jump/J-37.png",
    "img/2_character_pepe/3_jump/J-38.png",
    "img/2_character_pepe/3_jump/J-39.png",
  ];

  IMAGES_IDLE = [
    "img/2_character_pepe/1_idle/idle/I-1.png",
    "img/2_character_pepe/1_idle/idle/I-2.png",
    "img/2_character_pepe/1_idle/idle/I-3.png",
    "img/2_character_pepe/1_idle/idle/I-4.png",
    "img/2_character_pepe/1_idle/idle/I-5.png",
    "img/2_character_pepe/1_idle/idle/I-6.png",
    "img/2_character_pepe/1_idle/idle/I-7.png",
    "img/2_character_pepe/1_idle/idle/I-8.png",
    "img/2_character_pepe/1_idle/idle/I-9.png",
    "img/2_character_pepe/1_idle/idle/I-10.png",
  ];

  IMAGES_LONG_IDLE = [
    "img/2_character_pepe/1_idle/long_idle/I-11.png",
    "img/2_character_pepe/1_idle/long_idle/I-12.png",
    "img/2_character_pepe/1_idle/long_idle/I-13.png",
    "img/2_character_pepe/1_idle/long_idle/I-14.png",
    "img/2_character_pepe/1_idle/long_idle/I-15.png",
    "img/2_character_pepe/1_idle/long_idle/I-16.png",
    "img/2_character_pepe/1_idle/long_idle/I-17.png",
    "img/2_character_pepe/1_idle/long_idle/I-18.png",
    "img/2_character_pepe/1_idle/long_idle/I-19.png",
    "img/2_character_pepe/1_idle/long_idle/I-20.png",
  ];

  IMAGES_HURT = [
    "img/2_character_pepe/4_hurt/H-41.png",
    "img/2_character_pepe/4_hurt/H-42.png",
    "img/2_character_pepe/4_hurt/H-43.png",
  ];

  IMAGES_DEAD = [
    "img/2_character_pepe/5_dead/D-51.png",
    "img/2_character_pepe/5_dead/D-52.png",
    "img/2_character_pepe/5_dead/D-53.png",
    "img/2_character_pepe/5_dead/D-54.png",
    "img/2_character_pepe/5_dead/D-55.png",
    "img/2_character_pepe/5_dead/D-56.png",
    "img/2_character_pepe/5_dead/D-57.png",
  ];

  /**
   * Initializes a new Character object.
   * Sets up animations, gravity, and jump mechanics.
   * Initializes coin and bottle count to 0.
   */
  constructor() {
    super();
    this.loadCharacterImages();
    this.animate();
    this.applyGravity();
    this.coins = 0;
    this.bottles = 0;
  }

  /**
   * Helper to load all character-related image sets.
   */
  loadCharacterImages() {
    this.loadImage(this.IMAGES_WALKING[0]);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMPING);
    this.loadImages(this.IMAGES_IDLE);
    this.loadImages(this.IMAGES_LONG_IDLE);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
  }

  /**
   * Main animation loop for movement and visual states.
   */
  animate() {
    setStoppableInterval(() => this.handleMovement(), 1000 / 60);
    setStoppableInterval(() => this.handleAnimations(), 100);
  }

  /**
   * Manages the character's movement logic based on keyboard input.
   */
  handleMovement() {
    if (!this.world) return;
    this.world.audioManager.pause("character_walk");

    this.checkActivity();
    this.handleJump();
    this.handleWalking();

    this.world.cameraX = -this.x + 100;
  }

  /**
   * Checks if any action key is pressed to reset the idle timer.
   */
  checkActivity() {
    const keys = this.world.keyboard;
    if (keys.RIGHT || keys.LEFT || keys.SPACE || keys.S) {
      this.lastActionTime = new Date().getTime();
    }
  }

  /**
   * Handles the character's jump logic.
   */
  handleJump() {
  if (this.world.keyboard.SPACE && !this.isAboveGround() && !this.jumpProcessed) {
    this.jump();
    this.world.audioManager.play("character_jump");
    this.jumpProcessed = true;
  }
  if (!this.world.keyboard.SPACE) {
    this.jumpProcessed = false;
  }
}

  /**
   * Handles left and right movement and plays walking sounds.
   */
  handleWalking() {
    const keys = this.world.keyboard;
    const canMoveRight =
      keys.RIGHT && this.x < this.world.level.Level_end_x - this.width;
    const canMoveLeft = keys.LEFT && this.x > 0;

    if (canMoveRight) {
      this.moveRight();
      this.otherDirection = false;
      this.world.audioManager.playSingle("character_walk");
    } else if (canMoveLeft) {
      this.moveLeft();
      this.otherDirection = true;
      this.world.audioManager.playSingle("character_walk");
    }
  }

  /**
   * Orchestrates which animation set to play based on character state.
   */
  handleAnimations() {
    if (this.isDead()) {
      this.playAnimation(this.IMAGES_DEAD);
    } else if (this.isHurt()) {
      this.playAnimation(this.IMAGES_HURT);
    } else if (this.isAboveGround()) {
      this.playAnimation(this.IMAGES_JUMPING);
    } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
      this.playAnimation(this.IMAGES_WALKING);
    } else {
      this.handleIdleState();
    }
  }

  /**
   * Handles the character's idle state based on inactive time.
   */
  handleIdleState() {
    let timePassed = (new Date().getTime() - this.lastActionTime) / 1000;

    if (timePassed > 10) {
      this.playAnimation(this.IMAGES_LONG_IDLE);
    } else {
      this.playAnimation(this.IMAGES_IDLE);
    }
  }

  /**
   * Increases the character's coins by 20. If the character's coins are more than 100,
   * sets the character's coins to 100.
   *
   * @memberof Character
   */
  collectCoin() {
    this.coins += 20;
    if (this.coins > 100) {
      this.coins = 100;
    }
  }

  /**
   * Increases the character's bottles by 20. If the character's bottles are more than 100,
   * sets the character's bottles to 100.
   * @memberof Character
   */
  collectBottle() {
    this.bottles += 20;
    if (this.bottles > 100) {
      this.bottles = 100;
    }
  }

  /**
   * Bounces the character by setting its speedY to 5.
   * @memberof Character
   */
  bounce() {
    this.speedY = 15;
  }
}
