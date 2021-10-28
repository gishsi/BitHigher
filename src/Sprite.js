export default class Sprite {
  constructor(config) {
    // Set up the image
    this.image = new Image();
    this.image.src = config.src || "src/assets/images/default.png";
    // Not drawing before the image is loaded
    this.image.onload = () => {
      this.isLoaded = true;
    };

    // Configuring animation
    this.animations = config.animations;
    this.currentAnimation = config.currentAnimation;
    this.currentAnimationFrame = 0;

    this.frameInterval = config.frameInterval || 10;
    this.frameTimer = 0;

    // Game object
    // this.gameObject = config.gameObject;
  }

  get frame() {
    return this.animations[this.currentAnimation][this.currentAnimationFrame];
  }

  updateAnimationProgress() {
    if (this.frameTimer > this.frameInterval) {
      this.currentAnimationFrame++;
        if(this.frame === undefined) {
            this.currentAnimationFrame = 0;
        }
      this.frameTimer = 0;
    }
    this.frameTimer++;
  }
  setAnimation(key) {
    if(this.currentAnimation !== key) {
      this.currentAnimation = key;
      this.currentAnimationFrame = 0;
      this.frameTimer = 0;
    }
  }
}
