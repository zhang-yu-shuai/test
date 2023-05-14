<template>
  <div>
    <div class="top">
      <el-button  type="primary"  icon="el-icon-plus" @click="add">添加用户</el-button>
      <!-- <el-input
          style="width: 300px"
          placeholder="请输入用户账号"
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
          label="账号"
          width="150">
      </el-table-column>
      <el-table-column
          prop="password"
          label="密码"
          width="150">
      </el-table-column>
      <el-table-column
          prop="username"
          label="用户名"
          width="180">
      </el-table-column>
      <el-table-column
          prop="idCard"
          label="身份证"
          width="160">
      </el-table-column>
      <el-table-column
          prop="role"
          label="用户类型"
          width="160">
      </el-table-column>
      <el-table-column
          prop="phone"
          label="手机号码"
          width="200">
      </el-table-column>
      <el-table-column
          prop="email"
          label="邮箱"
          width="200">
      </el-table-column>
      <el-table-column
          prop="address"
          label="收/发货地址"
          width="200">
      </el-table-column>

      <el-table-column label="操作" width="200">
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
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCnt">
    </el-pagination>
    <!--    添加商品弹出框-->
    <el-dialog title="添加用户" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="账号" :label-width="formLabelWidth">
          {{ form.id }}
        </el-form-item>
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色" :label-width="formLabelWidth">
          <el-input v-model="form.role" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="身份证" :label-width="formLabelWidth">
          <el-input v-model="form.idCard" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth">
          <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="收/发地址" :label-width="formLabelWidth">
          <el-input v-model="form.address" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="isAddForm ? handleCreate(): handleUpdate()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>


<script>

import { userGetAllReq, userDelReq, userUpdateReq } from '@/api/user.js'


export default {
  name: "AdminUser",
  data() {
    return {
      input1:'',
      input2:'',
      tableData: [
        {
          account: '12121212',
          password:'zhnahljwqw',
          name:'zhangfei',
          type:'卖家',
          tel:'15599003875'
        },
        
      ],
      dialogFormVisible: false,
      form: {
        id: '',
        role:"",
        password:'',
        tel:"",
        username: '',
        phone:"",
        email:""
      },
      isAddForm: true,
      formLabelWidth: '120px',
      dialogImageUrl: '',
      dialogVisible: false,
      currentPage: 1,
      pageSize: 10,
      totalCnt: 1
    }
  },
  created() {
    this.getList();
  },
  methods:{
    resetForm() {
      this.form = {
        id: '',
        role:"",
        password:'',
        tel:"",
        username: '',
        phone:"",
        email:""
      }
    },
    add(){
      this.dialogFormVisible=true
      this.isAddForm = true
      this.resetForm();
    },
    handleCreate() {
      delete this.form.id;
      userUpdateReq(this.form).then(response => {
        this.$message.success("添加成功")
      })
      console.log(">>>")
      this.dialogFormVisible=false
    },
    handleUpdate() {
      userUpdateReq(this.form).then(response => {
        this.$message.success("更新成功")
      })
      this.dialogFormVisible=false
    },
    handleEdit(index, row) {
      this.form = row
      this.dialogFormVisible=true
      this.isAddForm = false
    },

    handleDelete(index, row) {
      userDelReq(row.id).then(response => {
        this.$message.success("删除成功")
        this.tableData.shift(index)
      })
    },
    getList() {

      userGetAllReq(this.currentPage - 1, this.pageSize).then(response => {
        this.tableData = response.data.items
        this.totalCnt = response.data.total
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
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  }

}
</script>

<style lang="scss" scoped>
.top{
  margin-top: 20px;
  margin-left: 20px;
  display: flex;
  align-items: center;

  .el-input{
    margin-left: 150px;
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