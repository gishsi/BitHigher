export default class Controller {
    constructor() {
        this.left = false
        this.right= false
        this.up= false
        this.down= false
        this.jump = false
        this.idle = true;
    }

    keyDown(e) {
        switch(e.code) {
            case 'ArrowLeft':
                this.left = true;
                this.idle = false;
                break;
            case 'ArrowRight':
                this.right = true;
                this.idle = false;
                break;
            case 'ArrowDown':
                this.down = true;
                this.idle = false;
                break;
            case 'ArrowUp':
                this.up = true;
                this.idle = false;
                break;
            case 'Space':
                this.jump = true;
                this.idle = false;
                break;
            default:
                break;
        }
    }
    keyUp(e) {
        switch(e.code) {
            case 'ArrowLeft':
                this.left = false;
                this.idle = true;
                break;
            case 'ArrowRight':
                this.right= false;
                this.idle = true;
                break;
            case 'ArrowDown':
                this.down = false;
                this.idle = true;
                break;
            case 'ArrowUp':
                this.up = false;
                this.idle = true;
                break;
            case 'Space':
                this.jump = false;
                this.idle = true;
                break;       
            default:
                break;
        }
    }
}