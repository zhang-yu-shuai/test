<template>
  <div>
    <el-button type="primary"  icon="el-icon-plus" @click="add">添加商品</el-button>
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
          label="商品编号"
          width="120">
      </el-table-column>
      <el-table-column
          prop="name"
          label="商品名称"
          width="130">
      </el-table-column>
      <el-table-column
          prop="goodType"
          label="商品类型"
          width="140">
      </el-table-column>
      <el-table-column
          prop="price"
          label="商品起拍价(￥)"
          width="150">
      </el-table-column>
      <el-table-column  prop="img" label="商品图片" width="200">
        <template slot-scope="scope">
          <el-image :src="scope.row.imgUrl"
                    style="width: 160px;height: 160px">
          </el-image>
        </template>
      </el-table-column>
      <el-table-column
          prop="description"
          label="商品描述">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
              type="warning"
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
        <el-form-item label="商品编号" :label-width="formLabelWidth">
          {{ form.id }}
        </el-form-item>
        <el-form-item label="商品名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="商品价格" :label-width="formLabelWidth">
          <el-input v-model="form.price" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="商品类型" :label-width="formLabelWidth">
          <el-input v-model="form.goodType" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="上传图片" :label-width="formLabelWidth">
          <el-upload
              action="http://127.0.0.1:9091/good/image/upload"
              list-type="picture-card"
              :file-list.sync="fileList"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
              :on-success="handleSuccess"
              :on-error="handleError"
              >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </el-form-item>
        <el-form-item label="商品描述" :label-width="formLabelWidth">
          <el-input v-model="form.description" autocomplete="off" style="width:500px"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="isAddForm ? handleAddGood() : handleUpdateGood()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

import { goodAddReq, goodUpdateReq, GoodDeleteByIdReq, GoodByUserReq } from '@/api/good.js'
import { GoodByIdReq } from '@/api/good.js';
import Vue from 'vue'

export default {
  name: "Index",
  
  data() {
    return {
      tableData: [
        {
          name:"红酒",
          price:18011,
          id:'115215682',
          img:[
            {
              id:1,
              image_info:require("../../../assets/jiu.jpg")
            },

          ],
          description: '响和风醇韵,的酿造灵感来自于东方二十四节气，融合了山崎师共同调制，'
        },
        {
          name:"保温杯",
          price:1802,
          id:'12323232',
          img: [
            {
              id:1,
              image_info:require("../../../assets/baowenbei.jpg")
            },

          ],
          description: '该酒的色泽为琥珀色，口感如蜜般香甜，'
        },
        
      ],
      dialogFormVisible: false,
      form: {
        id: '',
        name: '',
        price: "",
        imgUrl: "/img/1111",
        count: 1,
        description:''
      },
      fileList:[],
      isAddForm: false,
      formLabelWidth: '120px',
      dialogImageUrl: '',
      dialogVisible: false,
      currentPage:1,
      curentPageSize: 10,
      totalCnt: 0

    }
  },
  created() {
    this.fetchList();
  },
  methods:{
    resetForm() {
      this.form = {
        id: '',
        name: '',
        price: "",
        imgUrl: "/img/1111",
        count: 1,
        description:''
      }
      this.fileList=[]
    },
    fetchList() {
      
      GoodByUserReq(this.currentPage, this.curentPageSize).then(response => {
          this.tableData = response.data.items;
          this.totalCnt = response.data.total;

          this.tableData.map(x => {
          GoodByIdReq(x.id).then(response => {
            
            Vue.set(x, 'img', [{id: 1, image_info: response.data.imgUrl}]);
          })
        })
      })
    },
    add(){
      this.dialogFormVisible=true
      this.isAddForm = true;
      this.resetForm()
    },
    handleEdit(index, row) {
      this.dialogFormVisible=true
      this.isAddForm = false;
      this.form = row;
      this.fileList = []
    },
    handleError() {
      this.$message.error("上传失败")
    },
    handleSuccess(response, file, fileList) {
      this.form.imgUrl = response;
      console.log(response);
    },
    handleAddGood() {
      goodAddReq(this.form).then(response => {
          console.log(response)
            this.$message.success("添加成功")
      })   
      this.dialogFormVisible=false
    },
    handleUpdateGood() {

      goodUpdateReq(this.form).then(response => {
            this.$message.success("更新成功")
      })
      this.dialogFormVisible=false
    },
    handleRemove(file, fileList) {
    },
    handleDelete(index, row) {
      GoodDeleteByIdReq(row.id).then(response => {
          this.$message.success("删除成功")
      })
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleSizeChange(val) {
      this.curentPageSize = val;
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
.el-button{
  margin-left: 10px;
  margin-top: 15px;
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