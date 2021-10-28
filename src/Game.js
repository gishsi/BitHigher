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
        this.platforms = [];
        this.platformTimer = 0;
        this.platformInterval = 100;

        this.ground = new Ground(0, this.world.height - this.world.groundHeight, this.world.width, this.world.groundHeight);
    }

    // consider a platform manager: or an object manager
    // a class that will manage all update timings and adding objects to arrays
    // would also be beneficial for Ground for example
    addPlatform(){
        if(this.platformTimer > this.platformInterval) {
            this.platforms.push(new Platform(Math.random() * this.world.width, -8, 32, 8))
            this.platformTimer = 0;
        } else {
            this.platformTimer++;
        }
    }

    update() {
        this.addPlatform();
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