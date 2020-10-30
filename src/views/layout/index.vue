<template>
  <div>
    <div class="header">
      <layoutHeader />
    </div>
    <div :class="{ navCollapsed: isSidebarNavCollapse }" style="height: 100%">
      <div class="main">
        <sidebarNav class="sidebar" />
        <div class="main-content">
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
                <span slot="label" @dblclick="refreshTab(item)">{{
                  item.title
                }}</span>
              </el-tab-pane>
            </el-tabs>
          </div>
          <keep-alive>
            <router-view
              class="main-container"
              v-if="$route.meta.keepalive && isReload"
            ></router-view>
          </keep-alive>
          <router-view
            class="main-container"
            v-if="!$route.meta.keepalive"
          ></router-view>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import lineChart from "@/components/line-chart";
import sidebarNav from "./component/sidebar-nav";
import layoutHeader from "./component/layout-header";
import { mapState } from "vuex";
//import mixin from "./component/mixin";
import Vue from "vue";
/* 菜单tab上一状态时所含的菜单名数组 */
let cachePageDataList = [];
/*缓存集合，缓存key集合 */
let cacheList, keysList;
/*页面name对应key的对象   */
const nameKeyList = {};
// Vue.mixin(mixin)
// 使用Vue.mixin的方法存储页面缓存，并且当标签页关闭时，清除页面缓存
Vue.mixin({
  activated() {
    // console.log('%c 进入页面' + to.name, 'color:red;font-size:20px')
    const $vnode = this.$vnode;
    if (
      $vnode &&
      $vnode.data.keepAlive &&
      $vnode.parent &&
      $vnode.parent.componentInstance &&
      $vnode.parent.componentInstance.cache &&
      ($vnode.key || $vnode.componentOptions)
    ) {
      var key =
        $vnode.key == null
          ? $vnode.componentOptions.Ctor.cid +
            ($vnode.componentOptions.tag
              ? `::${$vnode.componentOptions.tag}`
              : "")
          : $vnode.key;
      var cache = $vnode.parent.componentInstance.cache;
      var keys = $vnode.parent.componentInstance.keys;
      if (!cacheList) cacheList = cache;
      if (!keysList) keysList = keys;
      nameKeyList[this.$route.meta.name] = key;
      console.log(cacheList, keysList, nameKeyList,cachePageDataList)
    }
  },
  watch: {
    tabs: function (v) {
      const temp = [...cachePageDataList];
      const newpages = v.map((item) => {
        return item.name;
      });
      if (newpages.join(",") !== temp.join(",")) {
        cachePageDataList = [...newpages];
        // 判断是否有页面被删除了
        temp.forEach((item) => {
          if (newpages.indexOf(item) < 0) {
            // 监听到这个标签页被关闭了
            // 删除缓存的核心方法 start
            const key = nameKeyList[item];
            if (key && cacheList[key]) {
              if (keysList.length && keysList.indexOf(key) > -1) {
                keysList.splice(keysList.indexOf(key), 1);
              }
              delete cacheList[key];
            }
            // 删除缓存的核心方法 end
          }
        });
      }
    },
  },
});
export default {
  name: "layout",
  data() {
    return {
      //当前tab
      activeTab: this.$route.meta.name,
      isReload: true,
    };
  },
  components: { sidebarNav, layoutHeader },
  computed: {
    ...mapState(["isSidebarNavCollapse"]),
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
      const key = nameKeyList[v.name];
      if (key && cacheList[key]) {
        if (keysList.length && keysList.indexOf(key) > -1) {
          keysList.splice(keysList.indexOf(key), 1);
        }
        delete cacheList[key];
      }
      // 删除缓存的核心方法 end
      this.isReload = false;
      this.$nextTick(() => {
        this.isReload = true;
      });
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
<style scoped>
.header {
  width: 100%;
  height: 70px;
  background: #5097ec;
  border-bottom: 1px solid rgba(238, 238, 238, 0.1);
}
</style>
