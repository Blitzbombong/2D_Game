class Level {
    enemies;
    clouds;
    bottles;
    backgroundObjects;
    Level_end_x = 2300;  

    
    constructor(enemies, clouds, backgroundObjects, bottles) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.bottles = bottles;
    }
}