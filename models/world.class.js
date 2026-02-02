class World {
    
    character = new Character();
    enemies = [ 
        new Chicken(),
        new Chicken(), 
        new Chicken()
    ]
    clousds = [
        new Clouds('img/5_background/layers/4_clouds/1.png'),
        new Clouds('img/5_background/layers/4_clouds/2.png')
    ];

    backgroundObjects = [
        new BackgroundObject('img/5_background/layers/air.png', 0,0),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 0,0),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 0,0),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 0,0),
    ];

    canvas;
    ctx;

    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.draw();
    }




    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.addObjectsToMap(this.backgroundObjects);
        this.addToMap(this.character);
        this.addObjectsToMap(this.enemies);
        this.addObjectsToMap(this.clousds);


        // drow() wird immer wieder aufgerufen
        requestAnimationFrame(() => this.draw());
    }

    addObjectsToMap(objects) {
        objects.forEach((object) => {
            this.addToMap(object);
        });
    }

    addToMap(movableObject) {
        this.ctx.drawImage(movableObject.img, movableObject.x, movableObject.y, movableObject.width, movableObject.height);
    }
}