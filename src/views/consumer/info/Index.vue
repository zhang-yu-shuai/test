<template>
  <div>
    <Header></Header>
    <div class="personInfo">
      <el-form ref="userInfo" :model="userInfo" :rules="updateRules" label-width="80px">
        <div class="title-container">
          <h3 class="title">个人信息</h3>
        </div>
        <el-form-item label="用户名" prop="username">
          <el-input v-model="userInfo.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="userInfo.password">
          </el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="userInfo.name" disabled>
          </el-input>
        </el-form-item>
        <el-form-item label="手机" prop="phone">
          <el-input v-model="userInfo.phone">
          </el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="userInfo.email" disabled>
          </el-input>
        </el-form-item>
        <el-form-item label="身份证" prop="idCard">
          <el-input v-model="userInfo.idCard" disabled>
          </el-input>
        </el-form-item>
        <el-form-item label="收获地址" prop="address">
          <el-input v-model="userInfo.address" disabled>
          </el-input>
        </el-form-item>
        <el-button type="primary" @click="cancelInfo" style="margin-left: 200px">取消修改</el-button>
        
        <el-button type="danger" @click="updateInfo">修改信息</el-button>

      </el-form>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from "@/views/consumer/header/Header.vue";
import Footer from "@/views/consumer/footer/Footer.vue";
import { userUpdateReq, userGetReq } from '@/api/user.js';

export default {
  name: "ConsumerInfo",
  components: { Footer, Header },
  data() {
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
   
    return {
      userInfo: {
        username: 'zhangyu',
        password: 'zhangyu123456',
        name: '张宇',
        phone: '15599003875',
        email: '1192372500@qq.com',
        id: 1,
        idCard: '321281200007043697',
        role: "consumer"
      },
      updateRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }],
        phone: [{ required: true, validator: validPhone, trigger: 'blur' }],
      }
    }
  },
  mounted() {
    userGetReq().then(response => {
      console.log("ccc")
      console.log(response)
      console.log(response.data.idCard)
        this.userInfo.username = response.data.username;
        this.userInfo.password = response.data.password;
        this.userInfo.name = response.data.name;
        this.userInfo.phone = response.data.phone;
        this.userInfo.email = response.data.email;
        this.userInfo.idCard = response.data.idCard;
        this.userInfo.id = response.data.id;
        this.userInfo.address = response.data.address;
    }).catch(error => {
      console.log(error)
      this.$message.error("获取失败")
    })
  },
  methods: {
    cancelInfo() {
      this.$router.push("/consumer")
    },
    updateInfo() {
      userUpdateReq(this.userInfo).then(response => {

        console.log(this.userInfo)
        this.$message.success("修改成功")
        this.$router.push("/")
      }).catch(error => {
        console.log(this.userInfo)
        this.$message.error("修改失败")
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.personInfo {
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