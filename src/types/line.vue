<script>
import Line from "./objects";

export default {
  
  // Gets us the provider property from the parent <my-canvas> component.
  inject: ["provider"],

  props: {
    val: Line
  },
  render() {
    if (!this.provider.context) return;
    const ctx = this.provider.context;
    ctx.beginPath();
    ctx.moveTo(this.val.x, this.val.y);
    ctx.lineTo(this.val.toX, this.val.toY);
    ctx.closePath();
    ctx.stroke();
    return null;
  }
};
</script>