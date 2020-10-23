<template>
  <div>
    <haikongVideo class="hkVideo" />
  </div>
</template>
<script>
import haikongVideo from "@/components/haikong";
export default {
  name: "hkVideo",
  components: {
    haikongVideo
  }
};
</script>
<style  scoped>
    .hkVideo{
        width: 800px;
        height: 600px;
        border: 1px solid red;
    }
</style>