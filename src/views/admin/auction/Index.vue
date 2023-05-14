<template>
  <div>
   <div class="top">
    <!-- <el-button type="primary"  icon="el-icon-plus" @click="add">添加</el-button> -->
     <!-- <el-input
         style="width: 300px"
         placeholder="请输入拍卖名称"
         v-model="input2"
         clearable>
     </el-input>
     <el-button type="primary">查询</el-button> -->
   </div>
    <el-table
        :data="tableData"
        border
        style="width: 100%">
      <el-table-column
          label="序号"
          width="80"
          type="index">
      </el-table-column>
      <el-table-column
          prop="id"
          label="拍卖编号"
          width="80">
      </el-table-column>
      <el-table-column
          prop="name"
          label="拍卖名称"
          width="80">
      </el-table-column>
      <el-table-column
          prop="initialPrice"
          label="商品起拍价(￥)"
          width="80">
      </el-table-column>
      <el-table-column
          prop="goodType"
          label="商品类型"
          width="80">
      </el-table-column>
      <el-table-column
          prop="price"
          label="最高出价(￥)"
          width="80">
      </el-table-column>
      <el-table-column
          prop="userName"
          label="最高出价人"
          width="80">
      </el-table-column>
      <el-table-column
          label="拍卖开始时间"
          width="150">
          <template slot-scope="{ row }">
            {{ row.startTime.slice(0, 16).replace('T', ' ') }}
          </template>
      </el-table-column>
      <el-table-column
          label="拍卖结束时间"
          width="150">
          <template slot-scope="{ row }">
            {{ row.endTime.slice(0, 16).replace('T', ' ') }}
          </template>
      </el-table-column>
      <el-table-column
          prop="owner"
          label="拍卖主"
          width="120">
      </el-table-column>
      <el-table-column  prop="img" label="商品图片" style="height: 150px" width="200">
        <template v-slot="scope">
          <el-image v-for="item in scope.row.img"
                    :key="item.id" :src="item.image_info" 
                    style="width: 150px;height: 150px">
          </el-image>
        </template>
      </el-table-column>
      <el-table-column
          prop="status"
          label="商品拍卖状态"
          width="120">
      </el-table-column>
      
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
              type="info"
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--   分页器-->
    <el-pagination
        style="margin-top: 20px"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCnt">
    </el-pagination>
    <!--    添加商品弹出框-->
    <el-dialog title="新建拍卖" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="拍卖编号" :label-width="formLabelWidth">
          {{ form.id }}
        </el-form-item>
        <el-form-item label="拍卖名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="拍卖商品ID" :label-width="formLabelWidth">
          <el-input v-model="form.goodId" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="商品起拍价(￥)" :label-width="formLabelWidth">
          <el-input v-model="form.initialPrice" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="商品类型" :label-width="formLabelWidth">
          <el-input v-model="form.goodType" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="最高出价(￥)" :label-width="formLabelWidth">
          {{ form.price }}
        </el-form-item>
        <el-form-item label="最高出价人Id" :label-width="formLabelWidth">
          {{ form.userId }}
        </el-form-item>
        <el-form-item label="拍卖时间" :label-width="formLabelWidth">
          <el-date-picker v-model="form.start" type="datetime" placeholder="Please pick a date" />
          <el-date-picker v-model="form.end" type="datetime" placeholder="Please pick a date" />
        </el-form-item>
        
        <el-form-item label="商品拍卖状态" :label-width="formLabelWidth">
          {{ form.status }}
        </el-form-item>

        <el-form-item label="拍卖描述" :label-width="formLabelWidth">
          <el-input v-model="form.description" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="isAddAuction ? handleAddAuction() : handleUpdateAuction()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>


<script>

import { auctionPageReq, auctionUpdateReq, auctionDeleteReq, auctionAddReq } from '@/api/good.js'
import moment from 'moment'
import { GoodByIdReq } from '@/api/good.js';
import Vue from 'vue'

export default {
  name: "Index",
  data() {
    return {
      input1:'',
      input2:'',
      tableData: [
        {
          id: 1,
          name:"红酒拍卖",
          initialPrice:18011,
          price:21212,
          userId:"27171827",
          status:"拍卖中",
          goodId:'115215682',
          description: "高端拍卖专场", 
          start: "2000-10-10",
          end: "2000-10-10",
          owner: "刘亦菲",
          img:[
            {
              id:1,
              image_info:require("../../../assets/jiu.jpg")
            }
          ],
        },
      ],
      dialogFormVisible: false,
      isAddAuction: false,
      form: {
        id: '',
        name: '',
        description:''
      },
      formLabelWidth: '120px',
      dialogImageUrl: '',
      dialogVisible: false,
      currentPage:1,
      currentPageSize: 10,
      totalCnt:1
    }
  },
  mounted() {
    this.fetchList();
  },
  methods:{
    fetchList() {
      auctionPageReq(this.currentPage - 1, this.currentPageSize).then(response => {

        console.log(response.data.items)
        this.tableData = response.data.items;
        this.tableData.forEach(x => {
          x.startTime = moment(x.start).format('YYYY-MM-DD HH:mm')
          x.endTime = moment(x.end).format('YYYY-MM-DD HH:mm')
        })
        this.totalCnt = response.data.total;

        this.tableData.map(x => {
          GoodByIdReq(x.goodId).then(response => {
            
            Vue.set(x, 'img', [{id: 1, image_info: response.data.imgUrl}]);
          })
        })
      })
    },
    resetForm() {
      this.form = {
        id: '',
          name:"",
          initialPrice: ' ',
          price: -1,
          userId: -1,
          status: "",
          goodId:'',
          description: "", 
          start: "",
          end: "",
          owner: "",
          status: "pending"
      }
    },
    handleAddAuction() {
      delete this.form.id;
      this.form.userId = -1;
      this.form.price = -1;
      this.form.status = "pending"
      console.log(this.form)
      auctionAddReq(this.form).then(response => {
          this.$message.success("更新成功")
      })   
      this.dialogFormVisible=false
    },
    handleUpdateAuction() {

      auctionUpdateReq(this.form).then(response => {
          this.$message.success("更新成功")
      })   
      this.dialogFormVisible=false
    },
    add(){
      this.resetForm();
      this.dialogFormVisible=true
      this.isAddAuction = true
    },
    handleEdit(index, row) {
      this.form = row;
      this.dialogFormVisible=true
      this.isAddAuction = false
    },
    handleDelete(index, row) {
      auctionDeleteReq(row.id).then(response => {
          this.$message.success("删除成功")
      })   
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleSizeChange(val) {
      this.currentPageSize = val;
      this.fetchList();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.fetchList();
    }
  }

}
</script>

<style lang="scss" scoped>
.top{
  margin-top: 20px;
  margin-left: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  .el-input{
    margin-right: 30px;
  }
  .el-button{
    margin-right: 30px;
    margin-top: 0;
  }
}
.el-button{
 margin-left: 10px;
 margin-top: 15px;
}
.el-table{
  color: black;
}
.el-upload {
  border: 1px solid black;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>