class Character extends MovableObject {
  height = 230;
  width = 120;
  y = 195; // Bodenposition
  world;
  speed = 8;
  hadFirstContact = false;
  lastActionTime = new Date().getTime();
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

  IMAGES_JAMPING = [
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
 * Constructor for Character class.
 * 
 * Loads all necessary images and starts the animation.
 * Applies gravity to the character and sets it to jump.
 * Initializes the character's coins and bottles to 0.
 */
  constructor() {
    super();
    this.loadImage(this.IMAGES_WALKING[0]);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JAMPING);
    this.loadImages(this.IMAGES_IDLE);
    this.loadImages(this.IMAGES_LONG_IDLE);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
    this.animate();
    this.applyGravity();
    this.jump();
    this.coins = 0;
    this.bottles = 0;
  }

  
/**
 * Animates the character.
 * 
 * This function is responsible for animating the character. It 
 * calls moveCharacter() every 16.67 milliseconds to move the character 
 * and playCharacterAnimations() every 50 milliseconds to play the character's animations.
 * 
 * @memberof Character
 */
  animate() {
    setStoppableInterval(() => {
      if (this.world && this.world.keyboard) {
        this.moveCharacter();
      }
    }, 1000 / 60);

    setStoppableInterval(() => {
      if (this.world) {
        this.playCharacterAnimations();
      }
    }, 50);
  }

/**
 * This function is responsible for moving the character.
 * It checks if the keyboard's right, left, or space key is pressed and
 * moves the character accordingly. It also handles jumping and playing the
 * character's walk and jump sounds. Finally, it updates the camera's x
 * position to follow the character.
 * @memberof Character
 */
  moveCharacter() {
    this.world.audioManager.pause("character_walk");

    if (
      this.world.keyboard.RIGHT ||
      this.world.keyboard.LEFT ||
      this.world.keyboard.SPACE
    ) {
      this.lastActionTime = new Date().getTime();
    }

    if (this.world.keyboard.SPACE && !this.isAboveGround()) {
      this.jump();
      this.world.audioManager.play("character_jump");
    }
    if (
      this.world.keyboard.RIGHT &&
      this.x < this.world.level.Level_end_x - this.width
    ) {
      this.moveRight();
      this.otherDirection = false;
      this.world.audioManager.playSingle("character_walk");
    } else if (this.world.keyboard.LEFT && this.x > 0) {
      this.moveLeft();
      this.otherDirection = true;
      this.world.audioManager.playSingle("character_walk");
    }
    this.world.cameraX = -this.x + 100;
  }

  
/**
 * This function is responsible for playing the character's animations.
 * It checks the character's current state (dead, hurt, jumping, or walking)
 * and plays the corresponding animation. If the character is not in any of
 * these states, it plays the idle animation.
 * @memberof Character
 */
  playCharacterAnimations() {
    if (this.isDead()) {
      // Dead Animation
      this.playAnimation(this.IMAGES_DEAD);
    } else if (this.isHurt()) {
      // Hurt Animation
      this.playAnimation(this.IMAGES_HURT);
    } else if (this.isAboveGround()) {
      // Jump Animation
      this.playAnimation(this.IMAGES_JAMPING);
    } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
      // Walk Animation
      this.playAnimation(this.IMAGES_WALKING);
    } else {
      // Idle Animation
      this.handleIdleState();
    }
  }

  
/**
 * Handles the character's idle state. If the character hasn't moved in 5-10
 * seconds, it plays the normal idle animation. If the character hasn't moved
 * in more than 10 seconds, it plays the long idle animation.
 */
  handleIdleState() {
    let timePassed = (new Date().getTime() - this.lastActionTime) / 1000; // Zeit in Sekunden

    if (timePassed > 5 && timePassed <= 10) {
      // Nach 5 Sekunden Inaktivität: normale Idle-Animation
      this.playAnimation(this.IMAGES_IDLE);
    } else if (timePassed > 10) {
      // Nach 10 Sekunden Inaktivität: lange Idle-Animation
      this.playAnimation(this.IMAGES_LONG_IDLE);
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
    this.speedY = 5;
  }
}
