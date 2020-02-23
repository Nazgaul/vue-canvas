<template>
  <div class="my-canvas-wrapper">
    <canvas ref="my-canvas" @mousedown="OnMouseDown" @mouseup="OnMouseUp" @mousemove="OnMouseMove"></canvas>
    <slot></slot>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // By creating the provider in the data property, it becomes reactive,
      // so child components will update when `context` changes.
      provider: {
        // This is the CanvasRenderingContext that children will draw to.
        context: null
      },
      isDragging: false,
      prev: {
        x: null,
        y: null
      }
    };
  },

  // Allows any child component to `inject: ['provider']` and have access to it.
  provide() {
    return {
      provider: this.provider
    };
  },
  methods: {
    GetXY(event) {
      const rect = this.$refs["my-canvas"].getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      return { x, y };
    },
    OnMouseDown(event) {
      this.prev = this.GetXY(event);
      this.isDragging = true;
    },
    OnMouseMove(event) {
      if (this.isDragging) {
        let now = this.GetXY(event);
        this.$emit("drawDummy", { now, prev: this.prev });
      }
    },
    OnMouseUp(event) {
      let now = this.GetXY(event);
      this.$emit("draw", { now, prev: this.prev });
      this.prev = null;
      this.isDragging = false;
    }
  },

  mounted() {
    // We can't access the rendering context until the canvas is mounted to the DOM.
    // Once we have it, provide it to all child components.
    this.provider.context = this.$refs["my-canvas"].getContext("2d");

    // Resize the canvas to fit its parent's width.
    // Normally you'd use a more flexible resize system.
    this.$refs["my-canvas"].width = this.$refs[
      "my-canvas"
    ].parentElement.clientWidth;
    this.$refs["my-canvas"].height = this.$refs[
      "my-canvas"
    ].parentElement.clientHeight;
  }
};
</script>
<style scoped>
.my-canvas-wrapper {
  border: 1px solid red;
}
</style>