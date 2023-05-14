<template>
  <div class="personInfo">
    <el-form ref="registerForm" :model="registerForm" :rules="registerRules" label-width="80px" >
      <div class="title-container">
        <h3 class="title">商家个人信息</h3>
      </div>
      <el-form-item label="用户名" prop="username">
        <el-input v-model="registerForm.username" ></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="registerForm.password">
        </el-input>
      </el-form-item>
      <el-form-item label="姓名" prop="name">
        <el-input v-model="registerForm.name" disabled>
        </el-input>
      </el-form-item>
      <el-form-item label="手机" prop="phone">
        <el-input v-model="registerForm.phone" >
        </el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="registerForm.email" disabled>
        </el-input>
      </el-form-item>
      <el-form-item label="身份证" prop="idCard">
        <el-input v-model="registerForm.idCard"  disabled>
        </el-input>
      </el-form-item>
      <el-button type="primary" @click="cancelInfo" style="margin-left: 100px">取消修改</el-button>
      
      <el-button type="danger" @click="updateInfo">修改信息</el-button>
      <el-button @click="goback" type="info" >返回登录</el-button>

    </el-form>
  </div>
</template>

<script>
import { userUpdateReq, userGetReq } from '@/api/user.js'

export default {
  name: "Index",
  
  data() {
     //用户名验证
     const validateUsername = (rule, value, callback) => {
      //!validUsername(value)
      if (value.length <= 4) {
        //传入错误信息,不放行
        callback(new Error('请输入正确的用户名'))
      } else {
        //放行
        callback()
      }
    }
    //密码验证
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        //传入错误信息,不放行
        callback(new Error('密码的长度至少要为6位!'))
      } else {
        //放行
        callback()
      }
    }
    // 自定义手机号规则
    var validPhone = (rule, value, callback) => {
      const regMobile = /^1[34578]\d{9}$/
      if (regMobile.test(value)) {
        return callback()
      }
      // 返回一个错误提示
      callback(new Error('请输入合法的手机号码'))
    }


    // 自定义邮箱规则
    var validMail = (rule, value, callback) => {
      const regEmail = /^\w+@\w+(\.\w+)+$/
      if (regEmail.test(value)) {
        // 合法邮箱
        return callback()
      }
      callback(new Error('请输入合法邮箱'))
    }
    //身份证验证
    var checkIdentitytionId = (rule, value, callback) => {
      var errorMsg = isIdentityId(value);
      if (errorMsg != "") {
        callback(new Error(errorMsg));
      }
      return callback()
    }
    return {
      registerForm: {
        username: 'zhangyu',
        password: 'zhangyu123456',
        name: '张宇',
        phone: '15599003875',
        email:'1192372500@qq.com',
        id:'321281200007043697'
      },
      registerRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }],
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }],
        phone: [{ required: false, validator: validPhone, trigger: 'blur' }],
        email: [{ required: false, validator: validMail, trigger: 'blur' }],
        idCard: [{ required: true, validator: checkIdentitytionId, trigger: "blur" }]
      }
    }
  },
  mounted() {
    userGetReq().then(response => {
        this.registerForm.username = response.data.username;
        this.registerForm.password = response.data.password;
        this.registerForm.name = response.data.name;
        this.registerForm.phone = response.data.phone;
        this.registerForm.email = response.data.email;
        this.registerForm.idCard = response.data.idCard;
        this.registerForm.id = response.data.id;
    }).catch(error => {
      this.$message.error("获取失败")
    })
  },
  methods: {
    cancelInfo(){
      this.$router.push("/business/updataInfo")
    },
    updateInfo(){
      console.log(this.registerForm)
      this.registerForm.role = "businessman"
      userUpdateReq(this.registerForm).then(response => {

          console.log(response)
          this.$message.success("修改成功")

          
        }).catch(error => {
        this.$message.error("修改失败")
        })
    },
    goback(){
      this.$router.push('/')
    }
  }
}
</script>

<style lang="scss" scoped>
.personInfo {
  min-height: 100vh;
  width: 100%;
  background: url("@/assets/login.jpg");
  .el-form{
    margin: 0 auto;
    width: 500px;
    .title-container{
      text-align: center;
      padding: 40px 0;
      .title{
        font-size: 30px;
      }

    }
  }
}
</style>