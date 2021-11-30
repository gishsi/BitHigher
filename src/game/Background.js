import Sprite from "./Sprite.js";

/**
 * This is a model for the background of our game. In order to have an animated background,
 * an object is necessary for the Display class to animate it.
 * @author: Julia Drozdz
 */
export default class Background {
  /**
   *
   * @param  world - object world from the game class which holds all the parameters
   * for the world environemt of the game such as: width, height, background image
   * @author: Julia Drozdz
   */
  constructor(world) {
    this.l = world.l;
    this.t = world.t;
    this.w = world.width;
    this.h = world.height;

    this.sprite = new Sprite({
      gameObject: this,
      image: world.backgroundImage,
    });
    // Background height is the overall height of the loaded sprite image
    // this.h is the part that the user sees
    this.backgroundHeight = this.sprite.image.height - this.h;
  }
  /**
   * This function updates the background height for the scrolling animation
   * @author: Julia Drozdz
   */
  update() {
    this.backgroundHeight -= 1.1;
  }
}
