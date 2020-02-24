class BaseCanvasElement {
    constructor(type,version) {
        this.type = type;
        this.version = version || 0;
    }
    isInShape({x,y}) {
        return false;
    }
}
class Rectangle extends BaseCanvasElement {
    
    constructor() {
        super("rectangleCanvas",0);
    }
    create(now,prev, color, version) {
        let rectange =  new Rectangle();
        rectange.x = prev.x || 0;
        rectange.y = prev.y || 0;
        rectange.width = now.x-prev.x || 0;
        rectange.height = now.y-prev.y || 0;
        rectange.color = `rgb(${color.red},${color.green},${color.blue})` || '#F00';
        rectange.lineWidth = 4;
        rectange.version = version;
        return rectange;
    }

    isInShape({x,y}) {
        if (this.x < x) {
            return false;
        }
        if (this.y < y) {
            this.false;
        }
        if (this.x + this.width > x && this.y + this.height > y) {
            return true;
        }
        return false;
    }
}

class Circle extends BaseCanvasElement {
    constructor() {
        super("circleCanvas",0);
    }

    create(now,prev, color, version) {
        let circle = new Circle();
        circle.x = prev.x || 0;
        circle.y = prev.y || 0;
        var nDeltaX = now.x - prev.x;
        var nDeltaY = now.y - prev.y;
        circle.radius = Math.sqrt(nDeltaX * nDeltaY);
        circle.color = `rgb(${color.red},${color.green},${color.blue})` || '#F00';
        circle.lineWidth = 4;
        circle.version = version;
        return circle;
    }

}

class Line extends BaseCanvasElement {
    constructor(version) {
        super('lineCanvas',version);
       // this.version = version;
        //this.type = 'clear';
    }
    create(now,prev,color,version) {
        let line = new Line();
       
        line.x = prev.x || 0;
        line.y = prev.y || 0;
        line.toX = now.x;
        line.toY = now.y;
        line.color = `rgb(${color.red},${color.green},${color.blue})` || '#F00';
        line.lineWidth = 4;
        line.version = version;
        return line;
    }
}

class Clear extends BaseCanvasElement {
    constructor(version) {
        super('clearCanvas',version);
        //this.version = version;
        //this.type = 'clear';
    }
    isInShape({x,y}) {
        return false;
    }
}


export default {
    Rectangle,
    Clear,
    Circle,
    Line
}