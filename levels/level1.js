
let level1;


/**
 * Initializes the first level by assembling all game objects.
 */
function initLevel1() {
  level1 = new Level(
    createEnemies(),
    new Endboss(),
    createClouds(),
    createBackgroundObjects(),
    createBottles(),
    createCoins()
  );
}


/**
 * Creates the repetitive background layers for the level.
 * @returns {BackgroundObject[]}
 */
function createBackgroundObjects() {
  return [
    new BackgroundObject('img/5_background/layers/air.png', -720, 0),
    new BackgroundObject('img/5_background/layers/3_third_layer/2.png', -720, 0),
    new BackgroundObject('img/5_background/layers/2_second_layer/2.png', -720, 0),
    new BackgroundObject('img/5_background/layers/1_first_layer/2.png', -720, 0),

    new BackgroundObject('img/5_background/layers/air.png', 0, 0),
    new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 0, 0),
    new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 0, 0),
    new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 0, 0),

    new BackgroundObject('img/5_background/layers/air.png', 720, 0),
    new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 720, 0),
    new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 720, 0),
    new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 720, 0),

    new BackgroundObject('img/5_background/layers/air.png', 1440, 0),
    new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 1440, 0),
    new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 1440, 0),
    new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 1440, 0),

    new BackgroundObject('img/5_background/layers/air.png', 2160, 0),
    new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 2160, 0),
    new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 2160, 0),
    new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 2160, 0),
  ];
}


/**
 * Creates an array of enemies (Chicken and SmallChicken).
 * @returns {Enemy[]}
 */
function createEnemies() {
    let enemies = [];
    for (let i = 0; i < 5; i++) enemies.push(new Chicken());
    for (let i = 0; i < 5; i++) enemies.push(new SmallChicken());
    return enemies;
}


/**
 * Creates an array of Clouds objects to be used in the game world.
 * The array contains 8 Clouds objects, with 4 objects created from
 * the image 'img/5_background/layers/4_clouds/1.png' and 4 objects
 * created from the image 'img/5_background/layers/4_clouds/2.png'.
 * @returns {Clouds[]} An array of Clouds objects
 */
function createClouds() {
    let clouds = [];
    for (let i = 0; i < 4; i++) {
        clouds.push(new Clouds('img/5_background/layers/4_clouds/1.png'));
    }
    for (let i = 0; i < 4; i++) {
        clouds.push(new Clouds('img/5_background/layers/4_clouds/2.png'));
    }
    return clouds;
}  


/**
 * Creates an array of Bottle objects to be used in the game world.
 * The array contains 8 Bottle objects, with their x positions
 * spaced out evenly starting from the x position 400, and then
 * offset by a random amount between 0 and 100.
 * @returns {Bottles[]} An array of Bottle objects
 */
function createBottles() {
    let bottles = [];
    let startX = 400;
    let distance = 200;

    for (let i = 0; i < 8 ; i++) {
        let x = startX + (i * distance) + (Math.random() * 100);
        bottles.push(new Bottle(x));
    }
    return bottles;
}


/**
 * Creates an array of Coins objects to be used in the game world.
 * The array contains 5 Coins objects, with their x positions
 * spaced out evenly starting from the x position 400, and then
 * offset by a random amount between 0 and 100.
 * @returns {Coins[]} An array of Coins objects
 */
function createCoins() {
    let coins = [];
    let startX = 400;
    let distance = 200;

    for (let i = 0; i < 5; i++) {
        let x = startX + (i * distance) + (Math.random() * 100);
        coins.push(new Coins(x));
    }
    return coins;
}
