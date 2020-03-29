<template>
  <div>
    <el-card class="box-card">
      <p class="title">图书推荐系统</p>
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
                     @click="submitForm('ruleForm')">登录</el-button>
          <el-button @click="To">注册</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { login } from '../network/main'

export default {
  data () {
    return {
      userInfo: {
        username: 'admin',
        password: 'aaaaa'
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 4, max: 16, message: '长度在 4 到 16 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 4, max: 16, message: '长度在 4 到 16 个数字', trigger: 'blur' }
        ],

      }
    };
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate()
        .then(() => {
          login(this.userInfo)
            .then(res => {
              res = res.data
              if (res.code === 200) {
                this.$store.commit('changeLogin', res.token)
                this.$store.commit('changeUsername', res.data.username)
                if (res.data.Identity === 1) {
                  this.$message({
                    message: '管理员登录成功，3秒后消失',
                    type: 'success'
                  })
                  this.$router.push('/admin')
                } else {
                  this.$message({
                    message: '用户登录成功，3秒后消失',
                    type: 'success'
                  })
                  this.$router.push('/user')
                }
              } else {
                this.$message.error('登录失败，用户名或密码错误')
              }
            })
        }
        )
    },
    To () {
      this.$router.push('/register')
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
.box-card {
  position: absolute;
  width: 500px;
  height: 300px;
  top: 50%;
  left: 50%;
  margin: -150px 0 0 -250px;
}
.el-button {
  margin-right: 30px;
}
</style>