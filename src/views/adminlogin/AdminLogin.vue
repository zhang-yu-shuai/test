<template>
    <div class="adminlogin-container">
        <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" label-position="left">

            <div class="title-container">
                <h3 class="title">管理员登 录</h3>
            </div>

            <el-form-item prop="username">
                <el-input ref="username" v-model="loginForm.username" placeholder="请输入用户名" tabindex="1"
                    autocomplete="off" />
            </el-form-item>
            <el-form-item prop="password">
                <el-input type="password" :key="passwordType" ref="password" v-model="loginForm.password"
                    placeholder="请输入密码" name="password" autocomplete="off" @keyup.enter.native="handleLogin" />
            </el-form-item>

            <el-button :loading="loading" type="primary" style="margin-left: 130px; width:150px;margin-bottom:30px;margin-right: 90px"
                @click.native.prevent="handleLogin">登录</el-button>

        </el-form>
    </div>
</template>
  
<script>
export default {

    name: "AdminLogin",
    data() {
        //用户名验证
        const validateUsername = (rule, value, callback) => {
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

        return {
            loginForm: {
                username: 'admin',
                password: '123456'
            },
            loginRules: {
                username: [{ required: true, trigger: 'blur', validator: validateUsername }],
                password: [{ required: true, trigger: 'blur', validator: validatePassword }]
            },
            loading: false,
            passwordType: 'password',
            redirect: undefined,
        }

    },
    methods: {
        handleLogin() {

            if (this.loginForm.username === 'admin' && this.loginForm.password === '123456') {
                this.$router.push("/admin")
            }
        },
    }

}
</script>
  
<style lang="scss">
.adminlogin-container {
    min-height: 100vh;
    width: 100%;
    background: url("@/assets/adminlogin.png") no-repeat;
    background-size: 100%;

    .login-form {
        width: 400px;
        margin: 0 auto;
        position: relative;
        top: 200px;

        .title {
            text-align: center;
            font-size: 30px;
            font-weight: bold;
        }
    }
}
</style>