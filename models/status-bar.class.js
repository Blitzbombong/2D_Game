class StatusBar extends DrawableObject {
    percentage = 100;

    // Diese Methode bleibt für alle gleich
    setPercentage(percentage) {
        this.percentage = percentage; // Speichern des aktuellen Prozentsatzes
        let path = this.IMAGES[this.resolveImageIndex()]; // Berechnung des Bildpfads basierend auf dem Prozentsatz
        this.img = this.imageCache[path]; // Laden des Bildes aus dem Cache
    }

    // Die Logik, welches Bild angezeigt wird, basiert auf dem Prozentsatz
    resolveImageIndex() {
        if (this.percentage >= 100) return 5; // Bild für 100% 
        if (this.percentage >= 80) return 4;  // Bild für 80%   
        if (this.percentage >= 60) return 3;  // Bild für 60% 
        if (this.percentage >= 40) return 2;  // Bild für 40% 
        if (this.percentage >= 20) return 1;  // Bild für 20% 
        return 0; // Für 0% oder weniger
        }

}