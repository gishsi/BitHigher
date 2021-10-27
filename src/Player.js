import GameObject from "./GameObject.js";
import {detect} from './Overlap.js'
import Sprite from './Sprite.js';
export default class Player extends GameObject {
    constructor(l, t, w, h) {
        super(l, t, w, h);
        this.canJump = false;
        this.sprite =  new Sprite({
            gameObject: this,
            src:"src/assets/images/player.png",
            animations:{
                "idle-right": [0],
                "move-right": [1, 2, 3, 4],
                "idle-left": [5],
                "move-left": [6, 7, 8, 9],
                "jump-right": [10, 11, 12, 13],
                "jump-left": [14, 15, 16, 17],
              },
            currentAnimation: "move-left",
            frameInterval: 2
        });
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
        this.sprite.setAnimation('move-left');
    }
    moveRight() {
        this.vx += 0.5;
        this.sprite.setAnimation('move-right');
    }
    jump() {
        if(this.canJump) {
            this.vy =  -20;
            this.canJump = false;
            if(this.vx < 0) this.sprite.setAnimation('jump-left')
            if(this.vx > 0) this.sprite.setAnimation('jump-right')
        }
    }
    moveUp() {
        this.vy -= 0.5;
    }
    moveDown() {
        this.vy += 0.5;
    }
    setIdleAnimation() {
        if(this.vx < 0) this.sprite.setAnimation('idle-left');
        if(this.vx >= 0) this.sprite.setAnimation('idle-right');
    }
}