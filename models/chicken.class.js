class Chicken extends MovableObject {
    height = 70;
    width = 60;

    constructor() {
        super();
        this.loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');

        this.x = 200 + Math.random() * 500; // Zufällige Startposition
        this.y = 352; // Bodenposition
    }

}