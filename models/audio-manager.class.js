class AudioManager {
  game_sound = new Audio("audio/game-sound.mp3");
  character_walk = new Audio("audio/character-walk.mp3");
  character_jump = new Audio("audio/character-jump.mp3");
  character_hurt = new Audio("audio/character-hurt.mp3");
  character_death = new Audio("audio/character-death.mp3");
  chicken_plop = new Audio("audio/chicken-plop.mp3");
  endboss_chicken = new Audio("audio/endboss-chicken.mp3");
  endboss_death = new Audio("audio/endboss-death.mp3");
  endboss_fight = new Audio("audio/endboss-fight.mp3");
  endboss_hit = new Audio("audio/endboss-hit.mp3");
  collect_coin = new Audio("audio/collect-coin.mp3");
  collect_bottle = new Audio("audio/collect-bottle.mp3");
  bottle_flies = new Audio("audio/bottle-flies.mp3");
  glass_splash = new Audio("audio/glass-splash.mp3");
  game_over = new Audio("audio/game-over.mp3");
  you_win = new Audio("audio/you-win.mp3");

  isMuted = false;
  allSoundsDisabled = false;

  constructor() {
    let savedMuteState = localStorage.getItem("isMuted");
    this.isMuted = savedMuteState === "true";
    this.setAllVolumes();
    this.setupLoops();
    if (this.isMuted) {
      this.stopMusic();
    }
  }

  /**
   * Sets the volume levels for all game sounds.
   * @private
   */
  setAllVolumes() {
    this.game_sound.volume = 0.3;
    this.endboss_fight.volume = 0.5;
    this.character_walk.volume = 0.5;
    this.character_jump.volume = 0.01;
    this.character_hurt.volume = 0.01;
    this.character_death.volume = 0.01;
    this.chicken_plop.volume = 0.1;
    this.endboss_chicken.volume = 0.3;
    this.endboss_death.volume = 0.3;
    this.collect_coin.volume = 0.01;
    this.collect_bottle.volume = 0.01;
    this.bottle_flies.volume = 0.1;
    this.glass_splash.volume = 0.1;
    this.game_over.volume = 0.05;
    this.you_win.volume = 0.05;
    this.endboss_hit.volume = 0.3;
  }

  /**
   * Configures which sounds should play in a loop.
   * @private
   */
  setupLoops() {
    this.game_sound.loop = true;
    this.endboss_fight.loop = true;
  }

  /**
   * Plays a given sound if it is not muted and all sounds are not disabled.
   * If the sound does not exist, the function does nothing.
   * @param {string} soundKey the key of the sound to play
   */
  play(soundKey) {
    let sound = this[soundKey];
    if (!sound) return;

    if (!this.isMuted && !this.allSoundsDisabled) {
      let clone = sound.cloneNode(true);
      clone.volume = sound.volume;
      clone.play();
    }
  }

  /**
   * Plays a single sound if it is not muted and all sounds are not disabled.
   * If the sound does not exist, the function does nothing.
   * @param {string} soundKey the key of the sound to play
   */
  playSingle(soundKey) {
    let sound = this[soundKey];
    if (!this.isMuted && !this.allSoundsDisabled && sound) {
      sound.currentTime = 0;
      sound.play();
    }
  }

  /**
   * Pauses a specific sound and resets its playback position to the start.
   * @param {string} soundKey - The key of the sound to pause.
   */
  pause(soundKey) {
    if (this[soundKey]) {
      this[soundKey].pause();
      this[soundKey].currentTime = 0;
    }
  }

  /**
   * Plays the game music if it is not muted and all sounds are not disabled.
   */
  playMusic() {
    // HIER fehlte sie auch!
    if (!this.isMuted && !this.allSoundsDisabled) {
      this.game_sound.play();
    }
  }

  /**
   * Stops the game music from playing.
   * This function can be called to pause the music without changing the mute state.
   */
  stopMusic() {
    this.game_sound.pause();
  }

  /**
   * Toggles the mute state of the game's audio.
   * If the audio is currently muted, it will be unmuted, and vice versa.
   * The mute button in the start screen and the in-game user interface will
   * be updated with the new mute state.
   */
  toggleMute() {
    this.isMuted = !this.isMuted;
    localStorage.setItem("isMuted", this.isMuted);

    if (this.isMuted) {
      this.stopMusic();
    }
  }

  /**
   * Disables all sounds in the game by pausing them and resetting their
   * currentTime to 0. This function is useful for stopping all sounds
   * when the game is paused or when the game is over.
   * @description
   * This function goes through all properties of the class and checks
   * if they are an instance of the Audio class. If they are, it
   * pauses the sound and resets its currentTime to 0.
   * @example
   * audioManager.stopAllSounds();
   */
  stopAllSounds() {
    this.allSoundsDisabled = true;
    Object.keys(this).forEach((key) => {
      let sound = this[key];
      if (sound instanceof Audio) {
        sound.pause();
        sound.currentTime = 0;
      }
    });
  }
}
