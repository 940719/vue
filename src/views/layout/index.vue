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
              <router-view
                v-if="routerViewloding"
                class="main-container"
                :key="key"
              />
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
export default {
  name: "layout",
  data() {
    return {
      //当前tab
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
  mounted() {},
  methods: {},
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
