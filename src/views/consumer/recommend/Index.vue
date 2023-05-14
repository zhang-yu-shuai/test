<template>
    <div class="container">
        <Header></Header>
        <div class="pic">
            <img src="@/assets/pic.jpg">
        </div>
        <!-- <div class="search">
            <div class="picture">
                <img src="@/assets/search.jpg">
            </div> -->
            <!-- <div class="btn">
                <el-input placeholder="请输入商品名称" v-model="input" clearable>
                </el-input>
                <el-button type="primary">搜索</el-button>
            </div> -->
        <!-- </div> -->
        <div class="body-content" v-for="item2 in noticeList" :key="item2.id">
            <div class="title">商品推荐</div>
            <div  style="margin-left:50px">最相似用户： {{ nearUser }} </div>
            
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

        <el-pagination style="margin-top: 50px;margin-left: 370px" 
            @current-change="handleCurrentChange"
            :current-page="currentPage" 
            :page-size="pageSize"
            :total="totalCnt"
            layout="total, sizes, prev, pager, next, jumper">
        </el-pagination>
        <Footer></Footer>
    </div>
</template>
  
<script>
import Header from "@/views/consumer/header/Header.vue";
import Footer from "@/views/consumer/footer/Footer.vue";
import { auctionRecommendReq } from '@/api/good.js'
import  moment  from 'moment'
import { GoodByIdReq } from '@/api/good.js';
import Vue from 'vue'

export default {
    name: "AuctionRecommend",
    components: { Footer, Header },
    data() {
        return {
            foodList: [
                {
                    id: 1,
                    img: require('@/assets/weishiji.jpg'),
                    name: "响（Hibiki）和风醇韵 日本响威士忌 调和型  ",
                    price: '￥800',
                    sTime: "起拍时间：2023-03-01  10：00",
                    eTime: "结束时间：2023-03-08  10：00"
                },
            ],
            currentPage: 1,
            pageSize: 10,
            noticeList: [
                {
                    id: 1
                },

            ],
            input: '',
            totalCnt: 0,
            nearUser: ""

        }
    },
    mounted() {
        this.loadPageAuction();
    },
    methods: {
        loadPageAuction() {

            this.foodList = [];
            
            auctionRecommendReq(this.currentPage, this.pageSize).then(response => {
                response.data.items.forEach(entity => {
                    var row = {
                        id: entity.id,
                        img: require('@/assets/weishiji.jpg'),
                        name: entity.name,
                        price: entity.price,
                        sTime: moment(entity.start).format('YYYY-MM-DD HH:mm'),
                        eTime: moment(entity.end).format('YYYY-MM-DD HH:mm')
                    }
                    GoodByIdReq(entity.goodId).then(response => {             
                        this.$set(row, 'img', response.data.imgUrl)
                    })
                    this.foodList.push(row)
                })
                console.log(response.data.items)
                this.totalCnt = response.data.total;
                this.nearUser = response.data.nearUser;
            })
        },
        handleCurrentChange(page) {
            this.currentPage = page;
            this.loadPageAuction();
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
}
</style>