// function  Rectangle(x1,y1,x2,y2,value,color) {
//     debugger;
//     this.x1 = x1 || 0;
//     this.x2 = x2 || 0;
//     this.y1 = y1 || 0;
//     this.y2 = y2 || 0;
//     this.value = value || 0;
//     this.color = color || '#F00';
//     this.type = 'my-box';
//   }
  export default class Rectangle {
    constructor(x1,y1,x2,y2,value,color) {
        this.x1 = x1 || 0;
        this.x2 = x2 || 0;
        this.y1 = y1 || 0;
       // this.y2 = y2 || 0;
        this.value = value || 0;
        this.color = `rgb(${color.red},${color.green},${color.blue})` || '#F00';
        this.type = 'my-box';
    }

    get y2() {
        return 100 - this.value
    }
  }