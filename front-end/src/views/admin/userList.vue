<template>

  <div>

    <el-table :data="users"
              stripe>
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left"
                   class="demo-table-expand">
            <el-form-item label="查看过详情的图书ISBN">
              <span>{{ props.row.detailId}}</span>
            </el-form-item>
            <el-form-item label="收藏过的图书ISBN">
              <span>{{ props.row.collectId}}</span>
            </el-form-item>
            <el-form-item label="用户关键词">
              <span>{{ props.row.keyWords}}</span>
            </el-form-item>
            <el-form-item label="创建时间">
              <span>{{ createTime(props.row.createTime)}}</span>
            </el-form-item>
            <el-form-item label="上次修改时间">
              <span>{{ updataTime(props.row.updateTime)}}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column prop="username"
                       label="用户名">
      </el-table-column>
      <el-table-column prop="password"
                       label="用户密码">
      </el-table-column>
      <el-table-column prop="Identity"
                       label="用户类别">
      </el-table-column>

      <el-table-column fixed="right"
                       label="操作"
                       width="100">
        <template slot-scope="scope">

          <el-button @click="edit(scope.row._id)"
                     type="text"
                     size="small">修改</el-button>
          <el-button @click="del(scope.row._id)"
                     type="text"
                     size="small">删除</el-button>

        </template>
      </el-table-column>
    </el-table>
  </div>

</template>

<script>

import { getAllUser, delUser } from '../../network/admin'
export default {
  name: 'bookList',
  data () {
    return {
      users: [],
      searchId: [],
      show: false
    }
  },
  methods: {
    createTime (time) {
      return new Date(time).toLocaleString()
    },
    updataTime (time) {
      return new Date(time).toLocaleString()
    },
    getAll () {
      getAllUser()
        .then(res => {
          res = res.data
          if (res.code === 200) {
            this.users = res.data
          }
        })
    },
    del (id) {
      delUser(id)
        .then(res => {
          if (res.data.code === 200) {
            this.$message({
              message: '删除成功，3秒后消失',
              type: 'success'
            })
          }
          this.getAll()
        })
    },
    edit (id) {
      this.$router.push(`/admin/user/edituser/${id}`)
    },
    // isShow (Identity) {
    //   if (Identity === 1) {
    //     return true
    //   }
    // }
  },

  created () {
    this.getAll()
  }

}
</script>

<style scoped>
body {
  margin: 0;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  /* width: 50%; */
  color: peru;
}
</style>