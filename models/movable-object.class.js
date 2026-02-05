class MovableObject {
    x = 120;
    y = 250;
    img;
    height = 150;
    width = 100;
    imageCache = {};
    otherDirection = false;
    currentImage = 0;
    speedY = 0;
    acceleration = 2.5;
    speed = 0.15;
    
    offset = {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
};


    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }


    isAboveGround() {
        return this.y < 195;
    }


    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }


    drawFrame(ctx) {  
        if (this instanceof Character || this instanceof Chicken || this instanceof Endboss) {
            ctx.beginPath();
            ctx.rect(
                this.x + this.offset.left, 
                this.y + this.offset.top, 
                this.width - this.offset.left - this.offset.right, 
                this.height - this.offset.top - this.offset.bottom
            );
            ctx.strokeStyle = 'blue';
            ctx.lineWidth = 3;
            ctx.stroke();
        }
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
        this.x -= this.speed;
    }


    moveRight() {
        this.x += this.speed;   
    }


   
     jump() {
        this.speedY = 30;
    } 

    isColliding(mo) {
    return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
           this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
           this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
           this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;
    }
    
}