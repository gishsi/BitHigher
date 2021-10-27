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
        display.setBg('#1d0f23');   
        display.render();

        // BACKGROUND
        // display.drawBackground(game.background);

        display.drawRectangle(0, 0, game.world.width, game.world.height,'#1d0f23' );

        display.drawAnimatedObject(game.player)
        display.drawStaticObject(game.ground);

        // PLATFORMS
        game.platforms.forEach(platform => display.drawStaticObject(platform))
    }


    let update = () => {
        if(controller.idle) game.player.setIdleAnimation();

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



