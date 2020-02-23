<template>
  <div id="app">
    <h2>Bar Chart Example</h2>
    <!-- <button @click="AddElement()">AddElement</button> -->
    <button @click="RemoveElement()">RemoveElement</button>

    <my-canvas style="width: 100%; height: 600px;" @draw="draw">
      <component
        :is="obj.type"
        :key="obj.version"
        :val="obj"
        v-for="(obj) in elements"
      ></component>
    </my-canvas>
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
      elements: [
        new Objects.Clear(0)
      ]
     
    };
  },
  methods: {
    RemoveElement() {
      if (this.elements.length === 1) {
        return;
      }
      this.elements.pop();
      this.elements.forEach(f=> ++f.version)
    },
    draw({now,prev}) {
      let color = {
        red: Math.floor(Math.random() * 255),
        green: Math.floor(Math.random() * 255),
        blue: Math.floor(Math.random() * 255)
      };
      var lastVersion = this.elements[this.elements.length - 1].version;
      let rectangle = new Objects.Rectangle(now,prev, color, ++lastVersion);
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
</style>