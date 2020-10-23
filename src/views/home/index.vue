<template>
  <div >
    <el-calendar class="calendar">
      <!-- 这里使用的是 2.5 slot 语法，对于新项目请使用 2.6 slot 语法-->
      <template slot="dateCell" slot-scope="{ data }">
        <!--这里原本有动态绑定的class，去掉-->
        <div @dragover="dragover($event, data)" @drop="drop($event, data)">
          <p>{{ data.day.split("-").slice(1).join("-") }}</p>
          <p draggable="true" @dragstart="dragStart($event, data)">
            {{ dealMyDate(data.day) }}
          </p>
        </div>
      </template>
    </el-calendar>
  </div>
</template>
<script>
 
export default {
  data() {
    return {
      resDate: [
        { date: "2020-09-21", content: "放假" },
        { date: "2020-09-22", content: "去交电费" },
        { date: "2020-09-23", content: "去学习vue" },
        { date: "2020-09-24", content: "去学习vue" },
        { date: "2020-09-25", content: "去学习vue" },
        { date: "2020-09-11", content: "放假" },
        { date: "2020-09-12", content: "去交电费" },
        { date: "2020-09-13", content: "去学习vue" },
        { date: "2020-09-14", content: "去学习vue" },
        { date: "2020-09-15", content: "去学习vue" },
      ],
      xz: "",
    };
  },
  mounted() {
    this.$nextTick(() => {
      // 点击前一个月
      let prevBtn = document.querySelector(
        ".el-calendar__button-group .el-button-group>button:nth-child(1)"
      );
      prevBtn.addEventListener("click", () => {
        console.log("点击前一个月");
      });
    });
    this.$nextTick(() => {
      // 点击后一个月
      let prevBtn = document.querySelector(
        ".el-calendar__button-group .el-button-group>button:last-child"
      );
      prevBtn.addEventListener("click", () => {
        console.log("点击后一个月");
      });
    });
  },
  methods: {
    dealMyDate(v) {
      //console.log(v);

      let len = this.resDate.length;
      let res = "";
      for (let i = 0; i < len; i++) {
        if (this.resDate[i].date == v) {
          res = this.resDate[i].content;
          break;
        }
      }
      return res;
    },
    updal() {},
    dragover(ev, data) {
      ev.preventDefault();
    },
    dragStart(ev, data) {
      this.xz = data.day;
      // ev.dataTransfer.setData("Text", ev.target.id);
    },
    drop(ev, data) {
      this.resDate.forEach((item) => {
        if (item.date == this.xz) {
          item.date = data.day;
        }
      });
    },
  },
};
</script>
<style scoped>
.calendar p {
  width: 100%;
  height: 20px;
}
.calendar div {
  width: 100%;
  height: 100%;
}
</style>
