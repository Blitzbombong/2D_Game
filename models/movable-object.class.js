class MovableObject {
    x = 120;
    y = 250;
    img;
    height = 150;
    width = 100;
    imageCache = {};


    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }


    /**
     * Loads an array of images into the imageCache object.
     * Each image is stored with its path as the key.
     * @param {Array<string>} arr - An array of image paths.
     */
    loadImages(arr) {
        arr.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    moveLeft() {
        setInterval(() => {
            this.x -= this.speed;
        }, 1000 / 60);
    }


    moveRight() {
        
    }
    
}