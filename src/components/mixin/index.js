
import { mapState } from "vuex";
const mixin = {
    data() {
        return {
            routeName: ""
        }
    },
    computed: {
        ...mapState(["isSidebarNavCollapse"]),
    },
    watch: {
        isSidebarNavCollapse() {
            if (this.$route.name !== this.routeName) return;
            setTimeout(() => {
                this.myChart.resize();
            }, 75);
        },
        "$route.name": function () {
            if (this.$route.name == this.routeName) {
                setTimeout(() => {
                    this.myChart.resize();
                }, 300);
            }
        },
    },
    mounted() {
        this.routeName = this.$route.name
        window.onresize = () => {
            if (this.$route.name !== this.routeName) return;
            this.myChart.resize();
        };
    }
}
export default mixin