<template>
  <div>
    <div class="header">
      <layoutHeader />
    </div>
    <div :class="{ navCollapsed: isSidebarNavCollapse }" style="height: 100%">
      <div class="main">
        <sidebarNav class="sidebar" />
        <div class="main-content" v-loading="!routerViewloding">
          <menuTab />
          <transition name="fade" mode="out-in">
            <keep-alive :include="keepAliveList">
              <router-view  v-if="routerViewloding" class="main-container" :key="key"></router-view>
            </keep-alive>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import sidebarNav from "./component/sidebar-nav";
import layoutHeader from "./component/layout-header";
import menuTab from "./component/menu-tab";
import { mapState } from "vuex";
import Vue from "vue";
/* 菜单tab上一状态时所含的菜单名数组 */
let cachePageDataList = [];
/*缓存集合，缓存key集合 */
let cacheList, keysList;
/*页面name对应key的对象   */
const nameKeyList = {};

// 使用Vue.mixin的方法存储页面缓存，并且当标签页关闭时，清除页面缓存
// Vue.mixin({
//   activated() {
//     // console.log('%c 进入页面' + to.name, 'color:red;font-size:20px')
//     const $vnode = this.$vnode;
//     if (
//       $vnode &&
//       $vnode.data.keepAlive &&
//       $vnode.parent &&
//       $vnode.parent.componentInstance &&
//       $vnode.parent.componentInstance.cache &&
//       ($vnode.key || $vnode.componentOptions)
//     ) {
//       var key =
//         $vnode.key == null
//           ? $vnode.componentOptions.Ctor.cid +
//             ($vnode.componentOptions.tag
//               ? `::${$vnode.componentOptions.tag}`
//               : "")
//           : $vnode.key;
//       var cache = $vnode.parent.componentInstance.cache;
//       var keys = $vnode.parent.componentInstance.keys;
//       if (!cacheList) cacheList = cache;
//       if (!keysList) keysList = keys;
//       nameKeyList[this.$route.meta.name] = key;
//       console.log(cacheList);
//       console.log(keysList);
//       console.log(nameKeyList);
//       console.log(cachePageDataList);
//     }
//   },
//   watch: {
//     tabs: function (v) {
//       const temp = [...cachePageDataList];
//       const newpages = v.map((item) => {
//         return item.name;
//       });
//       if (newpages.join(",") !== temp.join(",")) {
//         cachePageDataList = [...newpages];
//         // 判断是否有页面被删除了
//         temp.forEach((item) => {
//           if (newpages.indexOf(item) < 0) {
//             // 监听到这个标签页被关闭了
//             // 删除缓存的核心方法 start
//             const key = nameKeyList[item];
//             if (key && cacheList[key]) {
//               if (keysList.length && keysList.indexOf(key) > -1) {
//                 keysList.splice(keysList.indexOf(key), 1);
//               }
//               delete cacheList[key];
//             }
//             // 删除缓存的核心方法 end
//           }
//         });
//       }
//     },
//   },
// });
import { routes } from "@/router/index";
export default {
  name: "layout",
  data() {
    return {
      //当前tab
      transitionName: "",
      activeTab: this.$route.meta.name,
      isReload: true,
    };
  },
  components: { sidebarNav, layoutHeader, menuTab },
  computed: {
    ...mapState(["isSidebarNavCollapse"]),
    ...mapState(["keepAliveList"]),
    ...mapState(["routerViewloding"]),
    
    key() {
      return this.$route.path;
    },
  
  },
  watch: {},  
  mounted() {
  },
  methods: {
   
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
<style lang="scss" scoped>
.fade-leave-active,
.fade-enter-active {
  transition: all 0.5s;
}

.fade-enter {
  opacity: 0;
  transform: translateX(-30px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
