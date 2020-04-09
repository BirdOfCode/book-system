 <template>
  <div>
    <el-container style="border: 1px solid #eee">
      <el-header style="font-size: 12px">
        <el-row class="demo-autocomplete"
                :gutter="20">
          <el-col :span="4">
            <i class="el-icon-collection">图书推荐系统</i>
          </el-col>
          <el-col :span="16">

            <div class="grid-content bg-purple">
              <el-autocomplete class="inline-input"
                               style="width:30vw"
                               v-model="state"
                               :fetch-suggestions="querySearch"
                               placeholder="请输入内容"
                               :trigger-on-focus="false">
                <el-button slot="append"
                           icon="el-icon-search"
                           @click="search"></el-button>
              </el-autocomplete>
            </div>
          </el-col>

          <el-col :span="4">
            <div class="grid-content bg-purple"
                 style="font-size: 14px">
              <el-dropdown @command="out">
                <i class="el-icon-setting"
                   style="margin-right: 10px"></i>
                <el-dropdown-menu slot="dropdown"
                                  @click="out">
                  <el-dropdown-item>退出</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
              <span>{{$store.state.username}}</span>
            </div>
          </el-col>

        </el-row>
      </el-header>
      <el-container class="tabs">
        <el-main>
          <el-tabs tab-position='top'>
            <el-tab-pane label="Hot"
                         lazy>
              <books kind='hot'></books>
            </el-tab-pane>
            <el-tab-pane label="文学"
                         lazy>
              <books kind='literature'></books>
            </el-tab-pane>
            <el-tab-pane label="流行"
                         lazy>
              <books kind='popular'></books>
            </el-tab-pane>
            <el-tab-pane label="文化"
                         lazy>
              <books kind='culture'></books>
            </el-tab-pane>
            <el-tab-pane label="生活"
                         lazy>
              <books kind='life'></books>
            </el-tab-pane>
            <el-tab-pane label="经管"
                         lazy>
              <books kind='manage'></books>
            </el-tab-pane>
            <el-tab-pane label="科技"
                         lazy>
              <books kind='technology'></books>
            </el-tab-pane>
            <el-tab-pane label="个性推荐"
                         lazy>
              <recommendation></recommendation>
            </el-tab-pane>
          </el-tabs>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style>
html {
  overflow: scroll;
}

body {
  background: #eeeeee;
  margin: 0;
  padding: 0;
}
.tabs {
  margin: 0 auto;
  width: 80vw;
}
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
.el-icon-collection {
  margin: 10px 10px;
  font-size: 25px;
  /* vertical-align: middle; */
}
</style>

<script>
import books from '../user/books'
import recommendation from '../user/recommendation'
import { getAllBook } from '../../network/admin'
import { search } from '../../network/user'

export default {
  data () {
    return {
      books: [],
      state: '',
    };
  },
  components: {
    books,
    recommendation
  },
  methods: {
    search () {
      search(this.state)
        .then(res => {
          if (res.data.code === 200) {
            window.open(res.data.data.detail, '_blank')
          }
        })
    },
    out () {
      localStorage.clear();
      this.$router.push('/login')
    },

    querySearch (queryString, cb) {
      var books = this.books;
      var results = queryString ? books.filter(this.createFilter(queryString)) : books;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter (queryString) {
      return (book) => {
        return (book.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },
  },
  created () {
    getAllBook()
      .then(res => {
        res = res.data
        if (res.code === 200) {
          for (let i of res.data) {
            this.books.push({ value: i.name })
          }
        }
      })
  },


}
</script>