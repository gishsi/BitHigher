import GameObject from "./GameObject.js";
import Sprite from './Sprite.js';
export default class Platform extends GameObject {
    constructor(l, t, w, h, src) {
        super(l, t, w, h, src);
        this.vy = 0.5;
        this.sprite =  new Sprite({
            gameObject: this,
            src: src || "src/assets/images/platform.png",
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