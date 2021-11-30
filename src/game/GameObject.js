import Sprite from "./Sprite.js";
/**
 *  This is a model class for all game objects.
 *
 * @author: Julia Drozdz
 */
export default class GameObject {
  /**
   * Constructor for the GameObject class
   * @l - left edge of the object
   * @t - right edge of the object
   * @w - width of the object
   * @h - height of the object
   * @spriteImage - image of the object
   */
  constructor(l, t, w, h, spriteImage) {
    this.l = this.ol = l;
    this.r = this.or = l + w;
    this.t = this.ot = t;
    this.b = this.ob = t + h;
    this.vx = this.vy = 0;
    this.w = w;
    this.h = h;
    this.sprite = new Sprite({
      image: spriteImage,
    });
  }
  /**
   * Set the new bottom of the object, update the top
   * @b - bottom edge of the object
   */
  setBottom(b) {
    this.b = b;
    this.t = b - this.h;
  }
  /**
   * Set the new bottom of the object, update the top
   * @l - left edge of the object
   */
  setLeft(l) {
    this.l = l;
    this.r = l + this.w;
  }
  /**
   * Set the right edge of the object, update the left
   * @r - right edge of the object
   */
  setRight(r) {
    this.r = r;
    this.l = r - this.w;
  }
  /**
   *  Set the top edge of the object, update the bottom
   * @t - top edge of the object
   */
  setTop(t) {
    this.t = t;
    this.b = t + this.h;
  }
}
