import Player from './Player.js';
import Platform from './Platform.js';
import Ground from './Ground.js';
export default class Game {
    constructor () {
        this.world= {
            width: 400,
            height: 200,
            friction: 0.9,
            gravity: 1.4,
            groundHeight: 20
        }
        this.player = new Player(0, 50, 32, 32, 'src/assets/images/peer-default.png');
        this.platforms = [new Platform(100, 20, 64, 16, 'src/assets/images/platform.png'), new Platform(200, 100, 128, 32,'src/assets/images/platform.png')]
        this.ground = new Ground(0, this.world.height - this.world.groundHeight, this.world.width, this.world.groundHeight);
    }
    update(deltaTime) {
        // update the moving ground
        if(this.ground.t - 1 < this.world.height) this.ground.update();
        // update player
        this.player.update(this.world.gravity, this.world.friction);
        // detect players collision with ground (enables jumping)
        this.player.detectCollision(this.ground);
        // each platform moves downward
        this.platforms.forEach(platform => {
            platform.update();
        })
        // detect collision for each platform
        this.platforms.forEach(platform => {
            this.player.detectCollision(platform);
        })
    }
}