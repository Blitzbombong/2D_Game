class StatusBar extends DrawableObject {
    percentage = 100;

    
    /**
     * Sets the percentage of the status bar.
     * This function updates the image of the status bar based on the given percentage.
     * The percentage is expected to be a value between 0 and 100.
     * @param {number} percentage - the percentage of the status bar
     */
    setPercentage(percentage) {
        this.percentage = percentage; // Speichern des aktuellen Prozentsatzes
        let path = this.IMAGES[this.resolveImageIndex()]; // Berechnung des Bildpfads basierend auf dem Prozentsatz
        this.img = this.imageCache[path]; // Laden des Bildes aus dem Cache
    }


    /**
     * Resolves the index of the image to load based on the given percentage.
     * The index is resolved as follows:
     * - 5: For 100%
     * - 4: For 80% or more
     * - 3: For 60% or more
     * - 2: For 40% or more
     * - 1: For 20% or more
     * - 0: For 0% or less
     * @returns {number} - the index of the image to load
     */
    resolveImageIndex() {
        if (this.percentage >= 100) return 5; // Bild für 100% 
        if (this.percentage >= 80) return 4;  // Bild für 80%   
        if (this.percentage >= 60) return 3;  // Bild für 60% 
        if (this.percentage >= 40) return 2;  // Bild für 40% 
        if (this.percentage >= 20) return 1;  // Bild für 20% 
        return 0; // Für 0% oder weniger
        }

}