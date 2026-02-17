class AudioManager {

    game_sound = new Audio('audio/game-sound.mp3');
    character_walk = new Audio('audio/character-walk.mp3');
    character_jump = new Audio('audio/character-jump.mp3');
    character_hurt = new Audio('audio/character-hurt.mp3');
    character_death = new Audio('audio/character-death.mp3');
    chicken_plop = new Audio('audio/chicken-plop.mp3');
    endboss_chicken = new Audio('audio/endboss-chicken.mp3');
    endboss_death = new Audio('audio/endboss-death.mp3');
    endboss_fight = new Audio('audio/endboss-fight.mp3');
    collect_coin = new Audio('audio/collect-coin.mp3');
    collect_bottle = new Audio('audio/collect-bottle.mp3');
    bottle_flies = new Audio('audio/bottle-flies.mp3');
    glass_splash = new Audio('audio/glass-splash.mp3');
    game_over = new Audio('audio/game-over.mp3');
    you_win = new Audio('audio/you-win.mp3');

    isMuted = false;
    allSoundsDisabled = false;

    constructor() {
        // Hintergrundmusik leiser stellen und in Endlosschleife abspielen
        this.game_sound.volume = 0.3;
        this.game_sound.loop = true;
        this.endboss_fight.volume = 0.5;
        this.endboss_fight.loop = true;

        // Cahractrer-Sounds etwas lauter
        this.character_walk.volume = 0.5;
        this.character_jump.volume = 0.1;
        this.character_hurt.volume = 0.1;
        this.character_death.volume = 0.1;

        // Chicken-Sounds etwas lauter
        this.chicken_plop.volume = 0.3;
        this.endboss_chicken.volume = 0.3;
        this.endboss_death.volume = 0.3;

        // Item-Sounds etwas lauter
        this.collect_coin.volume = 0.1;
        this.collect_bottle.volume = 0.1;
        this.bottle_flies.volume = 0.1;
        this.glass_splash.volume = 0.1;

        // win/lose-Sounds etwas lauter
        this.game_over.volume = 0.3;
        this.you_win.volume = 0.3;
    }


    play(soundKey) {
    let sound = this[soundKey];
    if (!sound) return;

    // HIER fehlte die Prüfung: !this.allSoundsDisabled
    if (!this.isMuted && !this.allSoundsDisabled) {
        sound.cloneNode(true).play();
    }
}


    playSingle(soundKey) {
        // Nur abspielen, wenn nicht stumm UND Sounds nicht generell deaktiviert sind
        if (!this.isMuted && !this.allSoundsDisabled && this[soundKey]) {
            this[soundKey].play();
        }
    }


    pause(soundKey) {
    if (this[soundKey]) {
        this[soundKey].pause();
        this[soundKey].currentTime = 0; // Setzt den Sound zurück auf den Anfang (0 Sekunden)
    }
}


    playMusic() {
    // HIER fehlte sie auch!
    if (!this.isMuted && !this.allSoundsDisabled) {
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


    stopAllSounds() {
        this.allSoundsDisabled = true;
    // Wir gehen alle Schlüssel (Eigenschaften) der Klasse durch
    Object.keys(this).forEach(key => {
        let sound = this[key];
        // Wir prüfen: Ist diese Eigenschaft ein Audio-Objekt?
        if (sound instanceof Audio) {
            sound.pause();
            sound.currentTime = 0;
        }
    });
}
}