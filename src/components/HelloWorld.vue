<template>
  <v-container fluid>
    <!-- <button @click="AddElement()">AddElement</button> -->
    <v-btn @click="RemoveElement()">Undo</v-btn>
    <v-color-picker v-model="selectedColor"></v-color-picker>
    <div class="text-center">
       <v-btn class="ma-2"
        v-for="(command,key) in commands"
        :key="key"
        small
        outlined
        @click="SelectCommand(command)"
      >
        {{key}}
        <!-- <v-icon v-text="shape.icon"></v-icon> -->
      </v-btn>
      <v-btn class="ma-2"
        v-for="(shape,key) in shapes"
        :key="key"
        small
        outlined
        :color="selectedShape.type===shape.type ? 'green' : 'black'"
        @click="SelectShapeAction(key)"
      >
        {{key}}
        <!-- <v-icon v-text="shape.icon"></v-icon> -->
      </v-btn>
    </div>
    <!-- <v-select v-model="selectedShape"
          :items="shapes"
          label="Shape">
    </v-select>-->
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
        "Clear All" : this.ClearAll
      },
      shapes: {
        rectangle:  new Objects.Rectangle() ,
        circle:  new Objects.Circle(),
        line: new Objects.Line(),
        eraser: new Objects.Eraser()
      },
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
      if (!confirm("Are you sure?"))  {
        return;
      }
      let clearObject = this.elements[0];
      clearObject.version += 1;
      this.elements = [clearObject];
    },
    SelectShapeAction(shape) {
      this.selectedShape = this.shapes[shape];
      console.log(typeof this.selectedShape);
    },
     SelectCommand(command) {
       command();
    //  // this.selectedShape
     },

    drawDummy({ now, prev }) {
      if (!this.selectedShape) {
        return;
      }

      var lastVersion = this.elementsDummy[this.elementsDummy.length - 1]
        .version;
      let newElementClear = new Objects.Clear(++lastVersion);
      let object = this.selectedShape.create(
        now,
        prev,
        this.selectedColor.hex,
        ++lastVersion
      );
      this.elementsDummy = [newElementClear, object];
    },
    draw({ now, prev }) {
      if (!this.selectedShape) {
        return;
      }
      this.elementsDummy = [new Objects.Clear(0)];
      let v = this.selectedColor;

      var lastVersion = this.elements[this.elements.length - 1].version;
      let object = this.selectedShape.create(now, prev, v.hex, ++lastVersion);
      this.elements.push(object);
    },
    click({ x, y }) {
      console.log(x, y);
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
