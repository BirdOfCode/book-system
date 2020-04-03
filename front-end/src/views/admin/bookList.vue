<template>

  <div>

    <el-table :data="books"
              stripe>
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left"
                   class="demo-table-expand">
            <el-form-item label="图书名字">
              <span>{{ props.row.name }}</span>
            </el-form-item>
            <el-form-item label="作者">
              <span>{{ props.row.author }}</span>
            </el-form-item>
            <el-form-item label="价格">
              <span>{{ props.row.price }}</span>
            </el-form-item>
            <el-form-item label="种类">
              <span>{{ props.row.kind }}</span>
            </el-form-item>
            <el-form-item label="ISBN">
              <span>{{ props.row.ISBN }}</span>
            </el-form-item>
            <el-form-item label="摘要">
              <span>{{ props.row.abstract }}</span>
            </el-form-item>
            <el-form-item label="关键词">
              <span>{{ props.row.keyWords }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column prop="name"
                       label="图书名字">
      </el-table-column>
      <el-table-column prop="ISBN"
                       label="ISBN">
      </el-table-column>
      <el-table-column prop="price"
                       label="价格">
      </el-table-column>
      <el-table-column prop="kind"
                       label="种类">
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
import { getAllBook, delBook } from '../../network/admin'
export default {
  name: 'bookList',
  data () {
    return {
      books: [],
    }
  },
  methods: {
    getAll () {
      getAllBook()
        .then(res => {
          res = res.data
          if (res.code === 200) {
            this.books = res.data
          }
        })
    },
    del (id) {
      delBook(id)
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
      this.$router.push(`/admin/book/editBook/${id}`)
    }
  },
  created () {
    this.getAll()
  },
  components: {

  }
}
</script>

<style scoped>

.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  /* width: 50%; */
  color: peru;
}
</style>