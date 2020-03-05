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
    if (this.val.isDummy) {
      ctx.setLineDash([20, 5]);
      ctx.lineWidth = 2;
      ctx.strokeStyle = this.val.color;
    }
    ctx.fillRect(this.val.x, this.val.y, this.val.width, this.val.height);
    return null;
  }
};
</script>