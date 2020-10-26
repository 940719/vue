<template>
  <div>
    <img
      src="../../assets/images/shuiweiyi.png"
      style="width: 200; heigth: 200px"
      id="pic"
      v-if="isT"
    />
    <canvas
      @mousemove="cnvs_getCoordinates($event)"
      id="myCanvas"
      @mouseout="cnvs_clearCoordinates()"
    ></canvas>
    <div id="xycoordinates"></div>
  </div>
</template>
<script>
export default {
  name: "canvesPeg",
  data() {
    return {
      isT: true,
    };
  },
  mounted() {
    var image = document.getElementById("pic");
    image.onload = () => {
      this.isT = false;
      var canvas = document.getElementById("myCanvas");
      canvas.width = image.width;
      canvas.height = image.height;
      var ctx = canvas.getContext("2d");
      ctx.drawImage(image, 0, 0);

      let realHight = 171;
      let height = realHight;
      (function drawFrame() {
        if (height <= 90) {
          return;
        } else {
          height = height * 0.99;
          window.requestAnimationFrame(drawFrame);
          ctx.beginPath();

          if (height > 80) {
            ctx.fillStyle = "red";
          } else {
            ctx.fillStyle = "blue";
          }
          ctx.fillRect(104, height, 14, 3);
          ctx.restore();
          return canvas;
        }
      })();
    };
  },
  methods: {
    cnvs_getCoordinates(e) {
      var x = e.clientX;
      var y = e.clientY;
      document.getElementById("xycoordinates").innerHTML =
        "Coordinates: (" + x + "," + y + ")";
    },
    cnvs_clearCoordinates() {
      document.getElementById("xycoordinates").innerHTML = "";
    },
  },
};
</script>