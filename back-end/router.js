const express = require('express')

const mongoose = require('mongoose')

const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt')

//连接MongoDB数据库，自动创建book-system集合
mongoose.connect('mongodb://localhost/book-system', { useNewUrlParser: true, useUnifiedTopology: true })

const router = express.Router()

//分词模块
const nodejieba = require("nodejieba")

//计算关键词相似度模块
var natural = require('natural')

//token配置
router.use(expressJwt({
  secret: 'zyqtoken'
}).unless({
  path: ['/api/register', '/api/login']
}))

//对所有路由进行token认证
router.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.send('非法token');
  }
})

// 用户数据存储模型
const Users = mongoose.model('users', new mongoose.Schema({
  username: String,
  password: String,
  Identity: Number,   //  1 代表是管理员  0 代表普通用户
  detailId: String,
  collectId: String,
  keyWords: String,
  createTime: Date,
  updateTime: Date
}, {
  versionKey: false,
  timestamps: { createdAt: 'createTime', updatedAt: 'updateTime' }
}))

//图书数据存储模型
const Book = mongoose.model('books', new mongoose.Schema({
  name: String,
  author: String,
  ISBN: String,
  price: Number,
  kind: String,
  cover: String,
  detail: String,
  abstract: String,
  keyWords: String,
  createTime: Date,
  updateTime: Date
}, {
  versionKey: false,
  timestamps: { createdAt: 'createTime', updatedAt: 'updateTime' }
}))

//用户注册
router.post('/api/register', (req, res) => {
  Users
    .findOne({ username: req.body.username })
    .then(result => {
      if (result != null) {
        res.send({
          code: 300,
          message: '用户已注册'
        })
      } else {
        Users.create({ username: req.body.username, password: req.body.password, Identity: 0 })
          .then(() => {
            res.send({
              code: 200,
              message: '用户注册成功'
            })
          })
      }
    })

})

//用户登录
router.post('/api/login', (req, res) => {
  Users
    .findOne({ username: req.body.username, password: req.body.password })
    .then(result => {

      if (result != null) {
        // 成功登录之后返回 token
        const token = 'Bearer ' + jwt.sign(
          {
            username: result.username
          },
          'zyqtoken',
          {
            expiresIn: 3600 * 24
          }
        )
        res.send({
          code: 200,
          message: '登录成功',
          data: result,
          token
        })
      } else {
        res.send({
          code: 404,
          message: '用户名或者密码错误',
        })
      }
    }
    )
})

//增加图书
router.post('/api/addBook', (req, res) => {
  Book
    .create(req.body)
    .then(result => {
      res.send({
        code: 200,
        message: '图书添加成功'
      })
    },
      rej => {
        res.send({
          code: 300,
          message: '图书添加失败'
        })
      })
})

//删除图书
router.delete('/api/delBook/:id', (req, res) => {
  Book
    .findByIdAndDelete(req.params.id)
    .then(result => {
      res.send({
        code: 200,
        message: '图书删除成功'
      })
    },
      rej => {
        res.send({
          code: 300,
          message: '图书删除失败'
        })
      })
})

//修改图书
router.put('/api/editBook/:id', (req, res) => {
  Book
    .findByIdAndUpdate(req.params.id, req.body)
    .then(result => {
      res.send({
        code: 200,
        message: '图书修改成功'
      })
    },
      rej => {
        res.send({
          code: 300,
          message: '图书修改失败'
        })
      })
})

//查询全部图书
router.get('/api/bookList', (req, res) => {
  Book
    .find()
    .then(result => {
      res.send({
        code: 200,
        message: '查询成功',
        data: result
      })
    },
      rej => {
        res.send({
          code: 404,
          message: '未找到图书'
        })
      })
})

//查询某本图书
router.get('/api/searchBook/:id', (req, res) => {
  Book
    .findById(req.params.id)
    .then(
      result => {
        res.send({
          code: 200,
          message: '查询成功',
          data: result
        })
      },
      rej => {
        res.send({
          code: 404,
          message: '未找到该图书'
        })
      }
    )
})

