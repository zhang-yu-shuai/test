<template>
<div class="home">
  <div class="img">
   <span>欢迎使用电子拍卖后台管理系统</span>
  </div>
</div>
</template>

<script>
export default {
  name: "Home"
}
</script>

<style lang="scss" scoped>
.home{
  .img{
    display: flex;
    width: 100%;
    height: 765px;
      background: url("@/assets/home.jpg");
    span{
      margin: auto;
      color: white;
      font-size: 40px;
    }
  }
}
</style>