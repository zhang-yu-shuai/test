<template>
  <div>
    <div class="top">

      <!-- <el-input
          style="width: 300px"
          placeholder="请输入拍卖名称"
          v-model="input2"
          clearable>
      </el-input>
      <el-button type="info">查询</el-button> -->
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
          label="订单编号"
          width="120">
      </el-table-column>
      <el-table-column
          prop="goodId"
          label="商品编号"
          width="120">
      </el-table-column>
      <el-table-column
          prop="goodName"
          label="商品名称"
          width="80">
      </el-table-column>
      <el-table-column
          prop="buyerName"
          label="买家姓名"
          width="120">
      </el-table-column>
      <el-table-column
          prop="buyerPhone"
          label="手机号码"
          width="120">
      </el-table-column>
      <el-table-column
          prop="buyerId"
          label="账号"
          width="120">
      </el-table-column>
      <el-table-column
          prop="status"
          label="订单状态"
          width="120">
      </el-table-column>
      <el-table-column
          prop="buyerAddress"
          label="配送地址"
          width="150">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
              type="primary"
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
    <el-dialog title="添加商品" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="订单编号" :label-width="formLabelWidth">
          {{ form.id }}
        </el-form-item>
        <el-form-item label="订单状态" :label-width="formLabelWidth">
          <el-input v-model="form.status" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleUpdateOrder()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>


<script>

import { getOwnerPageOrder, delOrder, updateAuctionStatus } from '@/api/order.js'



export default {
  name: "BusinessOrder",
  data() {
    return {
      input1:'',
      input2:'',
      tableData: [
        {
          id:"1212121",
          name:"红酒",
          price:18011,
          tel:13236151282,
          consumer:'张三丰',
          account:"27171827",
          goodsId:'115567',
          address:'上海市静安区XXX小区301室',
          status: "配送中"
        }
      ],
      isEditStatus: false,
      dialogFormVisible: false,
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
      totalCnt: 1
    }
  },
  mounted() {
    this.fetchList();
  },
  methods:{
    fetchList() {
      getOwnerPageOrder(this.currentPage - 1, this.currentPageSize).then(response => {

        this.tableData = response.data.items;
        this.totalCnt = response.data.total;
      })
    },
    add(){
      this.dialogFormVisible=true
    },
    handleUpdateOrder() {
      updateAuctionStatus(this.form.id, this.form.status).then(response => {
        this.$message.success("更新成功")
      })
      this.isEditStatus = false;
      this.dialogFormVisible=false;
    },
    handleDelete(index, row) {
      delOrder(row.id).then(response => {
          this.$message.success("删除成功")
      })
    },
    handleEdit(index, row) {
      this.form = row;
      this.isEditStatus = true;
      this.dialogFormVisible=true
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
    margin-left: 0;
    margin-top: 0;
  }
}
//.el-button{
//  margin-left: 10px;
//  margin-top: 15px;
//}
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