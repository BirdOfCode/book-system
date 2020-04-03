<template>
  <div>
    <el-form ref="form"
             :model="book"
             label-width="80px"
             @submit.native.prevent='edit'>
      <el-form-item label="图书名字">
        <el-input v-model="book.name"></el-input>
      </el-form-item>
      <el-form-item label="作者">
        <el-input v-model="book.author"></el-input>
      </el-form-item>
      <el-form-item label="ISBN">
        <el-input v-model="book.ISBN"></el-input>
      </el-form-item>
      <el-form-item label="价格">
        <el-input v-model.number="book.price"></el-input>
      </el-form-item>
      <el-form-item label="种类">
        <el-input v-model="book.kind"></el-input>
      </el-form-item>
      <el-form-item label="封面">
        <el-input v-model="book.cover"></el-input>
      </el-form-item>
      <el-form-item label="详情页">
        <el-input v-model="book.detail"></el-input>
      </el-form-item>
      <el-form-item label="摘要">
        <el-input type="textarea"
                  v-model="book.abstract"></el-input>
      </el-form-item>
       <el-form-item label="关键词">
        <el-input v-model="book.keyWords" disabled></el-input>
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
import { searchBook, editBook } from '../../network/admin'
export default {
  data () {
    return {
      book: {}
    }
  },
  methods: {
    back () {
      this.$router.push('/admin/book/bookList')
    },
    edit () {
      editBook(this.$route.params.id, this.book)
        .then(res => {
          if (res.data.code === 200) {
            this.$message({
              message: '添加成功，3秒后消失',
              type: 'success'
            })
            this.$router.push('/admin/book/bookList')
          }
        })
    }
  },
  created () {
    searchBook(this.$route.params.id)
      .then(res => {
        if (res.data.code === 200) {
          this.book = res.data.data
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