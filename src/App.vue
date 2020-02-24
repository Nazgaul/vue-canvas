<template>
  <div id="app">
    <!-- <button @click="AddElement()">AddElement</button> -->
    <button @click="RemoveElement()">RemoveElement</button>
    <button @click="SelectElement()">SelectElement</button>

    <select v-model="selected">
        <option v-for="(option,index) in options" v-bind:value="option" :key="index">
        {{ option.type }}
      </option>
      </select>
<!-- 
   <input type="radio" :value="new Objects.Rectangle()" v-model="typeToDraw">
      <label for="one">One</label>
    <input type="radio" value="Two" v-model="typeToDraw">
    <label for="two">Two</label>
    <span>Picked: {{ typeToDraw }}</span> -->

    <div class="canvas-section">
      <my-canvas style="width: 100%; height: 600px;">
        <component :is="obj.type" :key="obj.version" :val="obj" v-for="(obj) in elements"></component>
      </my-canvas>
      <my-canvas style="width: 100%; height: 600px;" @drawDummy="drawDummy" @draw="draw">
        <component :is="obj.type" :key="obj.version" :val="obj" v-for="(obj) in elementsDummy"></component>
      </my-canvas>
    </div>
  </div>
</template>

<script>
import MyCanvas from "./MyCanvas.vue";
import rectangleCanvas from "./types/rectangle.vue";
import circleCanvas from "./types/circle.vue";
import clearCanvas from "./types/clear.vue";
import lineCanvas from "./types/line.vue";
import eraserCanvas from "./types/eraser.vue";
import Objects from "./types/objects";

export default {
  name: "app",
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
      elements: [new Objects.Clear(0)],
      elementsDummy: [new Objects.Clear(0)],
      options : [
        new Objects.Rectangle(), 
        new Objects.Circle(),
        new Objects.Line(),
        new Objects.Eraser()
      ],
        
      selected: null
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
    drawDummy({ now, prev }) {
      if (!this.selected) {
        return;
      }
      let color = {
        red: 255,
        green:0,
        blue: 0
      };
      var lastVersion = this.elementsDummy[this.elementsDummy.length - 1].version;
      let newElementClear = new Objects.Clear(++lastVersion);
      let object = this.selected.create(now,prev, color, ++lastVersion);
      
      this.elementsDummy = [newElementClear,object];
    },
    draw({ now, prev }) {
       if (!this.selected) {
        return;
      }
       //var lastVersion = this.elementsDummy[this.elementsDummy.length - 1].version;
      this.elementsDummy = [new Objects.Clear(0)];
      let color = {
        red: Math.floor(Math.random() * 255),
        green: Math.floor(Math.random() * 255),
        blue: Math.floor(Math.random() * 255)
      };
      var lastVersion = this.elements[this.elements.length - 1].version;
      let object = this.selected.create(now,prev, color, ++lastVersion);
      //let rectangle = new Objects.Rectangle(now, prev, color, ++lastVersion);
      this.elements.push(object);
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
  width: 100%; height: 600px  ;
}
.my-canvas-wrapper  {
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