

import { mapState } from "vuex";
let cachePageDataList = [];
let cacheList, keysList;
const nameKeyList = {};
const mixin = {
    computed: {
        ...mapState(["tabs"]),
    },
    activated() {
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
            // console.log(cacheList, keysList, nameKeyList)
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
}
export default mixin