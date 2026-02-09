class EndbossBar extends StatusBar {
    IMAGES = [
        'img/7_statusbars/1_statusbar/4_statusbar_endboss/blue/0.png',
        'img/7_statusbars/1_statusbar/4_statusbar_endboss/blue/20.png',
        'img/7_statusbars/1_statusbar/4_statusbar_endboss/blue/40.png',
        'img/7_statusbars/1_statusbar/4_statusbar_endboss/blue/60.png',
        'img/7_statusbars/1_statusbar/4_statusbar_endboss/blue/80.png',
        'img/7_statusbars/1_statusbar/4_statusbar_endboss/blue/100.png'
    ];  

    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 20;
        this.y = 200;
        this.width = 200;
        this.height = 50;
        this.setPercentage(100);
    }
}