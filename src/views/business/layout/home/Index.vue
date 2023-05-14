<template>
  <div>
    <Header></Header>
    <Sale></Sale>
    <Bottom></Bottom>
  </div>
</template>

<script>
//头部分
import Header from "./header"
//销售额/访问量
import Sale from "./sale"
///底部
import Bottom from "./bottom"
export default {
  name: "Index",
  components:{
    Header,
    Sale,
    Bottom
  }
}
</script>

<style lang="scss" scoped>

</style>