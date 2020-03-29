<template>
  <div>
    <el-form ref="form"
             :model="user"
             label-width="80px"
             @submit.native.prevent='edit'>
      <el-form-item label="用户名">
        <el-input v-model="user.username"></el-input>
      </el-form-item>
      <el-form-item label="用户密码">
        <el-input v-model.number="user.password"></el-input>
      </el-form-item>
      <el-form-item label="用户类别">
        <el-input v-model.number="user.Identity"></el-input>
      </el-form-item>
      <el-form-item label="查询图书">
        <el-input v-model="user.detailId"></el-input>
      </el-form-item>
      <el-form-item label="收藏图书">
        <el-input v-model="user.collectId"></el-input>
      </el-form-item>
      <el-form-item label="关键词">
        <el-input v-model="user.keyWords"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary"
                   native-type="submit">修改</el-button>
        <el-button class="cancle"
                   @click="back">取消</el-button>

      </el-form-item>
    </el-form>

  </div>
</template>

<script>
import { searchUser, editUser } from '../../network/admin'
export default {
  data () {
    return {
      user: {}
    }
  },
  methods: {
    back () {
      this.$router.push('/admin/user/userList')
    },
    edit () {
      editUser(this.$route.params.id, this.user)
        .then(res => {
          if (res.data.code === 200) {
            this.$message({
              message: '修改成功，3秒后消失',
              type: 'success'
            })
            this.$router.push('/admin/user/userList')
          }
        })
    }
  },

  created () {
    searchUser(this.$route.params.id)
      .then(res => {
        if (res.data.code === 200) {
          this.user = res.data.data
          console.log(this.user.detailId);
          
        }
      })
  },
}
</script>
<style scoped>
.cancle {
  text-decoration: none;
  margin-left: 20px;
}
</style>