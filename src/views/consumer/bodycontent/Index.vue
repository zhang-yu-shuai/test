<template>
 <div class="container">
   <Header></Header>
    <div class="pic">
    </div>
   <Footer></Footer>
 </div>
</template>

<script>
import Footer from "@/views/consumer/footer/Footer.vue";
import Header from "@/views/consumer/header/Header.vue";

export default {
  name: "Index",
  components: {Header, Footer} ,


}
</script>

<style lang="scss" scoped>
.pic{
  width: 100%;
  height: 535px;
  background: url("@/assets/jiaoyi.jpg") no-repeat;
  background-size: 100%;
}

</style>