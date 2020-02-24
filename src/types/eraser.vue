<script>
import Eraser from "./objects";

export default {
  
  // Gets us the provider property from the parent <my-canvas> component.
  inject: ["provider"],

  props: {
    val: Eraser
  },
  render() {
    if (!this.provider.context) return;
    const ctx = this.provider.context;
    ctx.beginPath();
    ctx.fillStyle = '#fff';
    ctx.fillRect(this.val.x, this.val.y, this.val.width, this.val.height);
    return null;
  }
};
</script>