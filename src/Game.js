import Player from './Player.js';
import Platform from './Platform.js';
import Ground from './Ground.js';
import Background from './Background.js';
export default class Game {
    constructor () {
        this.world= {
            l: 0,
            t: 0,
            src: 'src/assets/images/background.png',
            width: 128,
            height: 224,
            friction: 0.9,
            gravity: 1.4,
            groundHeight: 20
        }
        this.background = new Background(this.world);
        this.player = new Player(0, 50, 16, 16);
        this.platforms = [new Platform(32, 32, 64, 16), new Platform(0, 0, 64, 16), new Platform(40, -100, 64, 16), new Platform(0, -150, 64, 16)]
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