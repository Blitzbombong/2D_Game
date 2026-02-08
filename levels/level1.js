
function createEnemies() {
    let enemies = [];
    for (let i = 0; i < 8; i++) {
        enemies.push(new Chicken());
    }
    for (let i = 0; i < 8;  i++) {
        enemies.push(new SmallChicken());
    }
    enemies.push(new Endboss());
    return enemies;
}


const level1 = new Level(
    createEnemies(),

    [
        new Clouds('img/5_background/layers/4_clouds/1.png'),
        new Clouds('img/5_background/layers/4_clouds/2.png')
    ],
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
    ]
);