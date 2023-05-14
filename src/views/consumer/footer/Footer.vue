<template>
<div class="footer">
     <div class="word">
         <p class="title">电子拍卖系统欢迎您</p>
         <p class="sc">Copyright © 2013-2023 苏州科技大学 版权所有 蜀ICP备13011205号-1 苏州科技大学</p>
     </div>
</div>
</template>

<script>
export default {
  name: "Footer"
}
</script>

<style lang="scss" scoped>
.footer{
  height: 200px;
  width: 100%;
  background-color:antiquewhite;
  .word{
    text-align: center;
    .title{
      font-size: 40px;
      padding-top: 40px;
    }
    .sc{
      margin-top: 50px;
    }

  }
}
</style>