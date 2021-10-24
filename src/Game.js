import Player from './Player.js';
import Platform from './Platform.js';
import Ground from './Ground.js';
export default class Game {
    constructor () {
        this.world= {
            width: 480,
            height: 500,
            friction: 0.9,
            gravity: 1.4,
            groundHeight: 20
        }
        this.player = new Player(0, 50, 40, 40);
        this.platforms = [new Platform(100, 250, 128, 32), new Platform(200, 330, 128, 32)]
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