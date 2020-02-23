<script>
// Note how there's no template or styles in this component.

// Helper functions to convert a percentage of canvas area to pixels.
const percentWidthToPix = (percent, ctx) =>
  Math.floor((ctx.canvas.width / 100) * percent);
const percentHeightToPix = (percent, ctx) =>
  Math.floor((ctx.canvas.height / 100) * percent);


  // function  coordinates(x1,y1,x2,y2,value,color) {
  //   debugger;
  //   this.x1 = x1 || 0;
  //   this.x2 = x2 || 0;
  //   this.y1 = y1 || 0;
  //   this.y2 = y2 || 0;
  //   this.value = value || 0;
  //   this.color = color || '#F00';
  // }
  import Rectangle  from "./Types/Rectangle";

export default {
  // Gets us the provider property from the parent <my-canvas> component.
  inject: ["provider"],

  props: {
   val : Rectangle,
   index: {
     type: Number,
     default: 0
   }
    
    // Start coordinates (percentage of canvas dimensions).
    // x1: {
    //   type: Number,
    //   default: 0
    // },
    // y1: {
    //   type: Number,
    //   default: 0
    // },

    // // End coordinates (percentage of canvas dimensions).
    // x2: {
    //   type: Number,
    //   default: 0
    // },
    // y2: {
    //   type: Number,
    //   default: 0
    // },

    // // The value to display.
    // value: {
    //   type: Number,
    //   defualt: 0
    // },

    // // The color of the box.
    // color: {
    //   type: String,
    //   default: "#F00"
    // }
    // }
    
  },

  data() {
    return {
      // We cache the dimensions of the previous
      // render so that we can clear the area later.
      oldBox: {
        x: null,
        y: null,
        w: null,
        h: null
      }
    };
  },

  computed: {
    calculatedBox() {
      const ctx = this.provider.context;

      // Turn start / end percentages into x, y, width, height in pixels.
      const calculated = {
        x: percentWidthToPix(this.val.x1, ctx),
        y: percentHeightToPix(this.val.y1, ctx),
        w: percentWidthToPix(this.val.x2 - this.val.x1, ctx),
        h: percentHeightToPix(this.val.y2 - this.val.y1, ctx)
      };

      // Yes yes, side-effects. This lets us cache the box dimensions of the previous render.
      // before we re-calculate calculatedBox the next render.
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.oldBox = calculated;
      return calculated;
    }
  },

  render() {
    // Since the pa
    // injected by the time this render function runs the first time.
    if (!this.provider.context) return;
    const ctx = this.provider.context;
    // Keep a reference to the box used in the previous render call.
    // const oldBox = this.oldBox
    // // Calculate the new box. (Computed properties update on-demand.)

    // ctx.beginPath();
    // // Clear the old area from the previous render.
    // ctx.clearRect(oldBox.x, oldBox.y, oldBox.w, oldBox.h);
    // // Clear the area for the text.
    // ctx.clearRect(newBox.x, newBox.y - 42, newBox.w, 100);

    this.clearBox();
    const newBox = this.calculatedBox;

    // Draw the new rectangle.
    ctx.rect(newBox.x, newBox.y, newBox.w, newBox.h);
    ctx.fillStyle = this.val.color;
    ctx.fill();

    // Draw the text
    ctx.fillStyle = "#000";
    ctx.font = "28px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(
      Math.floor(this.val.value),
      newBox.x + newBox.w / 2,
      newBox.y - 14
    );
    return null;
  },
  methods: {
    clearBox() {
      if (!this.provider.context) return;
      const ctx = this.provider.context;
      const oldBox = this.oldBox;
      ctx.beginPath();
      // Clear the old area from the previous render.
      ctx.clearRect(oldBox.x, oldBox.y, oldBox.w, oldBox.h);
      // Clear the area for the text.
      const newBox = this.calculatedBox;
      ctx.clearRect(newBox.x, newBox.y - 42, newBox.w, 100);
    }
  },
  destroyed() {
    this.clearBox();
  }
};
</script>