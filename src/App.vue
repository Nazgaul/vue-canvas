<template>
  <div id="app">
    <h2>Bar Chart Example</h2>
    <button @click="AddElement()">AddElement</button>
    <button @click="RemoveElement()">RemoveElement</button>
    <!-- These are the custom components we'll create -->
    <!-- Values for `my-box` are percentages of the width of the canvas. -->
    <!-- Each bar will take up an equal space of the canvas. -->
    <my-canvas style="width: 100%; height: 600px;">
      <component
        v-bind:is="obj.type"
        v-bind:key="obj.version"
        v-bind:val="obj"
        v-for="(obj) in chartValues"
      ></component>
      <!-- <my-box
        v-for="(obj, index) in chartValues" v-bind:key="obj.version"
        :x1="((index / chartValues.length) * 100)"
        :x2="((index / chartValues.length) * 100) + (100 / chartValues.length)"
        :y1="100"
        :y2="100 - obj.val"
        :color="obj.color"
        :value="obj.val"
      >
      </my-box>-->
    </my-canvas>
  </div>
</template>

<script>
import MyCanvas from "./MyCanvas.vue";
import MyBox from "./MyBox.vue";
import Rectangle from "./Types/Rectangle.js";

export default {
  name: "app",
  components: {
    MyCanvas,
    MyBox
  },
  
  data() {
    return {
      chartValues: [
      ]
    };
  },
  methods: {
    AddElement() {
      let value = Math.floor(Math.random() * 100);
      let color = {
        red: Math.floor(Math.random() * 255),
        green: Math.floor(Math.random() * 255),
        blue: Math.floor(Math.random() * 255)
      };

    
       let length =  this.chartValues.length + 1;
     
      this.chartValues.forEach((f,index) => {
          f.version = ++f.version;
          f.x1 =  (index / length) * 100,
          f.x2 =  ((index / length) * 100) + (100 / length)
      });

      let index = length - 1;
      let rectangle = new Rectangle(
      (index / length) * 100,
      100,
      ((index / length) * 100) + (100 / length),
      100 - value,
      value,
      color);
      this.chartValues.push(rectangle)
      // this.chartValues.push( {
      //   componentToRender: "my-box",
      //   value: value,
      //   color: `rgb(${color.red},${color.green},${color.blue})`,
      //   y: 100,
      //   y2: 100- value,
      //   x1: 100,
      //   x2: 100,
      //   version: 1
      // });
      // eslint-disable-next-line no-console
      console.log( this.chartValues);
    },
    RemoveElement() {
      this.chartValues.pop();
      let length =  this.chartValues.length;
      this.chartValues.forEach((f,index) => {
          f.version = ++f.version;
          f.x1 =  (index / length) * 100,
          f.x2 =  ((index / length) * 100) + (100 / length)
      });
     // this.chartValues.forEach(f => ++f.version);
    }
  },

  // Randomly selects a value to randomly increment or decrement every 16 ms.
  // Not really important, just demonstrates that reactivity still works.
  mounted() {
    let dir = 1;
    let selectedVal = Math.floor(Math.random() * this.chartValues.length);

    let self = this;
    setInterval(() => {
      if (self.chartValues.length) {
      if (Math.random() > 0.995) dir *= -1;
      if (Math.random() > 0.99)
        selectedVal = Math.floor(Math.random() * this.chartValues.length);
        self.chartValues[selectedVal].value = Math.min(
            Math.max(this.chartValues[selectedVal].value + dir * 0.5, 0),
            100
      );
      }
    }, 16);
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