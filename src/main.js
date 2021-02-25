import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import axios from './config/httpConfig'
import './styles/index.scss'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/icons'
import 'default-passive-events'
import mixin from './views/mixin'
//定义全局 时间过滤器 
import Moment from 'moment'
import VueLazyload from 'vue-lazyload'
import manageCachedComponents from './utils/index'
Vue.use(VueLazyload, {
  //预加载高度
  preLoad: 1.3,
  //错误时显示的图片
  error: '',
  //图片加载中显示的图片
  loading: '',
  //尝试加载次数
  attempt: 1
})
Vue.filter('comverTime', function (data, format) {
  return Moment(data).format(format);
});
Vue.prototype.$mc = manageCachedComponents
Vue.prototype.$http = axios
Vue.use(ElementUI)
Vue.config.productionTip = false
//Vue.mixin(mixin)
router.beforeEach((to, from, next) => {
  handleKeepAlive(to)

  document.title = to.meta.name
  if (to.fullPath == '/') {
    next({ path: '/login' })
  } else {
    next()
  }

  // if (!store.state.UserToken) {
  //     if (to.matched.length > 0 && !to.matched.some(record => record.meta.requiresAuth)) {
  //         next()
  //     } else {
  //         next({ path: '/' })
  //     }
  // } else {
  //     if (!store.state.permission.permissionList) {
  //         store.dispatch('permission/FETCH_PERMISSION').then(() => {
  //             next({ path: to.path })
  //         })
  //     } else {
  //         if (to.path !== '/') {
  //             next()
  //         } else {
  //             next(from.fullPath)
  //         }
  //     }
  // }
})

router.afterEach((to, from, next) => {
  let keepAliveName = to.name
  store.commit('setKeepAliveName', keepAliveName)
  var routerList = to.matched
  store.commit('setCrumbList', routerList)
  store.commit('permission/SET_CURRENT_MENU', to.name)

})



/**
 * 递归处理多余的 layout : <router-view>，
 * 让需要访问的组件保持在第一层 index : <router-view> 之下
 * @param to
 */
function handleKeepAlive(to) {
  if (to.matched && to.matched.length > 2) {
    to.matched.splice(1, to.matched.length - 2)
  }
}
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
