/**
 * This class is used as a controller for the player movement.
 *
 * @author: Julia Drozdz
 */

export default class Controller {
  /**
   *  These values indicate whether player has pressed a button or not
   */
  constructor() {
    this.left = false;
    this.right = false;
    this.jump = false;
    this.idle = true;
  }
  /**
   * This function detects user press
   * @param  e - event object
   * @author: Julia Drozdz
   */
  keyDown(e) {
    switch (e.code) {
      case "ArrowLeft":
        this.left = true;
        this.idle = false;
        break;
      case "ArrowRight":
        this.right = true;
        this.idle = false;
        break;
      case "Space":
        this.jump = true;
        this.idle = false;
        break;
      default:
        break;
    }
  }
  /**
   * This function detects the event of not pressing the button anymore,
   * so that the keyDown event is stopped and values are reset
   * @param  e - event object
   * @author: Julia Drozdz
   */
  keyUp(e) {
    switch (e.code) {
      case "ArrowLeft":
        this.left = false;
        this.idle = true;
        break;
      case "ArrowRight":
        this.right = false;
        this.idle = true;
        break;
      case "Space":
        this.jump = false;
        this.idle = true;
        break;
      default:
        break;
    }
  }
}
