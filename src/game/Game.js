import Player from "./Player.js";
import Platform from "./Platform.js";
import Ground from "./Ground.js";
import Background from "./Background.js";
/**
 * The main Game class which holds information about the world, controls the update method.
 * It also instantiates and controls all the game objects and updates of score.
 *
 * @author: Julia Drozdz
 */
export default class Game {
  /**
   * Constructor for the Game class: world object holds information about the world (dimensions, physics, etc.)
   * @param params - an object which holds user's preferences: images that the user loaded (see AssetsManager)
   * and the difficulty
   *
   * @author: Julia Drozdz
   */
  constructor(params) {
    // user parameters
    this.images = params.images;
    this.difficulty = params.difficulty;
    this.world = {
      l: 0,
      t: 0,
      width: 128,
      height: 224,
      friction: 0.8,
      gravity: 1,
      groundHeight: 32,
      backgroundImage: this.images.get("background"),
    };

    this.background = new Background(this.world);

    this.player = new Player(0, 50, 16, 16, this.images.get(`player`));
    this.platforms = [];
    this.platformTimer = 0;
    this.platformInterval = 100;
    this.platformVelocity = 0.5;

    this.backgroundTimer = 0;
    this.backgroundInterval = 1;

    this.score = 0;
    this.scoreAmount = 50;
    this.scoreTimer = 0;
    this.scoreInterval = 500;

    this.ground = new Ground(
      -20,
      this.world.height - this.world.groundHeight,
      160,
      32,
      this.images.get("ground")
    );
  }
  /**
   *  Changes the speed of the platforms to make it harder for the player to keep up
   * @difficulty the difficulty of the game
   * @returns a velocity for the platform
   * @author: Julia Drozdz
   */
  configurePlatforms(difficulty) {
    if (difficulty === "hard") {
      this.platformInterval = 50;
      this.scoreAmount = 150;
      this.platformVelocity = 0.85;
      return;
    }
    if (difficulty === "medium") {
      this.platformInterval = 75;
      this.platformVelocity = 0.7;
      this.scoreAmount = 100;
      return;
    }
  }

  /**
   * Animate the background (simulates the paralax scrolling effect)
   *
   * @author: Julia Drozdz
   */
  moveBackground() {
    if (this.backgroundTimer > this.backgroundInterval) {
      this.background.update();
      this.backgroundTimer = 0;
    } else {
      this.backgroundTimer++;
    }
  }

  /**
   * Creates a new platform every time the platform timer reaches 100 and pushes that new platform to the platforms array
   *
   * @author: Julia Drozdz
   */
  addPlatform() {
    if (this.platformTimer > this.platformInterval) {
      this.platforms.push(
        new Platform(
          Math.random() * (this.world.width - 32),
          -8,
          32,
          8,
          this.images.get("platform"),
          this.platformVelocity
        )
      );
      this.platformTimer = 0;
    } else {
      this.platformTimer++;
    }
  }
  /**
   * Get rid of platforms when they go beyond the canvas
   *
   * @author: Julia Drozdz
   */
  filterPlatforms() {
    this.platforms = this.platforms.filter((platform) => !platform.isOffCanvas);
  }

  /**
   * When the ground moves out of the canvas, delete the object.
   *
   * @author: Julia Drozdz
   */
  removeGround() {
    if (this.ground.t > this.world.height) {
      this.ground.isOffCanvas = true;
      delete this.ground;
    }
  }

  /**
   *  This function updates all the game objects and handles collision detection
   *
   * @author: Julia Drozdz
   */
  update() {
    // Configure the plaforms (speed, interval)
    this.configurePlatforms(this.difficulty);
    this.updateScore();
    this.ground !== undefined && this.removeGround();
    this.ground === undefined && this.moveBackground();
    this.filterPlatforms();
    this.addPlatform();
    // update the ground
    this.ground !== undefined && this.ground.update();

    // update player
    this.player.update(this.world.gravity, this.world.friction);
    // detect players collision with ground (enables jumping)
    this.ground !== undefined && this.player.detectCollision(this.ground);
    // each platform moves downward
    this.platforms.forEach((platform) => {
      // Is the platform out of the canvas
      if (platform.t > this.world.height) {
        platform.isOffCanvas = true;
      }
      // update the platform
      platform.update();
      // detect collision for each platform
      this.player.detectCollision(platform);
    });

    // Helper function to see if the player is out of the canvas (left or right side)
    this.correctPlayerPosition();
  }
  /**
   * Helper function for moving the player to the other side of the canvas when they
   * cross the borders of the canvas horizontally
   *
   * @author: Julia Drozdz
   */
  correctPlayerPosition() {
    if (this.player.r < 0) {
      this.player.l = this.world.width;
    }
    if (this.player.l > this.world.width) {
      // because I am calculating player.r based on its l and width values I cannot set player.r directly
      // Instead, I am setting player.l - player.width, so that values inside player.update() can be
      // set correctly
      this.player.l = -this.player.w;
    }
  }
  /**
   * Helper function that checks if the player has lost.
   * @returns true if the player is off the canvas (bottom), false otherwise
   *
   * @author: Julia Drozdz
   */
  hasPlayerFallen() {
    if (this.player.t > this.world.height) return true;
    return false;
  }
  /**
   * Update the score evertime scoreTimer reaches 500
   *
   * @author: Julia Drozdz
   */
  updateScore() {
    if (this.scoreTimer > this.scoreInterval) {
      this.score += this.scoreAmount;
      this.scoreTimer = 0;
    } else {
      this.scoreTimer++;
    }
  }
}
