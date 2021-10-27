export default class Display{
    constructor(canvas) {
        this.context = canvas.getContext('2d');
    }

    setBg(bg) {
        this.context.fillStyle = bg;
    }

    // destructurize the object that needs to be drawn
    drawRectangle({l, t, w, h, color}) {
        this.context.beginPath();
        this.context.fillStyle = color;     
        this.context.fillRect(Math.floor(l), Math.floor(t), Math.floor(w), Math.floor(h));
        this.context.closePath();
    }

    drawStaticObject({l,t, sprite}) {
        let {image} = sprite;
        this.context.drawImage(image, Math.floor(l), Math.floor(t));
    }

    drawAnimatedObject({l, t, w, h, sprite}) {
        let {image, frame} = sprite;

        this.context.drawImage(image, w * frame, 0, 
            Math.floor(w), Math.floor(h), 
            Math.floor(l), Math.floor(t),  
            Math.floor(w), Math.floor(h));

        sprite.updateAnimationProgress();
    }


    drawBackground({l, t, w, h, sprite, backgroundHeight}) {
        let {image} = sprite;

        this.context.drawImage(
            image, 
            0, backgroundHeight, 
            Math.floor(w), 
            Math.floor(h), Math.floor(l), Math.floor(t),  
            Math.floor(w), Math.floor(h));
    }

    render() {
        this.context.clearRect(0, 0, canvas.width, canvas.height);
        this.context.fillRect(0, 0, canvas.width, canvas.height);
    }
}