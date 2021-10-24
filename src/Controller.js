export default class Controller {
    constructor() {
        this.left = false
        this.right= false
        this.up= false
        this.down= false
        this.jump = false
    }

    keyDown(e) {
        switch(e.code) {
            case 'ArrowLeft':
                this.left = true;
                break;
            case 'ArrowRight':
                this.right = true;
                break;
            case 'ArrowDown':
                this.down = true;
                break;
            case 'ArrowUp':
                this.up = true;
                break;
            case 'Space':
                this.jump = true;
                break;
            default:
                break;
        }
    }
    keyUp(e) {
        switch(e.code) {
            case 'ArrowLeft':
                this.left = false;
                break;
            case 'ArrowRight':
                this.right= false;;
                break;
            case 'ArrowDown':
                this.down = false;
                break;
            case 'ArrowUp':
                this.up = false;
                break;
            case 'Space':
                this.jump = false;
                break;       
            default:
                break;
        }
    }
}