//查询全部用户
router.get('/api/userList', (req, res) => {
  Users
    .find({ Identity: 0 })
    .then(result => {
      res.send({
        code: 200,
        message: '查询成功',
        data: result
      })
    },
      rej => {
        res.send({
          code: 600,
          message: "未登录"
        })
      })
})

//查询某个用户
router.get('/api/searchUser/:id', (req, res) => {
  Users
    .findById(req.params.id)
    .then(result => {
      res.send({
        code: 200,
        message: '查询成功',
        data: result
      })
    },
      rej => {
        res.send({
          code: 404,
          message: '未找到该用户'
        })
      })
})

//删除某个用户
router.delete('/api/delUser/:id', (req, res) => {
  Users
    .findByIdAndDelete(req.params.id)
    .then(result => {
      res.send({
        code: 200,
        message: '用户删除成功',
      })
    },
      rej => {
        res.send({
          code: 300,
          message: '用户删除失败'
        })
      })
})

//修改某个用户
router.put('/api/editUser/:id', (req, res) => {
  Users
    .findByIdAndUpdate(req.params.id, req.body)
    .then(result => {
      res.send({
        code: 200,
        message: '用户修改成功',
      })
    },
      rej => {
        res.send({
          code: 300,
          message: '用户修改失败'
        })
      })
})

//查询某类图书
router.get('/api/bookKind/:kind', (req, res) => {

  Book
    .find({ kind: req.params.kind })
    .then(result => {
      if (result.length != 0) {
        res.send({
          code: 200,
          message: '查询成功',
          data: result
        })
      }
    },
      rej => {
        res.send({
          code: 404,
          message: "获取图书失败"
        })
      })
})

//增加收藏图书
router.post('/api/user', (req, res) => {
  collectId = ''
  Users
    .findOne({ username: req.body.username })
    .then(result => {
      if (result.collectId === undefined || result.collectId === '') {
        collectId = req.body.isbn
      }
      // else if (result.collectId === '') {
      //   collectId = req.body.isbn
      // } 
      else {
        collectId = result.collectId + ',' + req.body.isbn
      }
      return Users.findOneAndUpdate({ username: req.body.username }, { collectId: collectId })
    })
    .then(() => {
      res.send({
        code: 200,
        message: '收藏成功'
      })
    })
})

//增加查看过详情的图书
router.put('/api/user', (req, res) => {
  detailId = ''
  Users
    .findOne({ username: req.body.username })
    .then(result => {
      if (result.detailId === undefined || result.detailId === '') {
        detailId = req.body.isbn
      }
      // else if (result.detailId === '') {
      //   detailId = req.body.isbn
      // }
      else {
        detailId = result.detailId + ',' + req.body.isbn
      }
      return Users.findOneAndUpdate({ username: req.body.username }, { detailId: detailId })
    })
    .then(() => {
      res.send({
        code: 200,
        message: '查询成功'
      })
    })
})

//搜索提示功能
router.get('/api/user', (req, res) => {
  Book
    .find()
    .then(result => {
      res.send({
        code: 200,
        message: '查询成功',
        data: result
      })
    },
      rej => {
        res.send({
          code: 404,
          message: '未找到图书'
        })
      })
})

//根据书名查找图书
router.get('/api/user/:name', (req, res) => {
  Book
    .findOne({ name: req.params.name })
    .then(
      result => {
        if (result != null)
          res.send({
            code: 200,
            message: '查询成功',
            data: result
          })
      },
      rej => {
        res.send({
          code: 404,
          message: '未找到该图书'
        })
      }
    )
})

//分析图书摘要，进行分词，并将权重前5的单词作为图书关键词
Book
  .find()
  .then(result => {
    const topN = 5
    let arr = []
    for (let i of result) {
      arr = nodejieba.extract(i.abstract, topN).map(item => {
        return item.word
      })
      i.keyWords = arr.toString()
      Book.findOneAndUpdate({ name: i.name }, i)
    }
  })

