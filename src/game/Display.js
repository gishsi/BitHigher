/**
 * This class functionality is to draw to the canvas
 * @author: Julia Drozdz
 */
export default class Display {
  /**
   * Constructor for the Display class
   * @param canvas - the canvas element
   * @author: Julia Drozdz
   */
  constructor(canvas) {
    this.context = canvas.getContext("2d");
  }
  /**
   * Sets the background
   * @param bgColor - the color of the backgorund
   * @author: Julia Drozdz
   */
  setBg(bgColor) {
    this.context.fillStyle = bgColor;
  }
  /**
   * Draws an unanimted object (like a platform) to the canvas.
   * This function uses ES6 destructuring to get the l, t, sprite parameters for the drawImage function
   * @param - object we want to draw is passed as
   * a parameter to this function and then it is being destructurized (personal preference)
   * @author: Julia Drozdz
   */
  drawStaticObject({ l, t, sprite }) {
    this.context.drawImage(sprite.image, Math.floor(l), Math.floor(t));
  }
  /**
   * Draws an unanimted object (like a platform) to the canvas.
   * This function uses ES6 destructuring to get the parameters for the drawImage function
   * @param - object we want to draw is passed as
   * a parameter to this function and then it is being destructurized (personal preference)
   * @author: Julia Drozdz
   */
  drawAnimatedObject({ l, t, w, h, sprite }) {
    // destructuring from the sprite object
    let { image, frame } = sprite;

    // Draw the current cut from the image
    this.context.drawImage(
      image,
      w * frame,
      0,
      Math.floor(w),
      Math.floor(h),
      Math.floor(l),
      Math.floor(t),
      Math.floor(w),
      Math.floor(h)
    );
    // update the animation (get next frame)
    sprite.updateAnimationProgress();
  }
  /**
   * The background is a special case for animation
   * This function uses ES6 destructuring to get the parameters for the drawImage function
   * @param - object we want to draw is passed as
   * a parameter to this function and then it is being destructurized (personal preference)
   * @author: Julia Drozdz
   */
  drawBackground({ l, t, w, h, sprite, backgroundHeight }) {
    this.context.drawImage(
      sprite.image,
      0,
      Math.floor(backgroundHeight),
      Math.floor(w),
      Math.floor(h),
      Math.floor(l),
      Math.floor(t),
      Math.floor(w),
      Math.floor(h)
    );
  }
  /**
   *  Clears the background and fills it with the bgColor previously set in setBg
   * @author: Julia Drozdz
   */
  clear() {
    this.context.clearRect(0, 0, canvas.width, canvas.height);
    this.context.fillRect(0, 0, canvas.width, canvas.height);
  }
}
