/**
 *  This class is a manager class for all the images and sounds.
 * @author: Julia Drozdz
 */
export default class AssetsManager {
  /**
   * Constructor for the AssetsManager class that holds all the assests for the game (music, sounds, images)
   * @config user's preferences (eg. hero image)
   * @author: Julia Drozdz
   */
  constructor(config) {
    this.images = [
      "src/game/assets/images/bg-01.png",
      "src/game/assets/images/platform-01.png",
      "src/game/assets/images/ground.png",
      `src/game/assets/images/player-${config.playerSprite}.png`,
      "src/game/assets/images/gameover.png",
    ];
    this.loadedImages = new Map();
    this.music = new Audio();
    this.soundsSrc = ["src/game/assets/sound/Jump3.mp3"];
    this.sounds = new Map();
  }
  /**
   *  This function loads the images (for sprites)
   * @author: Julia Drozdz
   */
  loadImages() {
    this.images.forEach((src) => {
      let image = new Image();
      image.src = src;
      image.onload = () => {
        this.loadedImages.set(this.chooseKey(src), image);
      };
    });
  }
  /**
   *  This function loads the sound assets
   * @author: Julia Drozdz
   */
  loadSounds() {
    this.soundsSrc.forEach((src) => {
      let sound = new Audio(src);
      sound.loop = false;
      this.sounds.set(src, sound);
    });
  }
  /**
   *  This function loads the music assets
   * @author: Julia Drozdz
   */
  loadMusic() {
    let audio = new Audio();
    audio.src = "./src/game/assets/sound/alltimehighjump.mp3";
    audio.loop = true;
    audio.autoplay = false;
    audio.volume = 0.2;
    this.music = audio;
  }
  /**
   *  Load all the assets for the game
   *
   * @author: Julia Drozdz
   */
  load() {
    this.loadImages();
    this.loadSounds();
    this.loadMusic();
  }
  /**
   * This is a helper function that maps a whole source of an image to a shorthand.
   * It makes accessing values and changin the src in the images a lot easier when getting values from the map in the project.
   * Previously when changin a src in the images array, I had to go and find each images.get() accross the whole project.
   * (like setting the background image in the Game class)
   * Example: src/assets/images/bg-01.png -> the key will be "background"
   *
   * @src - source of an image from the images array
   * @returns key for the map
   */
  chooseKey(src) {
    let key = "";
    if (/player/.test(src)) key = "player";
    if (/bg/.test(src)) key = "background";
    if (/platform/.test(src)) key = "platform";
    if (/ground/.test(src)) key = "ground";
    if (/gameover/.test(src)) key = "gameover";

    return key;
  }
}
