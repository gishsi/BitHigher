import Display from './Display.js';
import Game from './Game.js';
import Controller from './Controller.js';
window.onload = () => {
    let display = new Display(document.getElementById('canvas'));
    let game = new Game();
    let controller = new Controller();

   document.getElementById('canvas').width = game.world.width;
   document.getElementById('canvas').height = game.world.height;
    let frameCount = 0;
    let frameTimer = 0;
    let frameInterval = 5;
    let draw = () => {
        display.setBg('#79adb7');
        display.render();

        // flooring the values to get rid of blury lines
        
        display.drawAnimatedObject(game.player, frameCount);
        /*
            Timer for handling the animation of the object
        */
        if(frameTimer > frameInterval) {
            frameCount++;
            if(frameCount > 3) frameCount = 0;
            frameTimer = 0;
        }
        frameTimer++;
        
        display.drawRectangle(game.ground, 'grey');
        game.platforms.forEach(platform => display.drawStaticObject(platform))
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



