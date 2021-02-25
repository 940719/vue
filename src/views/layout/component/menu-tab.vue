<template>
  <div class="nav-tabs">
    <el-tabs
      type="border-card"
      v-model="activeTab"
      @tab-remove="removeTab"
      @tab-click="tabClick"
    >
      <el-tab-pane
        v-for="item in tabList"
        :key="item.name"
        :label="item.title"
        :name="item.name"
        :closable="tabList.length == 1 ? false : true"
      >
        <span slot="label" @dblclick="refreshTab(item)">{{ item.title }}</span>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "menu-tab",
  data() {
    return {
      //当前tab
      activeTab: this.$route.name,
    };
  },
  computed: {
    ...mapState(["tabList"]),
    ...mapState(["tabIndex"]),
  },
  watch: {
    tabIndex() {
      this.activeTab = this.tabIndex;
    },
    "$route.path": function () {
      this.$store.commit("setTabIndex", this.$route.name);
      this.$store.commit("addTabs", this.$route);
    },
  },
  mounted() {
    this.$store.commit("setTabIndex", this.$route.name);
    this.$store.commit("addTabs", this.$route);
  },
  methods: {
    //tab双击刷新事件
    refreshTab(v) {
      this.$store.commit("setViewStatus", false);
      this.$store.commit("delKeepAliveName", v.name);
      setTimeout(() => {
        this.$store.commit("setViewStatus", true);
        this.$store.commit("setKeepAliveName", v.name);
      }, 500);
    },
    //tab点击事件
    tabClick(v) {
      let tab = this.tabList.find((tab) => tab.name == this.activeTab);
      if (this.$route.name !== tab.name) {
        this.$router.push({ name: tab.name });
      }
    },
    //tab删除事件
    removeTab(v) {
      this.$store.commit("removeTab", v);
      let tab = this.tabList.find((tab) => tab.name == this.tabIndex);
      this.$store.commit("delKeepAliveName", v);
      if (this.$route.name !== tab.name) {
        this.$router.push({ name: tab.name });
      }
    },
  },
};
</script>