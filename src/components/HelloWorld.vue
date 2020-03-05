<template>
  <v-container fluid>
    <!-- <button @click="AddElement()">AddElement</button> -->
    <v-color-picker v-model="selectedColor"></v-color-picker>
    <div class="text-center">
      <v-btn
        class="ma-2"
        v-for="(command,key) in commands"
        :key="key"
        small
        outlined
        :color="selectedCommand != null && selectedCommand===command ? 'green' : 'black'"
        @click="SelectCommand(command)"
      >
        <!-- :color="selectedCommand != null && selectedCommand.type===command.type ? 'green' : 'black'" -->
        {{key}}
      </v-btn>
      <v-btn
        class="ma-2"
        v-for="(shape,key) in shapes"
        :key="key"
        small
        outlined
        :color="selectedShape != null && selectedShape.type===shape.type ? 'green' : 'black'"
        @click="SelectShapeAction(key)"
      >{{key}}</v-btn>
    </div>

    <div class="canvas-section">
      <my-canvas style="width: 100%; height: 600px;">
        <component :is="obj.type" :key="obj.version" :val="obj" v-for="(obj) in elements"></component>
      </my-canvas>
      <my-canvas
        style="width: 100%; height: 600px;"
        @drawDummy="drawDummy"
        @draw="draw"
        @click="click"
      >
        <component :is="obj.type" :key="obj.version" :val="obj" v-for="(obj) in elementsDummy"></component>
      </my-canvas>
    </div>
  </v-container>
</template>

<script>
import MyCanvas from ".././MyCanvas.vue";
import rectangleCanvas from "../types/rectangle.vue";
import circleCanvas from "../types/circle.vue";
import clearCanvas from "../types/clear.vue";
import lineCanvas from "../types/line.vue";
import eraserCanvas from "../types/eraser.vue";
import Objects from "../types/objects";

export default {
  components: {
    MyCanvas,
    rectangleCanvas,
    clearCanvas,
    circleCanvas,
    lineCanvas,
    eraserCanvas
  },
  data() {
    return {
      //todo : selectShape, equation, handwriting, upload image, snapshot,
      elements: [new Objects.Clear(0)],
      elementsDummy: [new Objects.Clear(0)],
      commands: {
        "Clear All": this.ClearAll,
        Undo: this.RemoveElement,
        Select: this.SelectElement
      },
      shapes: {
        rectangle: new Objects.Rectangle(),
        circle: new Objects.Circle(),
        line: new Objects.Line(),
        eraser: new Objects.Eraser()
      },
      selectedElement: null,
      selectedCommand: null,
      selectedColor: null,
      selectedShape: new Objects.Rectangle()
    };
  },

  methods: {
    RemoveElement() {
      if (this.elements.length === 1) {
        return;
      }
      this.elements.pop();
      this.elements.forEach(f => ++f.version);
    },
    ClearAll() {
      if (this.elements.length === 1) {
        return;
      }
      if (!confirm("Are you sure?")) {
        return;
      }
      let clearObject = this.elements[0];
      clearObject.version += 1;
      this.elements = [clearObject];
    },
    SelectElement() {
      this.selectedCommand = this.commands["Select"];
      this.selectedShape = null;
    },
    SelectShapeAction(shape) {
      this.selectedCommand = null;
      this.selectedShape = this.shapes[shape];
    },
    SelectCommand(command) {
      command();
      //  // this.selectedShape
    },

    drawDummy({ now, prev }) {
      if (this.selectedShape) {
        this.elementsDummy[0].version++;
        console.log("a" + this.elementsDummy[0].version);
        let object = this.selectedShape.create(
          now,
          prev,
          this.selectedColor.hex,
          "a" + this.elementsDummy[0].version,
          true
        );
        this.elementsDummy = [this.elementsDummy[0], object];
      }
       if (
         this.selectedCommand === this.commands["Select"] &&
         this.elementsDummy.length === 2
       ) {
         this.elementsDummy[0].version++;
         const element = this.elementsDummy[1];
         element.version = "a" + this.elementsDummy[0].version;
         element.x = now.x;
         element.y = now.y;
       }
    },
    draw() {
      if (!this.selectedShape) {
        return;
      }
      this.transferElemet();
    },
    transferElemet() {
      console.log("here");
      var lastVersion = this.elements[this.elements.length - 1].version;
      let object = this.elementsDummy.pop();
      object.version = ++lastVersion;
      object.isDummy = false;
      
      this.elementsDummy = [new Objects.Clear(0)];
      this.elements.push(object);
      console.log(this.elements);
    },
    click({ x, y }) {
      if (!this.selectedCommand) {
        return;
      }
      if (this.selectedCommand === this.commands["Select"]) {
        if (this.elementsDummy.length === 1) {
          this.findElementOnCanvas({ x, y });
          return;
        }
         this.transferElemet();
      }
      //We can do draw in here
    },
    findElementOnCanvas({ x, y }) {
      for (let index = this.elements.length - 1; index >= 0; index--) {
        const element = this.elements[index];
        if (element.isInShape({ x, y })) {
          let elementArr = this.elements.splice(index, 1);
          let element = elementArr[0];
          this.elements.forEach(f => ++f.version);
          element.isDummy = true;
          this.elementsDummy.push(element);
          break;
        }
      }
    }
  }
};
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
}

#app {
  position: relative;
  height: 100vh;
  width: 100vw;
  padding: 20px;
  box-sizing: border-box;
}
.canvas-section {
  position: relative;
  width: 100%;
  height: 600px;
}
.my-canvas-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.canvas-section:last-child {
  z-index: 2;
}
</style>
