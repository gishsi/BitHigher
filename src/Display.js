export default class Display{
    constructor(canvas) {
        this.context = canvas.getContext('2d');
    }

    setBg(bg) {
        this.context.fillStyle = bg;
    }

    // destructurize the object that needs to be drawn
    drawRectangle({l, t, w, h}, color) {
        this.context.fillStyle = color;
        this.context.fillRect(Math.floor(l), Math.floor(t), Math.floor(w), Math.floor(h));
    }

    drawStaticObject({l,t,src}) {

        let image = new Image();
        image.src = src

        this.context.drawImage(image, l, t);
    }

    drawAnimatedObject({l, t, w, h, src}, frameCount) {

        let image = new Image();
        image.src = src;

        this.context.drawImage(image, w * frameCount, 0, Math.floor(w - 1), h, Math.floor(l), Math.floor(t),  Math.floor(w - 1), Math.floor(h));
    }

    render() {
        this.context.clearRect(0, 0, canvas.width, canvas.height);
        this.context.fillRect(0, 0, canvas.width, canvas.height);
    }
}