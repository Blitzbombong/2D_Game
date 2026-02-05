class MovableObject {
    x = 120;
    y = 250;
    img;
    height = 150;
    width = 100;
    imageCache = {};
    otherDirection = false;
    currentImage = 0;


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


    playAnimation(images) {
        // 1. Sicherheits-Check: Existiert das Array überhaupt und ist es nicht leer?
        if (!images || images.length === 0) {
            console.warn('Animation konnte nicht abgespielt werden: Array ist leer oder fehlt.');
            return; // Funktion hier abbrechen
        }

        let i = this.currentImage % images.length;
        let path = images[i];
        
        // 2. Sicherheits-Check: Ist das Bild wirklich im Cache geladen?
        if (this.imageCache[path]) {
            this.img = this.imageCache[path];
        } else {
            console.error('Bild im Cache nicht gefunden:', path);
        }

        this.currentImage++;
}

    moveLeft() {
        setInterval(() => {
            this.x -= this.speed;
        }, 1000 / 60);
    }


    moveRight() {
        
    }
    
}