<template>
  <div class="login">
    <el-card class="box-card">
      <p class="title">用户注册</p>
      <el-form :model="userInfo"
               :rules="rules"
               ref="ruleForm"
               label-width="100px"
               class="demo-ruleForm">
        <el-form-item label="用户名"
                      prop="username">
          <el-input v-model="userInfo.username"></el-input>
        </el-form-item>
        <el-form-item label="密码"
                      prop="password">
          <el-input v-model="userInfo.password"
                    show-password></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     @click="submitForm('ruleForm')">注册</el-button>
          <el-button @click="To">返回</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { register } from '../network/main'

export default {
  data () {
    return {
      userInfo: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 4, max: 16, message: '长度在 4 到 16 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 4, max: 16, message: '长度在 4 到 16 个字符', trigger: 'blur' }
        ],

      }
    };
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate()
        .then(res => {
          register(this.userInfo)
            .then(res => {
              res = res.data
              if (res.code === 200) {
                this.$message({
                  message: '用户注册成功，请登录',
                  type: 'success'
                })
                this.$router.push('/login')
              } else {
                this.$message.error('用户已注册')
              }
            })
        },
          err => {
            return false
          })
    },
    To () {
      this.$router.push('/login')
    }
  }

}
</script>
<style scoped>
.title {
  font-size: 35px;
  margin: 0 0 30px 0;
  text-align: center;
}
.login {
  background-image: url("../assets/img/bg1.jpg");
  height: 100vh;
}
.box-card {
  position: absolute;
  width: 500px;
  height: 300px;
  top: 50%;
  left: 50%;
  margin: -150px 0 0 -250px;
  background-color: rgba(255, 255, 255, 0.5);
}
.el-button {
  margin-right: 30px;
}
</style>