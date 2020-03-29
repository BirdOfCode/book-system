//导入express开发框架
const express = require('express')
//导入接口方法
const router = require('./router')
//创建app实例
const app = express()


app.use(require('cors')())
app.use(express.json())
app.use(router)


//监听3000端口
app.listen(3000, () => {
  console.log('server is running');
})