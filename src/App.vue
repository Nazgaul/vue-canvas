<template>
  <div id="app">
    <!-- <button @click="AddElement()">AddElement</button> -->
    <button @click="RemoveElement()">RemoveElement</button>
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
import rectangle from "./types/rectangle.vue";
import clear from "./types/clear.vue";
import Objects from "./types/objects";

export default {
  name: "app",
  components: {
    MyCanvas,
    rectangle,
    clear
  },

  data() {
    return {
      elements: [new Objects.Clear(0)],
      elementsDummy: [new Objects.Clear(0)],
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
      let color = {
        red: 255,
        green:0,
        blue: 0
      };
      var lastVersion = this.elementsDummy[this.elementsDummy.length - 1].version++;
      console.log('s',lastVersion);
      let newElementClear = new Objects.Clear(++lastVersion);
      console.log(newElementClear);
      let rectangle = new Objects.Rectangle(now, prev, color, ++lastVersion);
      this.elementsDummy = [newElementClear,rectangle];
    },
    draw({ now, prev }) {
       //var lastVersion = this.elementsDummy[this.elementsDummy.length - 1].version;
      this.elementsDummy = [new Objects.Clear(0)];
      let color = {
        red: Math.floor(Math.random() * 255),
        green: Math.floor(Math.random() * 255),
        blue: Math.floor(Math.random() * 255)
      };
      var lastVersion = this.elements[this.elements.length - 1].version;
      let rectangle = new Objects.Rectangle(now, prev, color, ++lastVersion);
      this.elements.push(rectangle);
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