<template>
<div>
  <el-menu
  unique-opened
      :default-active="$router.path"
      class="el-menu-vertical-demo"
      background-color="#112f50"
      text-color="#fff"
      active-text-color="#0f81dc" router>
    <el-menu-item >
<!--      <img src="../../../assets/logo.png">-->
      <span slot="title" class="word">电子拍卖后台系统</span>
    </el-menu-item>
<!--    <el-menu-item index="/manager">-->
<!--      <i class="el-icon-menu"></i>-->
<!--      <span slot="title">首页</span>-->
<!--    </el-menu-item>-->
    <el-submenu index="1"  >
      <template slot="title">
        <i class="el-icon-user"></i>
        <span>用户管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="user">用户管理</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-submenu index="2" >
      <template slot="title">
        <i class="el-icon-sell"></i>
        <span>拍卖进度管理</span>
      </template>
      <el-menu-item-group>

        <el-menu-item index="auction">拍卖进度管理</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <!-- <el-submenu index="1" >
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>订单管理</span>
      </template>
      <el-menu-item-group>

        <el-menu-item index="order">订单管理</el-menu-item>
      </el-menu-item-group>
    </el-submenu> -->
  </el-menu>

</div>
</template>

<script>
export default {
  name: "Index"
}
</script>

<style lang="scss" scoped>
.el-menu{
  border-right: 0;
    /deep/ .is-active{
    background:#1e87bf  !important;
    color: #fff !important;

  }
  .el-submenu__title.is-active {
  background-color: #87CEFA;
}
}

</style>