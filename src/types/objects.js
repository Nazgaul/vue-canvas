class BaseCanvasElement {
    constructor(type,version) {
        this.type = type;
        this.version = version

    }
}
class Rectangle extends BaseCanvasElement {
    constructor(x, y, width, height, color, version) {
        super("rectangle",version);
        this.x = x || 0;
        this.y = y || 0;
        this.width = width || 0;
        this.height = height || 0;
        this.color = `rgb(${color.red},${color.green},${color.blue})` || '#F00';
       
        //this.type = require('./rectangle.vue');

    }
}
class Clear extends BaseCanvasElement {
    constructor(version) {
        super('clear',version);
        this.version = 0;
        this.type = 'clear';

    }
}


export default {
    Rectangle,
    Clear
}