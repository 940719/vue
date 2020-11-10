<template>
  <div id="my-chart"></div>
</template>
<script>
const echarts = require("echarts");
export default {
  name: "bar-chart",
  //   props:{
  //       options:{
  //           type:Array,
  //           default:() =>{
  //               return []
  //           }
  //       }
  //   },
  data() {
    return {};
  },
  mounted() {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById("my-chart"));
    // 指定图表的配置项和数据
    myChart.clear()
    var option = {
      xAxis: {
        type: "category",
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          data: [120, 200, 150, 80, 70, 110, 130],
          type: "bar",
          showBackground: true,
          backgroundStyle: {
            color: "rgba(220, 220, 220, 0.8)",
          },
        },
      ],
    };
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
  },
};
</script>
<style  scoped>
#my-chart {
  width: 400px;
  height: 400px;
}
</style>