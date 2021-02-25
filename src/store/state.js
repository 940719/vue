export default {
    get UserToken() {
        return localStorage.getItem('token')
    },
    set UserToken(value) {
        localStorage.setItem('token', value)
    },
    //刷新页面参数
    routerViewloding:true,
    keepAliveList:[],
    /* 导航菜单是否折叠 */
    isSidebarNavCollapse: false,
    /* 面包屑导航列表 */
    crumbList: [],
    /* 菜单tabs */
    tabList:[],
    /* 当前tab */
    tabIndex:''
}
