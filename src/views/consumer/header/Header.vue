<template>
<div class="head">
  <div class="header">
     <div class="header-left">
     <img src="../../../assets/shop.png">
       <router-link to="/consumer">
        <p>欢迎来到电子拍卖系统消费端</p>
       </router-link>
   </div>

    <ul  class="header-right">
      <li><router-link to="/acution/recommend">商品推荐</router-link></li>
      <li><router-link to="/acution/success">商品清单管理</router-link></li>
      <li><router-link to="/acution/history">竞价记录管理</router-link></li>
      <li><router-link to="/consumerinfo">个人中心管理</router-link></li>

    </ul>
  </div>
</div>
</template>

<script>
export default {
  name: "Header"
}
</script>

<style  lang="scss" scoped>
.head{
  width: 80px;
  width: 100%;
  background-color: mintcream;
  //overflow: -scroll;
  overflow-x:hidden;
  overflow-y: hidden;
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 80px;
  padding-left: 60px;


  .header-left {
    display: flex;
    align-items: center;
    font-size: 20px;
    a{
      text-decoration: none;
    }


      img {
        width: 10%;
        height: 10%;
      }

      p {
        color: black;
      }

      p:hover {
        color: pink;
      }


  }
  .header-right {
    width: 800px;
    display: flex;
    justify-content: space-around;
    padding-right: 40px;
    list-style: none;
    a{
      text-decoration: none;
    }

    li {
      a {
        text-decoration: none;
        color: #666;
      }

      a:hover {
        color: blue;
      }
    }

  }
}
}

</style>