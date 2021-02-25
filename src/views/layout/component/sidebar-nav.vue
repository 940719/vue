<template>
  <div style="height: 100%">
    <div
      @mousemove="isHover = true"
      @mouseout="isHover = false"
      class="nav-buttom"
      @click="toggleNavCollapse"
    >
      <svg-icon
        v-if="!isHover && !isSidebarNavCollapse"
        icon-class="left_arrow"
      ></svg-icon>
      <svg-icon
        v-if="isHover && !isSidebarNavCollapse"
        icon-class="left_arrow_hover"
      ></svg-icon>
      <svg-icon
        v-if="!isHover && isSidebarNavCollapse"
        icon-class="right_arrow"
      ></svg-icon>
      <svg-icon
        v-if="isHover && isSidebarNavCollapse"
        icon-class="right_arrow_hover"
      ></svg-icon>
    </div>
    <el-menu
      :collapse="isSidebarNavCollapse"
      background-color="#f2fafd"
      text-color="#5097ec"
      active-text-color="#fff"
      :default-active="currentMenu"
    >
      <DynamicMenu :menuList="sidebarMenu"></DynamicMenu>
    </el-menu>
  </div>
</template><script>
import DynamicMenu from "@/components/dynamic-menu";
import { mapState } from "vuex";
const sidebarMenu = [
  {
    id: "1",
    meta: {
      icon: "tree",
      name: "首页",
    },
    name: "home",
    path: "home",
  },
  {
    id: "2",
    meta: {
      icon: "example",
      name: "组件",
    },
    name: "moduleItem",
    path: "/moduleItem",
    children: [
      {
        id: "2-1",
        meta: {
          icon: "tree",
          name: "折线图",
        },
        name: "indentMap",
        path: "/indentMap",
      },
      {
        id: "2-2",
        meta: {
          icon: "example",
          name: "柱状图",
        },
        name: "columnarMap",
        path: "/columnarMap",
      },
      {
        id: "2-3",
        meta: {
          icon: "tree",
          name: "饼状图",
        },
        name: "pieMap",
        path: "/pieMap",
      },{
        id: "2-4",
        meta: {
          icon: "tree",
          name: "表格",
        },
        name: "tableList",
        path: "/tableList",
      },
    ],
  },
  {
    id: "3",
    meta: {
      icon: "tree",
      name: "canvas",
    },
    name: "canvasPng",
    path: "/canvasPng",
  },
];
export default {
  name: "my-nav",
  data() {
    return {
      isHover: false,
      sidebarMenu,
      isCollapse: true,
    };
  },
  computed: {
    ...mapState(["isSidebarNavCollapse"]),
    ...mapState("permission", ["currentMenu"]),
  },
  methods: {
    toggleNavCollapse() {
      this.$store.commit("toggleNavCollapse");
    },
  },
  components: {
    DynamicMenu,
  },
};
</script> 