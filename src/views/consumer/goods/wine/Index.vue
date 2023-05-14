<template>
  <div>
    <Header></Header>
    <div class="jiu1">
      <div class="left">
        <img :src="imgeUrl" class="jiu1">
        <!--     <img src="../../../../assets/pingjia.jpg" class="pingjia">-->
      </div>
      <div class="right">
        <h1>{{ name }} </h1>
        <h4>{{ goodType }}</h4>
        <p class="des">
          {{ description }}
        </p>
        <div class="price">
          <p>起拍价：￥<span>{{ auction_initial_price }}</span></p>
        </div>
        <div class="price">
          <p>当前价：￥<span>{{ auction_price }}</span></p>
        </div>
        <div class="price">
          <p>出价人：<span>{{ user_name }}</span></p>
        </div>
        <div class="dateTime">
          <p>
            起拍时间：{{ auction_start }}
          </p>
          <p>结束时间：{{ auction_end }}
          </p>
        </div>
        <div class="jingjia">
          <span>竞价:</span>
          <el-input placeholder="请输入价格" v-model="my_auction_price" clearable>
          </el-input>
          <el-button type="primary" @click="bidPre">开始竞价</el-button>
        </div>
        <!--      商品留言-->
        <!--      <div class="liuyan">-->
        <!--        <h2>商品留言</h2>-->
        <!--        <el-input-->
        <!--            type="textarea"-->
        <!--            :autosize="{ minRows: 4, maxRows: 6}"-->
        <!--            placeholder="请输入内容"-->
        <!--            v-model="textarea2">-->
        <!--        </el-input>-->
        <!--        <div class="btn">-->
        <!--          <el-button type="info" @click="reset">重置</el-button>-->
        <!--          <el-button type="success" @click="submit">提交</el-button>-->
        <!--        </div>-->
        <!--      </div>-->
        <!--      <div class="pingjia">-->
        <!--        <h2>商品评价</h2>-->
        <!--        <div class="word">-->

        <!--            <div class="word1">-->
        <!--             {{word}}-->
        <!--            </div>-->
        <!--        </div>-->
        <!--        <el-button type="danger" @click="review">评价商品</el-button>-->
        <!--      </div>-->
      </div>
      <el-dialog title="目前你是最高出价者，确定要继续吗？" :visible.sync="dialogBidVisible" width="30%" center>
        <span slot="footer" class="dialog-footer">
          <el-button @click="cancelBid">取 消</el-button>
          <el-button type="primary" @click="submitBid">确 定</el-button>
        </span>
      </el-dialog>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from "@/views/consumer/header/Header.vue";
import Footer from "@/views/consumer/footer/Footer.vue";
import { auctionGetReq, auctionBidReq } from '@/api/good.js'
import { userGetReq } from '@/api/user.js';
import moment from 'moment'
import { GoodByIdReq } from '@/api/good.js';
import Vue from 'vue'

export default {
  name: "Wine",
  components: { Footer, Header },
  props: ['id'],
  data() {
    return {
      imgeUrl: "",
      auction_price: 800,
      auction_initial_price: 800,
      name: "响（Hibiki）和风醇韵 日本响威士忌 调和型",
      desc: "\"响和风醇韵\",的酿造灵感来自于东方二十四节气，融合了山崎，白州和众多蒸馏厂酿制的12种以上麦芽和谷物威士忌原酒，由三得利第三代总调配师和第四代总调配师共同调制，该酒的色泽为琥珀色，口感如蜜般香甜，入口圆润，具有花香，劲爽细腻，水木香气，余韵流长",
      dialogVisible: false,
      auction_start: "2023-03-01  10:00",
      auction_end: "2023-03-08  10:00",
      user_name: "",
      my_auction_price: "",
      dialogBidVisible: false
    }
  },
  mounted() {
    this.fetch();
  },
  methods: {
    // 商品评价的方法
    cancel() {
      this.dialogVisible = false
    },
    define() {
      this.dialogVisible = false
    },
    cancelBid() {
      this.dialogBidVisible = false
    },
    submitBid() {
      this.dialogBidVisible = false
      this.bid()
    },

    fetch() {
      auctionGetReq(this.id).then(response => {
        this.name = response.data.name;
        this.description = response.data.description;
        console.log(this.description)
        console.log(response)
        console.log("kkkkkk")
        this.auction_price = response.data.price;
        this.user_name = response.data.userName;
        this.auction_initial_price = response.data.initialPrice;
        this.goodType = response.data.goodType;
        this.auction_start = moment(response.data.start).format('YYYY-MM-DD HH:mm')
        this.auction_end = moment(response.data.end).format('YYYY-MM-DD HH:mm')

        if (this.auction_price == -1) {
          this.auction_price = this.auction_initial_price;
        }

        GoodByIdReq(response.data.goodId).then(response => {
          this.$set(this, 'imgeUrl', response.data.imgUrl)
        })

      }).catch(error => {
        this.$message.error("获取失败")
        console.log(error)
      })
    },
    // 商品留言的方法
    submit() {
      this.textarea2 = ""
      this.$message({
        type: "success",
        message: "留言成功"
      })
    },
    reset() {
      this.textarea2 = ''
    },
    review() {
      this.dialogVisible = true
    },
    // 商品竞价的方法
    bidPre() {
      userGetReq().then(response => {
        if (response.data.username === this.user_name) {
          this.dialogBidVisible = true;
        } else {
          this.bid();
        }
      })
    },
    bid() {
      if (this.my_auction_price <= this.auction_price) {
        this.$message.error("竞价失败，输入的价格低于当前价格")
        return;
      }
      auctionBidReq(this.id, this.my_auction_price).then(response => {
        console.log(this.my_auction_price)
        console.log("=====cccc")
        this.auction_price = this.my_auction_price;
        this.$message.success("竞拍成功")
        this.fetch()
      }).catch(error => {
        this.$message.error("竞拍失败")
      })
    }
  }

}
</script>

<style lang="scss" scoped>
.jiu1 {
  display: flex;

  //background: url("@/assets/login.jpg");
  .left {
    width: 600px;
    margin-right: 80px;

    .jiu1 {
      width: 600px;
      height: 650px;
    }

    .pingjia {
      width: 600px;
      height: 500px;
    }
  }

  .right {
    h2 {
      margin-top: 30px;
    }

    .des {
      margin-top: 40px;
      width: 600px;
    }

    .price {
      margin-top: 50px;
      font-size: 30px;
      font-weight: bold;
      color: rgba(255, 0, 0, 0.8);
    }

    .jingjia {
      display: flex;
      align-items: center;
      font-size: 25px;
      margin-top: 50px;

      .el-input {
        width: 300px;
        margin-left: 20px;
      }
    }

    .liuyan {
      .el-input {
        margin-top: 30px;
      }
    }

    .dateTime {
      margin-top: 20px;
      font-size: 20px;
    }

    .pingjia {
      .word {
        padding: 30px;
        height: 600px;
        border: 2px gray solid;
        //background: url("@/assets/login.jpg");
      }

      .el-button {
        margin-left: 260px;
      }
    }
  }
}
</style>