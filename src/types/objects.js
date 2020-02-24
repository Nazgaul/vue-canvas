
class BaseCanvasElement {
    constructor(type, version) {
        this.type = type;
        this.version = version || 0;
    }
    isInShape({ x, y }) {
        return false;
    }
}
class Rectangle extends BaseCanvasElement {

    constructor() {
        super("rectangleCanvas", 0);
    }
    create(now, prev, color, version, isDummy) {
        let rectange = new Rectangle();
        rectange.x = prev.x || 0;
        rectange.y = prev.y || 0;
        rectange.width = now.x - prev.x || 0;
        rectange.height = now.y - prev.y || 0;
        rectange.color = color;
        rectange.version = version;
        rectange.isDummy = isDummy;
        return rectange;
    }

    isInShape({ x, y }) {
        if (x < this.x) {
            return false;
        }
        if (y < this.y) {
            this.false;
        }
        if (this.x + this.width > x && this.y + this.height > y) {
            return true;
        }
        return false;
    }
}

class Eraser extends BaseCanvasElement {
    constructor() {
        super("eraserCanvas", 0);
    }
    create(now, prev, color, version, isDummy) {
        let eraser = new Eraser();
        eraser.x = prev.x || 0;
        eraser.y = prev.y || 0;
        eraser.width = now.x - prev.x || 0;
        eraser.height = now.y - prev.y || 0;
        eraser.version = version;
        eraser.isDummy = isDummy;
        return eraser;
    }
    isInShape({ x, y }) {
        return false;
    }
}

class Circle extends BaseCanvasElement {
    constructor() {
        super("circleCanvas", 0);
    }

    create(now, prev, color, version, isDummy) {
        let circle = new Circle();
        circle.x = prev.x || 0;
        circle.y = prev.y || 0;
        var nDeltaX = now.x - prev.x;
        var nDeltaY = now.y - prev.y;
        circle.radius = Math.sqrt(nDeltaX * nDeltaY);
        circle.color = color;
        circle.lineWidth = 4;
        circle.version = version;
        circle.isDummy = isDummy;
        return circle;
    }
    isInShape({ x, y }) {
        return false;
    }
}

class Line extends BaseCanvasElement {
    constructor(version) {
        super('lineCanvas', version);
    }
    create(now, prev, color, version,  isDummy) {
        let line = new Line();
        line.x = prev.x || 0;
        line.y = prev.y || 0;
        line.toX = now.x;
        line.toY = now.y;
        line.color = color;
        line.lineWidth = 4;
        line.version = version;
        line.isDummy = isDummy;
        return line;
    }

    isInShape({ x, y }) {
        return false;
    }
}

class Clear extends BaseCanvasElement {
    constructor(version) {
        super('clearCanvas', version);
        //this.version = version;
        //this.type = 'clear';
    }
    isInShape({ x, y }) {
        return false;
    }
}


export default {
    Rectangle,
    Clear,
    Circle,
    Line,
    Eraser
}