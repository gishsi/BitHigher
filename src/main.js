import Display from './Display.js';
import Game from './Game.js';
import Controller from './Controller.js';
window.onload = () => {
    let display = new Display(document.getElementById('canvas'));
    let game = new Game();
    let controller = new Controller();

   document.getElementById('canvas').width = game.world.width;
   document.getElementById('canvas').height = game.world.height;

    let draw = () => {
        display.setBg('#000');
        display.render();

        // flooring the values to get rid of blury lines
        display.drawRectangle(Math.floor(game.player.l), Math.floor(game.player.t), Math.floor(game.player.w), Math.floor(game.player.h), 'yellow');
        // needs to check if it still needs to draw the ground using the flag stored in the ground object
        display.drawRectangle(Math.floor(game.ground.l), Math.floor(game.ground.t), Math.floor(game.ground.w), Math.floor(game.ground.h), 'grey');
        
        game.platforms.forEach(platform => display.drawRectangle(platform.l, platform.t, platform.w, platform.h, 'red'))
    }


    let update = () => {
        if(controller.left) game.player.moveLeft();
        if(controller.right) game.player.moveRight();
        if(controller.up) game.player.moveUp();
        if(controller.down) game.player.moveDown();
        if(controller.jump) game.player.jump();

        game.update();
    }
    let previousTime, deltaTime, fps;
   let gameloop = (timestamp) => {
        deltaTime = timestamp - previousTime;
        previousTime = timestamp;

        fps = 1 / deltaTime;
       draw();
       update(deltaTime);
       requestAnimationFrame(gameloop);
   }
   gameloop();

   window.addEventListener('keydown', (e) => controller.keyDown(e))
   window.addEventListener('keyup', (e) => controller.keyUp(e))
}



