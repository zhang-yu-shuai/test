<template>
  <div class="register-container">
    <el-form ref="registerForm" :model="registerForm" :rules="registerRules" label-width="80px">
      <div class="title-container">
        <h3 class="title">注册</h3>
      </div>
      <el-form-item label="用户名" prop="username">
        <el-input v-model="registerForm.username" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="registerForm.password" placeholder="请输入密码">
        </el-input>
      </el-form-item>
      <el-form-item label="姓名" prop="name">
        <el-input v-model="registerForm.name" placeholder="请输入姓名">
        </el-input>
      </el-form-item>
      <el-form-item label="手机" prop="phone">
        <el-input v-model="registerForm.phone" placeholder="请输入手机号码">
        </el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="registerForm.email" placeholder="请输入邮箱">
        </el-input>
      </el-form-item>
      <el-form-item label="身份证" prop="idCard">
        <el-input v-model="registerForm.idCard" placeholder="请输入身份证号">
        </el-input>
      </el-form-item>
      <el-form-item label="收货地址" prop="address">
        <el-input v-model="registerForm.address" placeholder="请输入收货地址">
        </el-input>
      </el-form-item>
      <el-button type="primary" @click="submitForm('registerForm')" style="margin-left: 200px">注册</el-button>
      <el-button @click="resetForm(registerForm)">重置</el-button>
      <el-button @click="goback" type="info">返回</el-button>


    </el-form>
  </div>
</template>

<script>
import register from "@/views/Register.vue";
import { isIdentityId } from "../views/validate"
import { registerReq } from '@/api/auth.js'
export default {
  name: "Register",
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
        username: '',
        password: '',
        name: '',
        phone: '',
        email: '',
        idCard: '',
        address: ""
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
      },
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {

        if (valid) {

          if (this.$route.query.role == 1) {
            this.registerForm.role="business"
          } else {
            this.registerForm.role="consumer"
          }
          registerReq(this.registerForm).then(response => {
            this.$message("注册成功")
            this.$router.push("/login")
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      })
      // this.$router.push("/")
    },
    resetForm() {
      this.$refs.registerForm.resetFields();
    },
    goback(){
      this.$router.push('/')
    }
  },


}

</script>

<style lang="scss">
.register-container {
  min-height: 100vh;
  width: 100%;
  background: url("@/assets/login.jpg");

  .el-form {
    margin: 0 auto;
    width: 500px;

    .title-container {
      text-align: center;
      padding: 40px 0;

      .title {
        font-size: 30px;
      }

    }
  }
}
</style>