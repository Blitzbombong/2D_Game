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

    canvas;
    ctx;

    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.draw();
    }




    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.drawImage(this.character.img, this.character.x, this.character.y, this.character.width, this.character.height);
        this.enemies.forEach((enemy) => {
            this.ctx.drawImage(enemy.img, enemy.x, enemy.y, enemy.width, enemy.height);
        });

        this.clousds.forEach((cloud) => {
            this.ctx.drawImage(cloud.img, cloud.x, cloud.y, cloud.width, cloud.height);
        });

        // drow() wird immer wieder aufgerufen
        requestAnimationFrame(() => this.draw());
    }
}