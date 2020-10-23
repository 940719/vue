export default {
    LOGIN_IN(state, token) {
        state.UserToken = token
    },
    LOGIN_OUT(state) {
        state.UserToken = ''
    },
    toggleNavCollapse(state) {
        state.isSidebarNavCollapse = !state.isSidebarNavCollapse
    },
    setCrumbList(state, list) {
        state.crumbList = list
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
