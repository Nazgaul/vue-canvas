<script>
import Circle from "./objects";

export default {
  
  // Gets us the provider property from the parent <my-canvas> component.
  inject: ["provider"],

  props: {
    val: Circle
  },
  render() {
    if (!this.provider.context) return;
    const ctx = this.provider.context;
    ctx.beginPath();
    ctx.arc(this.val.x, this.val.y, this.val.radius, 0, 2 * Math.PI);
    ctx.fillStyle = this.val.color;
    ctx.stroke();
    return null;
  }
};
</script>