//根据用户收藏和查看详情的图书的ISBN,提取对应的图书关键词，进行权重比较，提取权重前5的单词作为用户关键词
Users
  .find({ Identity: 0 })
  .then(result => {
    for (let i of result) {
      (async function () {
        let sortArr = []
        let MyKeyWords = []
        let bookISBN = (i.detailId + ',' + i.collectId).split(',').filter(item => {
          return item !== 'undefined' && item !== ''
        })
        // console.log(bookISBN);
        for (let m of bookISBN) {
          await Book.findOne({ ISBN: m })
            .then(res => {
              const topN = 5
              backVal = nodejieba.extract(res.abstract, topN)
              for (let n of backVal) {
                sortArr.push(n)
              }
            })
        }
        Array.from(new Set(sortArr)).sort((a, b) => {
          return b.weight - a.weight
        })
        // console.log(sortArr);
        for (let i = 0; i < 5; i++) {
          MyKeyWords.push(sortArr[i].word)
        }
        MyKeyWords = MyKeyWords.toString()
        // console.log(MyKeyWords);
        await Users.findOneAndUpdate({ username: i.username }, { keyWords: MyKeyWords })
      })()
    }
  })

//基于内容的推荐，返回similarBook推荐结果
async function CB (req) {
  let userKeyWords = ''
  let similarBook = []
  await Users
    .findOne({ username: req.params.username })
    .then(result => {
      userKeyWords = result.keyWords
      return Book.find()
    })
    .then(result => {
      for (let m of result) {
        let similar = natural.JaroWinklerDistance(userKeyWords, m.keyWords)
        m.similar = similar
        // console.log(similar);
      }
      result.sort((a, b) => {
        return b.similar - a.similar
      })
      for (let i = 0; i < 8; i++) {
        similarBook.push(result.shift())
      }
    })
  return similarBook
}

//基于用户的协同过滤，返回similarBook推荐结果
async function UserCF (req) {
  let userKeyWords = ''
  let tempArr = []
  let similarUser = []
  let bookISBN = []
  let similarBook = []
  await Users
    .findOne({ username: req.params.username })
    .then(result => {
      userKeyWords = result.keyWords
      return Users.find({ Identity: 0 })
    })
    .then(async result => {
      for (let m of result) {
        if (m.username === req.params.username) {
          continue
        }
        let similar = natural.JaroWinklerDistance(userKeyWords, m.keyWords)
        m.similar = similar
        tempArr.push(m)
      }
      tempArr.sort((a, b) => {
        return b.similar - a.similar
      })
      for (let i = 0; i < 3; i++) {
        similarUser.push(tempArr.shift())
      }
      for (let n of similarUser) {
        let book = (n.detailId + ',' + n.collectId).split(',').filter(item => {
          return item !== 'undefined' && item !== ''
        })
        for (let j of book) {
          bookISBN.push(j)
        }
      }
      //得到的相似用户历史操作的图书isbn
      bookISBN = Array.from(new Set(bookISBN))
      for (let m of bookISBN) {
        let result = await Book.findOne({ ISBN: m })
        similarBook.push(result)
      }
    })
  return similarBook
}

//图书推荐
router.get('/api/recommendation/:username', async (req, res) => {
  // let recommendation1 = await CB(req)
  // let recommendation2 = await UserCF(req)
  let recommendation = []
  await Promise.all([CB(req), UserCF(req)])
    .then(result => {
      recommendation = result[0].concat(result[1])
      var hash = {};
      recommendation = recommendation.reduce(function (item, next) {
        hash[next.name] ? '' : hash[next.name] = true && item.push(next);
        return item;
      }, [])
    })
  res.send({
    code: 200,
    message: '推荐成功',
    data: recommendation
  })
})
module.exports = router