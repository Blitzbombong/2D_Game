class Chicken extends MovableObject {
    height = 50;
    width = 50;

    constructor() {
        super();
        this.loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');

        this.x = 200 + Math.random() * 500; // Zufällige Startposition
        this.y = 365; // Bodenposition
    }

}