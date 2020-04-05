<template>
  <div>
    <ul>
      <li class="box"
          v-for="(item,index) in books"
          :key="index">
        <div>
          <el-image style="width:50%;height:200px;float:left"
                    :src='item.cover'
                    fit="fill"></el-image>
          <div class="info">
            <p>{{item.name}}</p>
            <p>{{item.author}}</p>
            <p>{{item.price}}</p>
            <p>{{item.ISBN}}</p>
          </div>
          <div>
            <a :href="item.detail"
               target="_blank">
              <el-button type="info"
                         round
                         class="detail"
                         size="small"
                         @click="detail(item.ISBN)">查看详情</el-button>
            </a>
            <el-button type="primary"
                       round
                       size="small"
                       @click="collect(item.ISBN)">收藏</el-button>

          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { collect, detail, recommendation } from '../../network/user';
export default {
  name: 'recommendation',
  data () {
    return {
      books: []
    }
  },

  methods: {
    detail (isbn) {
      detail(isbn, this.$store.state.username)
    },
    collect (isbn) {
      collect(isbn, this.$store.state.username)
        .then(res => {
          if (res.data.code === 200) {
            this.$message({
              message: '收藏成功，3秒后消失',
              type: 'success'
            })
          }

        })
    },

  },
  created () {
    recommendation(this.$store.state.username)
      .then(res => {
        console.log(res);
        
        if (res.data.code === 200) {
          this.books = res.data.data
        }

      })
  },
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
.detail {
  margin-top: 100px;
  margin-left: 5px;
}
.box {
  width: 30%;
  margin-left: 28px;
  list-style: none;
  float: left;
  margin-bottom: 70px;
}

.info {
  font-size: 13px;
  margin-left: 10px;
  float: left;
}
</style>