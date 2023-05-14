<template>
<div>
  <Header></Header>
    <div class="banner">
      <p>竞价记录管理</p>
    </div>
    <div class="success" v-for="item in successList" :key="item.id">
        <div class="jiaoyi">
          
          <router-link :to="'/good/wine/' + item.id">
            <img :src='item.img'>
          </router-link>
          <div class="word">
            <h3> {{ item.name }}</h3>
            <h5> 类型： {{ item.goodType }}</h5>
            <p class="des">商品起拍价格：<i>{{ item.initialPrice }}</i></p>
            <p class="my">我的出价：<span >{{ item.myPrice }}</span></p>
            <p class="my"> 出价时间：<span>{{ item.myTime }}</span></p>
            <p class="max">当前最高出价：<span>{{ item.currentPrice }}</span></p>
            <p>{{ item.startTime }} - {{ item.endTime }}</p>
          </div>
          
          
        </div>
    </div>
  <el-pagination
      style="margin-top: 50px;margin-left: 370px"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      >
  </el-pagination
      >
  <Footer></Footer>
</div>
</template>

<script>
import jiu from "@/views/consumer/goods/wine/Index.vue";
import Header from "@/views/consumer/header/Header.vue";
import Footer from "@/views/consumer/footer/Footer.vue";
import {auctionUserHistoryReq} from '@/api/good.js'
import  moment  from 'moment'
import { GoodByIdReq } from '@/api/good.js';

export default {
  name: "AcutionHistory",
  components: {Footer, Header,jiu},
  data(){
    return{
      input: jiu.data().price,
      successList:[
      ],
      currentPage:1
    }
  },
  mounted() {
    this.loadHistory();
  },
  
  methods:{
    loadHistory() {
      auctionUserHistoryReq(this.currentPage, 10).then(response => {
      
      console.log(response)
      this.successList = []
      response.data.forEach(entity => {
        console.log(entity)
        console.log("======")
        var row = {
          id: entity.id,
          actionId: entity.actionId,
          name: entity.auctionName,
          initialPrice: entity.initialPrice,
          currentPrice: entity.currentPrice,
          myPrice: entity.price,
          img: entity.goodImgUrl,
          goodType: entity.goodType,
          myTime: moment(entity.actionTime).format('YYYY-MM-DD HH:mm'),
          startTime: moment(entity.startTime).format('YYYY-MM-DD'),
          endTime: moment(entity.endTime).format('YYYY-MM-DD')
         }
         
         this.successList.push(row)
      })
      console.log(this.successList)
      
    }).catch(error => {
      this.$message.error("获取失败")
    })
    },

    handleCurrentChange(page) {
      this.currentPage = page;
      this.loadHistory();
    },

   
  }
}
</script>

<style  lang="scss" scoped>
.banner{
  width: 100%;
  height: 200px;
  background: url("@/assets/success.jpg");
  display: flex;
  p{
    font-size: 50px;
    color: white;
    margin:auto;
  }
}
.success{
  margin-left: 300px;

  img{
    height: 150px;
    width: 200px;
  }
  .jiaoyi{
    margin-top: 20px;
    display: flex;
    .word{
      width: 650px;
      margin-left: 30px;
      h3{
        margin-bottom: 10px;
      }
      .des{
        margin-bottom: 10px;
        i{
          font-size: 20px;
          color: red;
        }
      }
      .my{
        margin-bottom: 10px;
        span{
          color: red;
          font-size: 20px;
        }
      }
      .max{
        margin-bottom: 10px;
        span{
          color: red;
          font-size: 20px;
        }
      }
    }
  }

}
</style>