<template>
<div>
  <Header></Header>
  <div class="cart">
    <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column  prop="img" label="拍卖商品" width="600">
          <template v-slot="scope">
              <el-image v-for="item in scope.row.img"
                        :key="item.id" :src="item.image_info"
                        style="width: 160px;height: 160px">
              </el-image>
          </template>
        </el-table-column>
        <el-table-column prop="price" label="拍卖品单价(￥)">

      </el-table-column>
      <el-table-column
          prop="sum"
          label="总价(￥)">
        <template v-slot="scope">
          {{ scope.row.price  }}
        </template>
      </el-table-column>
    </el-table>
    <div class="total_price">
      <span>需支付</span>
      <span >{{goodsTotalPrice}}</span>
    </div>
    <div class="bottom">
      <el-button type="info" @click="goshopping">继续竞价</el-button>
      <el-button type="danger" @click="pay">结算</el-button>
    </div>
  </div>
  <el-dialog
      title="确定要支付吗？"
      :visible.sync="centerDialogVisible"
      width="30%"
      center>
    <span slot="footer" class="dialog-footer">
    <el-button @click="cancelDialog">取 消</el-button>
    <el-button type="primary" @click="submitDialog">确 定</el-button>
  </span>
  </el-dialog>
  <Footer></Footer>
</div>
</template>

<script>
import Header from "@/views/consumer/header/Header.vue";
import Footer from "@/views/consumer/footer/Footer.vue";
import {auctionSuccessReq} from '@/api/good.js'
import {genOrderReq} from '@/api/order.js'
import { GoodByIdReq } from '@/api/good.js';

export default {
  name: "AcutionSucess",
  components: {Footer, Header},
  data() {
    return {
      tableData: [
          {
        img:[
            {
              id:1,
              image_info:require("@/assets/jiu.jpg")
            },
        ],
        price: '800',
        total:"",
        sum:""
      },

      ],
      centerDialogVisible:false,
      currentPage: 1
    }
  },
  computed:{
    goodsTotalPrice() {
      var total = 0;
      this.tableData.forEach(row => {
        total += row.price;
      })
      return total;
    }
  },
  mounted() {
    auctionSuccessReq(this.currentPage, 10).then(response => {

    console.log(response.data)
      this.tableData = []
      response.data.forEach(entity => {
        var row = {
          img:[
            {
              id: entity.id,
              image_info:require("@/assets/jiu.jpg")
            },
          ],
          price: entity.price,
          id: entity.id
         }
         GoodByIdReq(entity.goodId).then(response => {
            this.$set(row, 'img', [{id:entity.goodId, image_info: response.data.imgUrl}])
          })

         if (entity.status === "pending") {
          this.tableData.push(row)
         }
      })

      console.log(response)
      
    }).catch(error => {
      this.$message.error("获取失败")
    })
  },
  methods:{
    goshopping(){
      this.$router.push("/consumer")
    },
    pay(){
        this.centerDialogVisible=true
    },
    cancelDialog(){
      this.centerDialogVisible=false
    },
    submitDialog(){

      this.tableData.forEach(x => {
        
        genOrderReq(x.id).then(response => {
          console.log("成功" + x.id);
        })
      })
      this.centerDialogVisible=false
      this.$message({
        type:"success",
        message:"支付成功"
      })

    }
  }


}
</script>

<style lang="scss" scoped>
.cart{

  width: 100%;
  background: rgb(249,248,246);
  border: 2px indianred solid;
  .total_price{
    margin-top: 30px;
    margin-left: 900px;
    font-size: 30px;
    color: red;
    span{
      margin-left: 100px;
    }
  }
  .bottom{
    padding-left: 40px;
    padding-right: 40px;
    margin-bottom: 30px;
    display: flex;
    justify-content: space-between;
  }
}


</style>