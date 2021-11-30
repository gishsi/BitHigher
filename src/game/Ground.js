import GameObject from "./GameObject.js";
import Sprite from "./Sprite.js";
/**
 * This class is a model for the ground object
 * @author: Julia Drozdz
 */

export default class Ground extends GameObject {
  /**
   *
   * @param l - left top y position
   * @param t - left top y position
   * @param w - width of the ground
   * @param h - height of the ground
   * @param spriteImage - sprite image of the ground
   * @author: Julia Drozdz
   */
  constructor(l, t, w, h, spriteImage) {
    super(l, t, w, h);
    this.isOffCanvas = false;
    this.sprite = new Sprite({
      image: spriteImage,
    });
  }
  /**
   * Make the ground move so that the player cannot stand on it
   *
   * @author: Julia Drozdz
   */
  update() {
    this.ot = this.t;
    this.t += 0.03;
  }
}
