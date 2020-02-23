class BaseCanvasElement {
    constructor(type,version) {
        this.type = type;
        this.version = version

    }
}
class Rectangle extends BaseCanvasElement {
    constructor(now,prev, color, version) {
        super("rectangle",version);
        this.x = prev.x || 0;
        this.y = prev.y || 0;
        this.width = now.x-prev.x || 0;
        this.height = now.y-prev.y || 0;
        this.color = `rgb(${color.red},${color.green},${color.blue})` || '#F00';
        this.lineWidth = 4;
        //this.type = require('./rectangle.vue');

    }
}
class Clear extends BaseCanvasElement {
    constructor(version) {
        super('clear',version);
        this.version = version;
        this.type = 'clear';
    }
}


export default {
    Rectangle,
    Clear
}