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
const hightCalculation = {
  7: function (sumNumber) {
    return 80 + ((sumNumber - 70) * 8) / 7;
  },
  8: function (sumNumber) {
    return sumNumber;
  },
  9: function (sumNumber) {
    return 80 + ((sumNumber - 90) * 8) / 9;
  },
};
const realHightCalculation = {
  7: function (realHight) {
    return parseInt((realHight * 7) / 8);
  },
  8: function (realHight) {
    return realHight - 1;
  },
  9: function (realHight) {
    return parseInt((realHight * 9) / 8);
  },
};
export default {
  name: "canvasPeg",
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

      /* 刻度高度 */
      let realHight = 0;
      /* y轴高度 */
      let height = 172;
      let levaNamber = this.sum(7, 9);
      let sumNumber = this.sum(1, 100);
      console.log(levaNamber, sumNumber);
      if (sumNumber >= levaNamber * 10) {
        ctx.fillStyle = "#fd6461";
      } else {
        ctx.fillStyle = "#3aa5cb";
      }
      (function drawFrame() {
        if (realHight > hightCalculation[levaNamber](sumNumber)) {
          return;
        } else {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          /* 把图片设置为背景图 */
          ctx.drawImage(image, 0, 0);
          height -= 1;
          realHight += 1;
          window.requestAnimationFrame(drawFrame);
          /* 刻度绘制 */
          ctx.beginPath();
          ctx.fillRect(104, height, 14, realHight);
          ctx.save(); //save和restore可以保证样式属性只运用于该段canvas元素
          //ctx.strokeStyle = "#000"; //设置描边样式
          ctx.font = "24px Arial"; //设置字体大小和字体
          ctx.fillStyle = "#fff";
          let num = realHightCalculation[levaNamber](realHight);
          ctx.fillText(num, 98, 201);
          ctx.stroke(); //执行绘制
          ctx.restore();
        }
      })();
      return canvas;
    };
  },
  methods: {
    sum(m, n) {
      var num = Math.floor(Math.random() * (m - n) + n);
      return num;
    },
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