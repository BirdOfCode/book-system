<template>
  <div>
    <el-container style="height: 100vh; border: 1px solid #eee">
      <el-aside width="200px"
                style="background-color: rgb(238, 241, 246)">
        <el-menu :default-openeds="['1','2']"
                 router>
          <el-submenu index="1">
            <template slot="title"><i class="el-icon-tickets"></i>图书信息管理</template>
            <el-menu-item-group>
              <el-menu-item index="/admin/book/bookList">图书列表</el-menu-item>
              <el-menu-item index="/admin/book/creatBook">添加图书</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title"><i class="el-icon-s-custom"></i>用户信息管理</template>
            <el-menu-item-group>
              <el-menu-item index="/admin/user/userList">用户列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

        </el-menu>
      </el-aside>

      <el-container>
        <el-header style="text-align: right; font-size: 14px">
          <el-dropdown @command="out">
            <i class="el-icon-setting"
               style="margin-right: 10px"></i>
            <el-dropdown-menu slot="dropdown"
                              @click="out">
              <el-dropdown-item>退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <span>{{$store.state.username}}</span>
        </el-header>

        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped>
body{
  margin: 0;
  padding: 0;
}
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
 
}
</style>

<script>
export default {
  data () {

    return {

    }
  },
  methods: {
    out () {
      localStorage.clear();
      this.$router.push('/login')
    }
  },
}
</script>