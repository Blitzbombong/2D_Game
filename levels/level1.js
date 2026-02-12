
function createEnemies() {
    let enemies = [];
    for (let i = 0; i < 5; i++) {
        enemies.push(new Chicken());
    }
    for (let i = 0; i < 5;  i++) {
        enemies.push(new SmallChicken());
    }
    enemies.push(new Endboss());
    return enemies;
}


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


const level1 = new Level(
    createEnemies(),

    createClouds(),

    [
        new BackgroundObject('img/5_background/layers/air.png', -720,0),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', -720,0),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', -720,0),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', -720,0),
        
        new BackgroundObject('img/5_background/layers/air.png', 0,0),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 0,0),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 0,0),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 0,0),
       
        new BackgroundObject('img/5_background/layers/air.png', 720,0),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 720,0),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 720,0),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 720,0),
       
        new BackgroundObject('img/5_background/layers/air.png', 1440,0),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 1440,0),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 1440,0),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 1440,0),

        new BackgroundObject('img/5_background/layers/air.png', 2160,0),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 2160,0),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 2160,0),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png',  2160,0),
    ],

    createBottles(),

    createCoins()
);