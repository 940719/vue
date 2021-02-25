<template>
  <div id="my-chart"></div>
</template>
<script>
//const echarts = require("echarts");
import echarts from "echarts";
import { mapState } from "vuex";
import mixin from "./mixin"
export default {
  name: "bar-chart",
  mixins:[mixin],
  //   props:{
  //       options:{
  //           type:Array,
  //           default:() =>{
  //               return []
  //           }
  //       }
  //   },
  data() {
    return {
      myChart: null,
      //routeName:'columnarMap',
    };
  },
  computed: {
  },
  watch: {
  
  },
  mounted() {
    this.myChart = echarts.init(document.getElementById("my-chart"));
    this.initChart();
    // 基于准备好的dom，初始化echarts实例

    // 指定图表的配置项和数据
  },
  methods: {
    initChart() {
      this.myChart.clear();
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
      this.myChart.setOption(option);
    },
  },
};
</script>
<style  scoped>
#my-chart {
  width: 100%;
  height: 100%;
}
</style>