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
    
    ctx.fillStyle = this.val.color;
    ctx.fillRect(this.val.x, this.val.y, this.val.width, this.val.height);
    return null;
  },
  methods: {
    clearBox() {
      if (!this.provider.context) return;
      const ctx = this.provider.context;
      // const oldBox = this.oldBox;
      // ctx.beginPath();
      // Clear the old area from the previous render.
      //  ctx.clearRect(oldBox.x, oldBox.y, oldBox.w, oldBox.h);
      // Clear the area for the text.
      //const newBox = this.calculatedBox;
      ctx.clearRect(this.val.x, this.val.y, this.val.width, this.val.height);
    }
  },
  destroyed() {
    //this.provider.context.clearRect(0, 0, 5000, 5000);
    console.log('here');
    //this.clearBox();
  }
};
</script>