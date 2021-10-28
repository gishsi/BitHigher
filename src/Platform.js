import GameObject from "./GameObject.js";
import Sprite from './Sprite.js';
export default class Platform extends GameObject {
    constructor(l, t, w, h) {
        super(l, t, w, h);
        this.vy = 0.5;
        this.sprite =  new Sprite({
            gameObject: this,
            src: "src/assets/images/p2.png",
        });
    }
    update() {
        this.ob = this.b;
        this.ol = this.l;
        this.or = this.r;
        this.ot = this.t;

        this.l += this.vx;
        this.t += this.vy;
        this.r = this.l + this.w;
        this.b = this.t + this.h;
    }
}