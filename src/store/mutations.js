
import { routes } from '@/router/index'
import { FormItem } from 'element-ui'
export default {
    LOGIN_IN(state, token) {
        state.UserToken = token
    },
    LOGIN_OUT(state) {
        state.UserToken = ''
    },
    setViewStatus(state,staus){
        state.routerViewloding = staus
    },
    toggleNavCollapse(state) {
        state.isSidebarNavCollapse = !state.isSidebarNavCollapse
    },
    setCrumbList(state, list) {
        state.crumbList = list
    },
    setKeepAliveName(state, name) {
        if (state.keepAliveList.indexOf(name) == -1) {
            state.keepAliveList.push(name)
        }
        console.log(state.keepAliveList)
    },
    delKeepAliveName(state, name) {
        let keepAliveList = state.keepAliveList
        state.keepAliveList = keepAliveList.filter(item => item != name)
    },
    /* 添加tab*/
    addTabs(state, v) {
        let tab = state.tabList.find(tab => tab.name === v.name)
        if (!tab) {
            let newTab = {
                title: v.meta.name,
                path: v.path,
                name: v.name,
            }
            state.tabList.push(newTab)
        }
    },

    /* 获取当前tab*/
    setTabIndex(state, v) {
        state.tabIndex = v
    },
    /* 删除tab*/
    removeTab(state, v) {
        let tabList = state.tabList
        let tabIndex = state.tabIndex
        if (tabIndex === v) {
            tabList.forEach((tab, index) => {
                if (tab.name == v) {
                    let nextTab = tabList[index + 1] || tabList[index - 1]
                    if (nextTab) {
                        tabIndex = nextTab.name
                    }
                }
            })
        }
        state.tabIndex = tabIndex
        state.tabList = tabList.filter(tab => tab.name != v)
    },

}
