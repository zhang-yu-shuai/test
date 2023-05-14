<template>
  <div>
    <el-row :gutter="10" class="bottom">
      <el-col :span="12">
        <BottomLeft></BottomLeft>
      </el-col>
      <el-col :span="12">
        <BottomRight></BottomRight>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import BottomLeft from "./bottomleft";
import BottomRight from "./bottomright";
export default {
  name: "Index",
  components: {
    BottomLeft,
    BottomRight,
  },
}
</script>

<style lang="scss" scoped>
.bottom{
  margin-top: 10px;
}
</style>