import GameObject from "./GameObject.js";
import Sprite from "./Sprite.js";

/**
 * This class is a model for all platforms in the game.
 * @author: Julia Drozdz
 */

export default class Platform extends GameObject {
  /**
   *
   * @l - left edge of the platform
   * @t - top edge of the platform
   * @w - width of the platform
   * @h - height of the platform
   * @spriteImage - sprite for the object (platform) loaded from the assets manager in the main.js file
   * @author: Julia Drozdz
   */
  constructor(l, t, w, h, spriteImage, velocity) {
    super(l, t, w, h);
    this.vy = velocity;
    this.sprite = new Sprite({
      image: spriteImage,
    });
    this.isOffCanvas = false;
  }
  /**
   * Update the previous postion of the platform and update the current one by the velocity
   * I left the l and vx variables for future possible chagnes/enhancements for the behaviour of the platforms
   * @author: Julia Drozdz
   */
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
