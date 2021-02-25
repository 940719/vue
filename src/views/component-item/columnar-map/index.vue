<template>
  <div >
    <barChart />
  </div>
</template>
<script>
import barChart from "@/components/bar-chart";
export default {
  name: "columnarMap",
  components: {
    barChart
  },
};
</script>
<style lang="scss" scoped>
  div{
    width: 100%;
    height: 100%;
  }
</style>