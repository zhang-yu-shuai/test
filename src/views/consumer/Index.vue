<template>
  <div class="container">
    <Header></Header>
    <div class="pic">
      <img src="@/assets/pic.jpg">
    </div>
    <div class="search">
      <div class="picture">
        <img src="@/assets/search.jpg">
      </div>
      <div class="btn">
        <el-input placeholder="请输入商品名称" v-model="search" clearable>
        </el-input>
        <el-button type="primary" @click="handleSearch">搜索</el-button>
      </div>
    </div>
    <div class="body-content" v-for="item2 in noticeList" :key="item2.id">
      <div class="bankuaiyi">
        <div class="mokuai1" v-for="item in foodList " :key="item.id">
          <img :src="item.img">
          <router-link :to="'/good/wine/' + item.id">
            <div class="word-tip">
              <p class="name">{{ item.name }}</p>
              <div class="sPrice">
                <span>起拍价：</span>
                <p>{{ item.price }}</p>
              </div>
              <div class="time">
                <p>{{ item.sTime }}</p>
                <p>{{ item.eTime }}</p>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </div>

    <el-pagination
      style="margin-top: 50px;margin-left: 370px"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
      :current-page="currentPage"
      :page-size="10"
      :page-sizes="[3,6,9,12,15]"
      layout="total,  prev, pager, next, jumper"
      :total="totalCnt"
      >
  </el-pagination
      >
    <Footer></Footer>
  </div>
</template>

<script>
import Header from "@/views/consumer/header/Header.vue";
import Footer from "@/views/consumer/footer/Footer.vue";
import { auctionPageReq, AuctionSearchReq } from '@/api/good.js'
import  moment  from 'moment'
import { GoodByIdReq } from '@/api/good.js';
import Vue from 'vue'

export default {
  name: "ConsumerIndex",
  components: { Footer, Header },
  data() {
    return {
      foodList: [
      ],
      currentPage: 1,
      noticeList: [
        {
          id: 1
        },

      ],
      search: '',
      totalCnt: 0,
      isInSearch: false
    }
  },
  mounted() {
    this.loadPageAuction();
  },
  methods: {

    handleSearch() {
      if (this.search === "") {
        this.isInSearch = false;
        this.loadPageAuction();
        return;
      }
      this.isInSearch = true;
      var currentDate = new Date();
      this.foodList = []
      AuctionSearchReq(this.search, this.currentPage, 10).then(response => {
        response.data.forEach(entity => {
          var row = {
            id: entity.id,
            img: require('@/assets/weishiji.jpg'),
            name: entity.name,
            price: entity.price,
            sTime: entity.start.slice(0, 16),
            eTime: entity.end.slice(0, 16)
          }
          GoodByIdReq(entity.goodId).then(response => {
            console.log(response.data.imgUrl)
            this.$set(row, 'img', response.data.imgUrl)
          })

          if (row.price < 0) {
            row.price = entity.initialPrice;
          }
          if (Date.parse(entity.end) > currentDate) {
            this.foodList.push(row)
          }
        })
      })
    },
    loadPageAuction() {

       var currentDate = new Date();
        this.foodList = [];
        auctionPageReq(this.currentPage - 1, 10).then(response => {
          response.data.items.forEach(entity => {
          var row = {
            id: entity.id,
            name: entity.name,
            price: entity.price,
            sTime: moment(entity.start).format('YYYY-MM-DD HH:mm'),
            eTime: moment(entity.end).format('YYYY-MM-DD HH:mm'),
          }
          GoodByIdReq(entity.goodId).then(response => {
            console.log(response.data.imgUrl)
            this.$set(row, 'img', response.data.imgUrl)
          })
          if (row.price < 0) {
            row.price = entity.initialPrice;
          }
          
          if (Date.parse(entity.end) > currentDate) {
            this.foodList.push(row)
          }
          this.totalCnt = response.data.total - (response.data.items.length -this.foodList.length);
        })
      })
    },
    handleCurrentChange(page) {
      this.currentPage = page;
      if (this.isInSearch) {
        this.handleSearch();
      } else {
        this.loadPageAuction();
      }
    },
    handleSizeChange(size) {
      // this.$refs.pagination.$el.setAttribute('page-size', size);
      // this.$refs.pagination.$forceUpdate();
      console.log(size);
    }

  }

}
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  width: 100%;
  background-color: #fff;
  //overflow: -scroll;
  overflow-x: hidden;
  overflow-y: hidden;

  .pic {
    img {
      width: 100%;
      height: 300px;
    }
  }

  .search {
    margin-top: 50px;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      margin-right: 30px;
      height: 100px;
      width: 100px;
    }

    .btn {
      display: flex;
      align-items: center;
      justify-content: center;

      .el-input {

        width: 300px;
        border: 2px darkred solid;

      }
    }
  }

  .body-content {
    padding-left: 60px;

    .title {
      margin-top: 30px;
      margin-bottom: 20px;
      padding-left: 60px;
      font-size: 30px;
      color: #333;
    }

    .bankuaiyi {
      display: flex;
      flex-wrap: wrap;

      .mokuai1 {
        margin-left: 50px;
        margin-right: 30px;
        margin-bottom: 40px;

        img {
          height: 300px;
          width: 340px;
        }

        .word-tip {
          font-size: 16px;
          font-weight: bold;
          color: #000000;
          //height: 200px;
          border: 1px solid #ededed;
          border-width: 0 1px 1px;

          .name {
            margin-bottom: 10px;
          }

          .sPrice {
            display: flex;
            align-items: center;

            span {
              color: gray;
            }

            p {

              font-size: 25px;
              color: red;
            }
          }

          .time {
            margin-top: 10px;

            font-weight: bold;

            p {
              margin-bottom: 10px;
            }

            ;
          }
        }

        .word-tip:hover {
          color: white;
          background: black;
        }
      }

    }
  }
}</style>