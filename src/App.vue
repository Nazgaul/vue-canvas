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
        v-bind:is="obj.componentToRender"
        v-bind:key="obj.version"
        v-bind:x1="((index / chartValues.length) * 100)"
        v-bind:x2="((index / chartValues.length) * 100) + (100 / chartValues.length)"
        v-bind:y="100"
        v-bind:y2="100 - obj.val"
        v-bind:color="obj.color"
        v-bind:value="obj.val"
        v-for="(obj, index) in chartValues"
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

export default {
  name: "app",
  components: {
    MyCanvas,
    MyBox
  },

  data() {
    return {
      chartValues: [
        // {val: 24, color: 'red'},
        // {val: 32, color: '#0f0'},
        // {val: 66, color: 'rebeccapurple'},
        // {val: 1, color: 'green'},
        // {val: 28, color: 'blue'},
        // {val: 60, color: 'rgba(150, 100, 0, 0.2)'},
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
      this.chartValues.forEach(f => ++f.version);
      this.chartValues.push({
        componentToRender: "my-box",
        val: value,
        color: `rgb(${color.red},${color.green},${color.blue})`,
        version: 1
      });
    },
    RemoveElement() {
      this.chartValues.pop();
      this.chartValues.forEach(f => ++f.version);
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

        self.chartValues[selectedVal].val = Math.min(
        Math.max(this.chartValues[selectedVal].val + dir * 0.5, 0),
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