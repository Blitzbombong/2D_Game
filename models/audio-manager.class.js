class AudioManager {

    game_sound = new Audio('audio/game-sound.mp3');
    character_walk = new Audio('audio/character-walk.mp3');
    character_jump = new Audio('audio/character-jump.mp3');
    character_hurt = new Audio('audio/character-hurt.mp3');
    character_death = new Audio('audio/character-death.mp3');
    chicken_sound = new Audio('audio/chicken-sound.mp3');
    chicken_plop = new Audio('audio/chicken-plop.mp3');
    endboss_chicken = new Audio('audio/endboss-chicken.mp3');
    endboss_death = new Audio('audio/endboss-death.mp3');
    endboss_fight = new Audio('audio/endboss-fight.mp3');
    collect_coin = new Audio('audio/collect-coin.mp3');
    collect_bottle = new Audio('audio/collect-bottle.mp3');
    bottle_flies = new Audio('audio/bottle-flies.mp3');
    glass_splash = new Audio('audio/glass-splash.mp3');

    isMuted = false;

    constructor() {
        // Hintergrundmusik leiser stellen und in Endlosschleife abspielen
        this.game_sound.volume = 0.1;
        this.game_sound.loop = true;
        this.endboss_fight.volume = 0.5;
        this.endboss_fight.loop = true;

        // Cahractrer-Sounds etwas lauter
        this.character_walk.volume = 0.5;
        this.character_jump.volume = 0.1;
        this.character_hurt.volume = 0.1;
        this.character_death.volume = 0.1;

        // Chicken-Sounds etwas lauter
        this.chicken_sound.volume = 0.1;
        this.chicken_plop.volume = 0.3;
        this.endboss_chicken.volume = 0.3;
        this.endboss_death.volume = 0.3;

        // Item-Sounds etwas lauter
        this.collect_coin.volume = 0.1;
        this.collect_bottle.volume = 0.1;
        this.bottle_flies.volume = 0.1;
        this.glass_splash.volume = 0.1;
    }


    play(soundKey) {
        if (!this.isMuted) {
            this[soundKey].cloneNode(true).play(); 
            // cloneNode(true) sorgt dafür, dass ein Sound mehrfach 
            // gleichzeitig abspielen kann
        }
    }


    playSingle(soundKey) {
        if (!this.isMuted && this[soundKey]) {
            this[soundKey].play();
        }
    }


    pause(soundKey) {
        if (this[soundKey]) {
            this[soundKey].pause();
        }
    }


    playMusic() {
        if (!this.isMuted) {
            this.game_sound.play();
        }
    }


    stopMusic() {
        this.game_sound.pause();
    }


    toggleMute() {
        this.isMuted = !this.isMuted;
        if (this.isMuted) {
            this.stopMusic();
        } else {
            this.playMusic();
        }
    }
}