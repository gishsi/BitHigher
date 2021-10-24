import Rectangle from "./Rectangle.js";
import {detect} from './Overlap.js'
export default class Player extends Rectangle {
    constructor(l, t, w, h) {
        super(l, t, w, h);
        this.canJump = false;
    }
    update(g, f) {
        this.vx *= f;
        this.vy *= f;

        this.ob = this.b;
        this.ol = this.l;
        this.or = this.r;
        this.ot = this.t;
        
        this.vy += g;

        this.l += this.vx;
        this.t += this.vy;
        this.r = this.l + this.w;
        this.b = this.t + this.h;
    }

    detectCollision(object) {
        
        // If there is no collision, return
        if(!detect(this, object)) return;

        if(this.r >= object.l && this.or < object.ol) {
            this.setRight(object.l - 0.1)
            this.vx = 0;
        }
        if(this.l <= object.r && this.ol > object.or) {
            this.setLeft(object.r + 0.1)
            this.vx = 0;
        }
        if(this.t <= object.b && this.ot > object.ob) {
            this.setTop(object.b + 0.1);
            // in a platformer game this cannot be set to 0, rather a negative number or a different velocity
            // (it will stick to the bottom of the platform)
            this.vy = 0;
        }
        if(this.b >= object.t && this.ob < object.ot) {
            this.setBottom(object.t - 0.01)
            this.vy = 0;
            // only when the player is on top of an object they can jump
            this.canJump = true;
        }
    }


    moveLeft() {
        this.vx -= 0.5;
    }
    moveRight() {
        this.vx += 0.5;
    }
    jump() {
        if(this.canJump) {
            this.vy =  -40;
            this.canJump = false;
        }
    }

    moveUp() {
        this.vy -= 0.5;
    }
    moveDown() {
        this.vy += 0.5;
    }
}