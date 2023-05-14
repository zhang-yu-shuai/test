<template>
<div>
  <businessHeader></businessHeader>
  <router-view></router-view>
</div>
</template>

<script>
import businessHeader from "@/views/business/layout/header/Header.vue";

export default {
  name: "businessContent",
  components: {businessHeader}
}
</script>

<style scoped>

</style>