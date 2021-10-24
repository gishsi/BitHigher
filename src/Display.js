export default class Display{
    constructor(canvas) {
        this.context = canvas.getContext('2d');
    }

    setBg(bg) {
        this.context.fillStyle = bg;
    }

    drawRectangle(l, t, w, h, color) {
        this.context.fillStyle = color;
        this.context.fillRect(l, t, w, h);
    }


    render() {
        this.context.clearRect(0, 0, canvas.width, canvas.height);
        this.context.fillRect(0, 0, canvas.width, canvas.height);
    }
}