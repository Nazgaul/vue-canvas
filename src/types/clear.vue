<script>
import Clear from "./objects";

export default {
  // Gets us the provider property from the parent <my-canvas> component.
  inject: ["provider"],

  props: {
    val: Clear
  },
  render() {

    if (!this.provider.context) return;
    const ctx = this.provider.context;
    ctx.clearRect(0, 0,  ctx.canvas.width, ctx.canvas.height);
    return null;
  },
};
</script>