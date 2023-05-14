<template>
<div>
  <el-menu
  unique-opened
      :default-active="$router.path"
      class="el-menu-vertical-demo"
      background-color="#303133"
      text-color="#fff"
      active-text-color="#0f81dc" router>
    <el-menu-item >
      <!--      <img src="../../../assets/logo.png">-->
      <span slot="title" class="word">电子拍卖系统拍卖端</span>
    </el-menu-item>
<!--    <el-menu-item index="/business">-->
<!--      <i class="el-icon-menu"></i>-->
<!--      <span slot="title">首页</span>-->
<!--    </el-menu-item>-->
    <el-submenu index="1">
      <template slot="title">
        <i class="el-icon-user"></i>
        <span>商家信息</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="updataInfo">商家信息</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-submenu index="2" >
      <template slot="title">
        <i class="el-icon-goods"></i>
        <span>商品管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="release">商品管理</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-submenu index="3">
      <template slot="title">
        <i class="el-icon-sell"></i>
        <span>拍卖进度管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="progress">拍卖管理</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-submenu index="4">
      <template slot="title">
        <i class="el-icon-suitcase"></i>
        <span>订单管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="order">订单管理</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</div>
</template>

<script>

export default {
  name: "Index",

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