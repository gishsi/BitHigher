/**
 * This class supports animation for all sprites (images for game objects)
 * It also provides functionality for the drawAnimatedObject method in the Display class for displaying animations.
 *
 * Most of this code belongs to Drew Conley, shown in the Pizza RPG Javascript Youtube tutorial (see references).
 * I have only changed it in places to fit the needs of my projects.
 */
export default class Sprite {
  /**
   * Constructor for the sprite object that is highly flexible. It can have custom animations, images (sprites) and intervals.
   * @config - custom configuration (settings) for a sprite
   */
  constructor(config) {
    this.image = config.image;
    // Configuring animation
    this.animations = config.animations || {};
    this.currentAnimation = config.currentAnimation || "";
    this.currentAnimationFrame = 0;
    this.frameInterval = config.frameInterval || 10;
    this.frameTimer = 0;
  }
  /**
   * Getter for the frame method
   * Accesses the animations object by the key (which is set in setAnimations)
   * and then gets the right frame for that animation (see player class)
   * @author Drew Conley
   */
  get frame() {
    return this.animations[this.currentAnimation][this.currentAnimationFrame];
  }

  /**
   *  For each animation there are 4 frames, this function goes through the frames from the beginning to the end,
   *  then loops to the beginning
   *
   *  The original updateAnimationProgress function can be seen in the Draw Conley's tutorial.
   * I have adapted it for this project
   */
  updateAnimationProgress() {
    if (this.frameTimer > this.frameInterval) {
      this.currentAnimationFrame++;
      // Loop to the beginning again
      if (this.frame === undefined) {
        this.currentAnimationFrame = 0;
      }
      this.frameTimer = 0;
    }
    this.frameTimer++;
  }
  /**
   * Set the correct animation for an action
   * example: idle-right when player is moving right
   * @key - the name of the animation
   * @author Drew Conley
   */
  setAnimation(key) {
    if (this.currentAnimation !== key) {
      this.currentAnimation = key;
      this.currentAnimationFrame = 0;
      this.frameTimer = 0;
    }
  }
}
