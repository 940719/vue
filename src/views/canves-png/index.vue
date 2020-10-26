<template>
  <div>
    <img
      src="../../assets/images/shuiweiyi.png"
      style="width: 200; heigth: 200px"
      id="pic"
      v-show="isT"
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
      isT: false,
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
      ctx.fillStyle = "#3aa5cb";
      let realHight = 0;
      let height = 172;
      
      (function drawFrame() {
        if (height <= 90 ) {
          return;
        } else {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(image, 0, 0);
          height -=  1;
          realHight += 1;
          window.requestAnimationFrame(drawFrame);
          ctx.beginPath();
          ctx.fillRect(104, height, 14, realHight);
          ctx.restore();
          ctx.save(); //save和restore可以保证样式属性只运用于该段canvas元素
        //   ctx.strokeStyle = "#000"; //设置描边样式
          ctx.font = "24px Arial"; //设置字体大小和字体
          ctx.fillStyle = "#fff"
          let num = parseInt((realHight-2)*7/8)
          ctx.fillText (num,98,201)
          ctx.stroke(); //执行绘制
          ctx.restore();
        }
      })();
      return canvas;
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
<style lang="scss">
#myCanvas {
  //zoom: 0.5;
}
</style>