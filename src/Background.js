import Sprite from "./Sprite.js";
export default class Background {
    constructor(world) {
        this.l = world.l;
        this.t = world.t;
        this.w = world.width;
        this.h = world.height;
        
        this.sprite =  new Sprite({
            gameObject: this,
            src: world.src
        });
        // Background height is the overall height of the loaded sprite image
        // this.h is the part that the user sees
        this.backgroundHeight = this.sprite.image.height - this.h;
    }
   
}