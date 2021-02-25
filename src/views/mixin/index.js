



const mixin = {
    data(){
        return {
          
        }
    },
 
    activated() {
        console.log('1111111')
        this.$mc.mc_addCacheComponentToCacheList(this)
    },
    beforeRouteLeave(to,from,next){
        this.$mc.mc_removeCachedByComponentLevel(to,this)
        next()
    }
}
export default mixin