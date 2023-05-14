<template>
<div>
<!--  顶部-->
  <Header></Header>
<!--  内容-->
  <router-view></router-view>
<!--  右侧内容-->
</div>
</template>

<script>
import Header from "@/views/admin/layout/content/Header.vue"

export default {
  name: "Index",
  components: {Header}
}
</script>

<style lang="scss" scoped>

</style>