import GameObject from "./GameObject.js";
import { detect } from "./Overlap.js";
import Sprite from "./Sprite.js";
/**
 *  This class is a representaion of the Player. The update method updates the position.
 *  Collision detection uses the concept of "Tunneling" as described in Poth's on Programming video
 *  https://www.youtube.com/watch?v=VpSWuywFlC8
 *
 *  @author: Julia Drozdz
 */
export default class Player extends GameObject {
  /**
   *
   * @l - left edge of the player
   * @t - top edge of the player
   * @w - width of the player
   * @h - height of the player
   * @spriteImage - sprite of the player
   */
  constructor(l, t, w, h, spriteImage) {
    super(l, t, w, h);
    this.canJump = false;
    // animations: the animations object holds key/value pairs for each animation.
    // Each index for the array of each key represetns 1 frame of the animation
    this.sprite = new Sprite({
      image: spriteImage,
      animations: {
        "idle-left": [0, 1, 2, 3],
        "idle-right": [4, 5, 6, 7],
        "move-left": [8, 9, 10, 11],
        "move-right": [12, 13, 14, 15],
        "jump-left": [16, 17, 18, 19],
        "jump-right": [20, 21, 22, 23],
      },
      currentAnimation: "move-left",
      frameInterval: 2,
    });
  }
  /**
   * Update the players position (as well as the old positions for tunneling)
   * @g - gravity
   * @f - friction
   */
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

  /**
   * Collision detection that is based on the idea of Tunneling as described in the Poth's on Programming video,
   * where I got the idea and most of the code from.
   *
   * With basic collision detection I was unable to update the player's position when they jumped on the platform.
   * It was impossible to determine from which side of the platform the player has hit the platform from,
   * so I have used an alternative approach for collision detection using tunneling. It checks the old position and then
   * compares them against the current one to determine the direction from which the player has hit the platform.
   *
   * @object - object to detect collison against
   * @returns if there was no collision, the function returns (detect is the helper function from Overlap.js)
   */
  detectCollision(object) {
    // If there is no overlap, return
    if (!detect(this, object)) return;

    if (this.r >= object.l && this.or < object.ol) {
      this.setRight(object.l - 0.1);
      this.vx = 0;
    }
    if (this.l <= object.r && this.ol > object.or) {
      this.setLeft(object.r + 0.1);
      this.vx = 0;
    }
    if (this.t <= object.b && this.ot > object.ob) {
      this.setTop(object.b + 0.1);
      // in a platformer game this cannot be set to 0, rather a negative number or a different velocity
      // (it will stick to the bottom of the platform)
      this.vy = 0;
    }
    if (this.b >= object.t && this.ob < object.ot) {
      this.setBottom(object.t - 0.01);
      this.vy = 0;
      // only when the player is on top of an object they can jump
      this.canJump = true;
    }
  }
  /**
   *  Move the player left and set the animation with the correct key
   * @author: Julia Drozdz
   */
  moveLeft() {
    this.vx -= 0.5;
    this.sprite.setAnimation("move-left");
  }
  /**
   *  Move the player right and set the animation with the correct key
   * @author: Julia Drozdz
   */
  moveRight() {
    this.vx += 0.5;
    this.sprite.setAnimation("move-right");
  }
  /**
   * Make the player jump. This functionality needed an additional
   * boolean value to determine for the player to be able to jump only when they are stading
   * @author: Julia Drozdz
   */
  jump() {
    if (this.canJump) {
      this.vy = -25;
      this.canJump = false;
      if (this.vx < 0) this.sprite.setAnimation("jump-left");
      if (this.vx > 0) this.sprite.setAnimation("jump-right");
    }
  }
  /**
   * Idle animation for the player that is fired whenever there is no input from the user
   *
   * @author: Julia Drozdz
   */
  setIdleAnimation() {
    if (this.vx < 0) this.sprite.setAnimation("idle-left");
    if (this.vx >= 0) this.sprite.setAnimation("idle-right");
  }
}
