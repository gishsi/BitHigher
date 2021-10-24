import Rectangle from "./Rectangle.js";
export default class Ground extends Rectangle{
    constructor(l, t, w, h) {
        super(l, t, w, h);
        this.isOffCanvas = false;
    }

    update() {
        // move the ground lower so that the player cannot stand on it
        this.ot = this.t;
        this.t += 0.05;
    }
}