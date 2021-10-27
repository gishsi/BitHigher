import GameObject from "./GameObject.js";
import Sprite from "./Sprite.js";
export default class Ground extends GameObject{
    constructor(l, t, w, h) {
        super(l, t, w, h);
        this.isOffCanvas = false;
        // this.src = 'src/assets/images/ground.png';

        this.sprite = new Sprite({
            src: 'src/assets/images/ground.png'
        })
    }

    update() {
        // move the ground lower so that the player cannot stand on it
        this.ot = this.t;
        this.t += 0.02;
    }
}