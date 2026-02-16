class MovableObject extends DrawableObject {
    
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    speed = 0.15;
    energy = 100;
    
    lastHit = 0;
    offset = {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
};


    applyGravity() {
        setStoppableInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }


    isAboveGround() {
        return this.y < 195;
    }

    
    drawFrame(ctx) {  
        if (this instanceof Character || this instanceof Chicken || this instanceof SmallChicken || this instanceof Endboss || this instanceof Bottle || this instanceof Coins) {
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


    hit() {
        this.energy -= 20;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }


    isDead() {
        return this.energy == 0;
    }


    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit    // Zeitdifferenz in Millisekunden
        timePassed = timePassed / 1000;                         // Differenz in Sekunden
        return timePassed < 1;                                  // Pepe gilt für 1 Sekunde als "verletzt"
    }


    isColliding(mo) {
    return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
           this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
           this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
           this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;
    }
    
}