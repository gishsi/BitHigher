import Display from "./Display.js";
import Game from "./Game.js";
import Controller from "./Controller.js";
import AssetsManager from "./AssetsManager.js";

/**
 * This is the main file for the BitHigher game. It contains listeners for changes,
 * game setup functions and provides the gameloop functionality.
 *
 * It is highely modular and provides a way for all the classes to communicate.
 *
 * @author: Julia Drozdz
 */

/** Variables this file uses
 * @userPreferences user prefences for the game
 * @GAMESTATES states in the game
 * @gamestate - current gamestate
 * @display - object of class Display, instantiated in the init() function, responsible for drawing to the canvas
 * @game - object of class Game, instantiated in the init() function, responsible for handling game objects
 * @controller - object of class Controller, instantiated in the init() function, responsible for  player control
 * @previous - time of the previous frame (gameloop)
 * @delaTime - the time that has passed since the previous and the current frame
 * @MS_PER_SECOND - how many frames per seconds, used for update()
 * @assetsManager - object of class AssetManager, instantiated in the init() function, responsible for drawing to the canvas
 */
let userPreferences;
const GAMESTATES = {
  RUNNING: 0,
  MENU: 1,
  GAMEOVER: 2,
};
let gamestate = GAMESTATES.MENU;
let display, game, controller;
let previous = 0;
let deltaTime = 0;
let lag = 0;
const MS_PER_SECOND = 1000 / 60;
let assetsManager;
/**
 * This function is responsible for toggling the music on and off
 * @author: Julia Drozdz
 */
const toggleMusic = () => {
  if (!assetsManager.music.muted) {
    assetsManager.music.muted = true;
    assetsManager.music.pause();
  } else {
    assetsManager.music.muted = false;
    assetsManager.music.play();
  }
};
/**
 * This function is responsible for toggling all the sounds on and off
 * @author: Julia Drozdz
 */
const toggleSound = () => {
  assetsManager.sounds.forEach((sound) => {
    if (!sound.muted) {
      sound.muted = true;
    } else {
      sound.muted = false;
    }
  });
};

// Event listeners for toggling the music
document.getElementById("toggleMusic").addEventListener("click", toggleMusic);
document.getElementById("toggleSound").addEventListener("click", toggleSound);
/**
 * If the user set a new highest score this function will store it to the database after refreshing the page
 * This does mean that if the user sets a new record and doesn't press G, the new score will not save.
 *
 * @author: Julia Drozdz
 */
const handleGameOver = async (e) => {
  if (e.code === "KeyG" && gamestate === GAMESTATES.GAMEOVER) {
    let data = await fetchUser(
      "https://users.aber.ac.uk/jud28/CS25320/coursework/1bitHigher/api/readUser.php"
    );
    if (data.score < game.score) {
      updateUser(
        "hhttps://users.aber.ac.uk/jud28/CS25320/coursework/1bitHigher/api/updateScore.php",
        {
          username: window.localStorage.getItem("username"),
          score: game.score,
        }
      );
    }
    window.location.reload();
  }
};

//  Event listener for the "g" button press after losing
window.addEventListener("keydown", handleGameOver);
/* =============== Starting the game =================== */
/**
 * Initialize all the objects, reset variables, set the canvas width to variables defined in the Game class
 * @author: Julia Drozdz
 */
const init = () => {
  // Initialization of all the game components
  display = new Display(document.getElementById("canvas"));
  game = new Game({
    images: assetsManager.loadedImages,
    difficulty: userPreferences.difficulty,
  });
  controller = new Controller();
  previous = 0;
  deltaTime = 0;
  lag = 0;
  document.getElementById("canvas").width = game.world.width;
  document.getElementById("canvas").height = game.world.height;
};
/**
 * Calling gameloop will start the actuall game, music will be played and there are listener on the window for player control
 * Passing 0 to the gameloop will make sure that there are no undefined variables on the first loop of the game
 * @author: Julia Drozdz
 */
const start = () => {
  // Start the game
  gameloop(0);
  window.addEventListener("keydown", (e) => controller.keyDown(e));
  window.addEventListener("keyup", (e) => controller.keyUp(e));
};
/**
 * This function uses the requestAnimationFrame and handles the posibility of different refresh rates with the nested while loop
 * This is an alternative approach to using deltaTime as a multiplicator for velocity changes (like the ones we see in player)
 * This aproach is explained in detail in the Game Programming Patterns book (see references)
 *
 * @timestamp - current time which comes as a callback argument from requestAnimationFrame(equivalent of performane.now())
 * @author: Julia Drozdz
 */
const gameloop = (timestamp) => {
  deltaTime = timestamp - previous;
  previous = timestamp;
  lag += deltaTime;

  while (lag > MS_PER_SECOND) {
    update();
    lag -= MS_PER_SECOND;
  }
  draw();
  requestAnimationFrame(gameloop);
};
/**
 * This function uses the display and the game objects to draw the appopriate objects / images for each state
 *
 * @author: Julia Drozdz
 */
const draw = () => {
  display.setBg("#000");
  display.clear();

  switch (gamestate) {
    case GAMESTATES.RUNNING:
      display.drawBackground(game.background);
      display.drawAnimatedObject(game.player);
      game.ground !== undefined && display.drawStaticObject(game.ground);
      game.platforms.forEach((platform) => display.drawStaticObject(platform));
      break;
    case GAMESTATES.GAMEOVER:
      // Draw the game over screen
      display.drawStaticObject({
        l: 0,
        t: 96,
        sprite: {
          image: assetsManager.loadedImages.get("gameover"),
        },
      });
      break;
  }
};
/**
 *  Update method for the gameloop which updates the game, score and tracks whether the player has fallen or not.
 *
 * @author: Julia Drozdz
 */
const update = () => {
  if (gamestate === GAMESTATES.RUNNING) updateGame();
  else return;
  // Gamover
  if (game.hasPlayerFallen()) gamestate = GAMESTATES.GAMEOVER;
  document.getElementById("score").innerText = `Score: ${game.score}`;
};
/**
 * This function updates the game and is used for the running gamestate. It is a helper function for the update method
 *
 * @author: Julia Drozdz
 */
const updateGame = () => {
  if (controller.idle) game.player.setIdleAnimation();
  if (controller.left) game.player.moveLeft();
  if (controller.right) game.player.moveRight();
  if (controller.jump) {
    game.player.jump();
    if (!assetsManager.sounds.get("src/game/assets/sound/Jump3.mp3").muted)
      assetsManager.sounds.get("src/game/assets/sound/Jump3.mp3").play();
  }
  game.update();
};
/**
 * Start the game
 *
 * @author: Julia Drozdz
 */
const startGame = () => {
  assetsManager.music.play();
  gamestate = GAMESTATES.RUNNING;
  init();
  start();
  document.getElementById("play").disabled = true;
};
/**
 * Load the data from the dataabse, set the user preferences and load the assets
 *
 * @author: Julia Drozdz
 */
const load = async () => {
  let data = await fetchUser(
    "https://users.aber.ac.uk/jud28/CS25320/coursework/1bitHigher/api/readUser.php"
  );
  document.getElementById("name").innerText = data.name;
  userPreferences = {
    playerSprite: data.hero,
    difficulty: data.difficulty,
  };
  assetsManager = new AssetsManager(userPreferences);
  assetsManager.load();
  // Listen for the press on the button play but only after all assets have been loaded
  document.getElementById("play").addEventListener("click", startGame);
};

// Only load the data after all DOM from the html file has been loaded
document.addEventListener("DOMContentLoaded", load);
