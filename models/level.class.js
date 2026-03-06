
class Level {
    enemies;
    endboss;
    clouds;
    bottles;
    coins;
    backgroundObjects;
    Level_end_x = 2300;  

    
    /**
     * Creates a new Level instance.
     * @param {Enemy[]} enemies - The enemies for this level.
     * @param {Endboss} endboss - The endboss for this level.
     * @param {Cloud[]} clouds - The clouds for this level.
     * @param {BackgroundObject[]} backgroundObjects - The background objects for this level.
     * @param {Bottle[]} bottles - The bottles for this level.
     * @param {Coin[]} coins - The coins for this level.
     */
    constructor(enemies, endboss, clouds, backgroundObjects, bottles, coins) {
        this.enemies = enemies;
        this.endboss = endboss;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.bottles = bottles;
        this.coins = coins;
    }
}