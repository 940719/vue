<template>
  <div class="nav-tabs">
    <el-tabs
      type="border-card"
      v-model="activeTab"
      @tab-remove="removeTab"
      @tab-click="tabClick"
    >
      <el-tab-pane
        v-for="item in tabs"
        :key="item.name"
        :label="item.title"
        :name="item.name"
        :closable="tabs.length == 1 ? false : true"
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
      transitionName: "",
      activeTab: this.$route.meta.name,
      isReload: true,
    };
  },
  computed: {
    ...mapState(["tabs"]),
    ...mapState(["tabIndex"]),
  },
  watch: {
    tabIndex() {
      this.activeTab = this.tabIndex;
    },
    "$route.path": function () {
      this.$store.commit("setTabIndex", this.$route.meta.name);
      this.$store.commit("addTabs", this.$route);
    },
  },
  mounted() {
    this.$store.commit("setTabIndex", this.$route.meta.name);
    this.$store.commit("addTabs", this.$route);
  },
  methods: {
    //tab双击刷新事件
    refreshTab(v) {
      //   const key = nameKeyList[v.name];
      //   if (key && cacheList[key]) {
      //     if (keysList.length && keysList.indexOf(key) > -1) {
      //       keysList.splice(keysList.indexOf(key), 1);
      //     }
      //     delete cacheList[key];
      //   }
      // 删除缓存的核心方法 end
      this.$store.commit("setViewStatus", false);
      this.$store.commit("delKeepAliveName", v.path);
      setTimeout(() => {
        this.$store.commit("setViewStatus", true);
        this.$store.commit("setKeepAliveName", v.path);
      }, 500);
    },
    //tab点击事件
    tabClick(v) {
      let tab = this.tabs.find((tab) => tab.name == this.activeTab);
      if (this.$route.name !== tab.path) {
        this.$router.push({ name: tab.path });
      }
    },
    //tab删除事件
    removeTab(v) {
      this.$store.commit("removeTab", v);
      let tab = this.tabs.find((tab) => tab.name == this.tabIndex);
      if (this.$route.name !== tab.path) {
        this.$router.push({ name: tab.path });
      }
    },
  },
};
</script>