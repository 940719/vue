
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
        let tab = state.tabs.find(tab => tab.name === v.meta.name)
        if (!tab) {
            let newTab = {
                title: v.meta.name,
                path: v.name,
                name: v.meta.name,
            }
            state.tabs.push(newTab)
        }
    },

    /* 获取当前tab*/
    setTabIndex(state, v) {
        state.tabIndex = v
    },
    /* 删除tab*/
    removeTab(state, v) {
        let tabs = state.tabs
        let tabIndex = state.tabIndex
        if (tabIndex === v) {
            tabs.forEach((tab, index) => {
                if (tab.name == v) {
                    let nextTab = tabs[index + 1] || tabs[index - 1]
                    if (nextTab) {
                        tabIndex = nextTab.name
                    }
                }
            })
        }
        state.tabIndex = tabIndex
        state.tabs = tabs.filter(tab => tab.name != v)
    },

}
