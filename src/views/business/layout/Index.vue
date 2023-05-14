<template>
<div class="layout">
  <!--   左侧导航-->
  <div class="menu">
    <Menu></Menu>
  </div>
  <!--  右侧内容-->
  <div class="content">
    <Content></Content>
  </div>
</div>
</template>

<script>
import Menu from "@/views/business/layout/menu/Index.vue";
import Content from "@/views/business/layout/content/Index.vue";

export default {
  name: "Index",
  components:{
    Menu,Content
  }
}
</script>

<style lang="scss" scoped>
.layout{
  .menu{
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    width: 200px;
    background:#303133;
  }
  .content{
    padding-left: 200px;

  }
}
</style>