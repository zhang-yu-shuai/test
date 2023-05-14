<template>
<div class="header">
  <div class="title">电子拍卖后台管理系统</div>
  <div class="admin">
    <span>admin</span>
    <el-dropdown trigger="click">
      <span class="el-dropdown-link">
        <i class="el-icon-user-solid">张三</i>
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item  >
          <button type="text" style="border:none;" @click="loginout()">退出</button>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</div>
</template>

<script>
export default {
  name: "Header",

  methods:{
    loginout(){
      this.$router.push("/adminlogin")
    }
  }

}
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  height: 50px;

  .title{
    margin: auto;
    font-size: 25px;
  }
  .admin{
    display: flex;
    align-items: center;
    justify-content: center;
    span{
      margin-right:30px;
    }
    .el-dropdown{
      color: black;
    }
  }
}
</style>