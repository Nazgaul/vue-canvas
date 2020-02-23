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
    ctx.beginPath();
    ctx.lineWidth = this.val.lineWidth;
    ctx.strokeStyle = this.val.color;
    ctx.strokeRect(this.val.x, this.val.y, this.val.width, this.val.height);
    ctx.stroke();
    return null;
  }
};
</script>