<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form"  label-position="left">

      <div class="title-container">
        <h3 class="title">登 录</h3>
      </div>

      <el-form-item prop="username">
        <el-input
            ref="username"
            v-model="loginForm.username"
            placeholder="请输入用户名"
            tabindex="1"
            autocomplete="off"
        />
      </el-form-item>
      <el-form-item prop="password">
        <el-input
             type="password"
            :key="passwordType"
            ref="password"
            v-model="loginForm.password"
            placeholder="请输入密码"
            name="password"
            autocomplete="off"
            @keyup.enter.native="handleLogin"
        />
      </el-form-item>

      <el-radio  v-model="radio" label="1"  style="font-size: 20px;font-weight: bold; margin-right: 200px;margin-bottom: 20px">注册商家</el-radio>
      <el-radio  v-model="radio" label="2"  style="font-size: 20px;font-weight: bold;">注册会员</el-radio>

      <el-button :loading="loading" type="primary" style="width:150px;margin-bottom:30px;" @click.native.prevent="handleRegister">注册</el-button>
      <el-button :loading="loading" type="primary" style="width:150px;margin-bottom:30px;margin-right: 90px" @click.native.prevent="handleLogin">登录</el-button>
    
    </el-form>
  </div>
</template>

<script>
import {loginReq} from '@/api/auth.js'
export default {

  name: "Login",
  data(){
    //用户名验证
    const validateUsername = (rule, value, callback) => {
      //!validUsername(value)
      if (value.length<=4) {
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

    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined,
      radio:"2",
    }

  },
  methods:{
    handleLogin() {

      loginReq(this.loginForm).then(response => {
        localStorage.setItem('token', response.data.token)

        this.$message.success("登录成功")
        if (response.data.role === "consumer") {
          this.$router.push("/consumer")
        } else {
          this.$router.push("/business")
        }
      })
    },
    //跳转到注册页面
    handleRegister(){

      console.log(this.radio)
      this.$router.push({
        path: '/register',
        query: { role: this.radio }
      })
    }
  }

}
</script>

<style lang="scss">
.login-container{
  min-height: 100vh;
  width: 100%;
  background:url("@/assets/login.jpg");
  .login-form{
    width: 400px;
    margin:0 auto;
    position: relative;
    top: 200px;
    .title{
      text-align: center;
      font-size:30px;
      font-weight: bold;
    }
  }
}
</style>