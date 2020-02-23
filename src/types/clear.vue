<script>
import Rectangle from "./objects";

export default {
  // Gets us the provider property from the parent <my-canvas> component.
  inject: ["provider"],

  props: {
    val: Rectangle
  },
  render() {
    if (!this.provider.context) return;
    const ctx = this.provider.context;
    ctx.clearRect(0, 0,  ctx.canvas.width, ctx.canvas.height);
    return null;
  },
};
</script>