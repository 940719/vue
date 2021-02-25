import Vue from 'vue'
import VueRouter from 'vue-router'

//登录
const Login = () => import('@/views/login')
//布局
const Layout = () => import('@/views/layout')
//首页
const Home = () => import('@/views/home/index')
//组件
const componentItem = () => import('@/views/component-item')
const indentMap = () => import('@/views/component-item/indent-map')
const columnarMap = () => import('@/views/component-item/columnar-map')
const pieMap = () => import('@/views/component-item/pie-map')

const tableList = () => import('@/views/component-item/table-list')
//图片转化canves
const canvasPng = () => import ('@/views/canvas-png')
import NotFound from '../views/errorPage/404'
import Forbidden from '../views/errorPage/403'

Vue.use(VueRouter)


export const routes = [
  {   
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      requiresAuth: true,
      keepalive: true,
      name: '登录'
    },
  },
  {
    path: '',
    component: Layout,
    name: 'layout',
    redirect: 'home',
    meta: {
      requiresAuth: true,
      keepalive: true,
      name: '首页'
    },
    children: [
      {
        id: '1',
        path: 'home',
        component: Home,
        name: 'home',
        meta: {
          name: '首页',
          icon: 'tree',
          keepalive: true,
        },
      },
      {
        id: '2',
        path: 'componentItem',
        component: componentItem,
        name: 'componentItem',
        redirect:'componentItem/indentMap',
        meta: {
          name: '组件',
          icon: 'example',
          keepalive: true,
        },
        children: [
          {
            id: '2-1',
            path: 'indentMap',
            component: indentMap,
            name: 'indentMap',
            meta: {
              name: '折线图',
              icon: 'tree',
              keepalive: true,
            },
          },
          {
            id: '2-2',
            path: 'columnarMap',
            component: columnarMap,
            name: 'columnarMap',
            meta: {
              name: '柱状图',
              icon: 'example',
              keepalive: true,
            },
          },
          {
            id: '2-3',
            path: 'pieMap',
            component: pieMap,
            name: 'pieMap',
            meta: {
              name: '饼状图',
              icon: 'tree',
              keepalive: true,
            },
            
          },
          {
            id: '2-4',
            path: 'tableList',
            component: tableList,
            name: 'tableList',
            meta: {
              name: '表格',
              icon: 'tree',
              keepalive: true,
            },
          }
        ]
      },
      {
        id: '3',
        path: 'canvasPng',
        component: canvasPng,
        name: 'canvasPng',
        meta: {
          name: 'canves',
          icon: 'tree',
          keepalive: true,
        },
      },
      {
        path: '/403',
        component: Forbidden
      },
      {
        path: '*',
        component: NotFound
      },
    ]
  }

]
export const DynamicRoutes = []
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


export default router
