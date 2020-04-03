import axios from './axios'

//获取某类图书
export function getBook (kind) {
  return axios({
    method: 'get',
    url: `/bookKind/${kind}`
  })
}

//获取个性推荐图书
export function recommendation (username) {
  return axios({
    method: 'get',
    url: `/recommendation/${username}`
  })
}


//收藏图书
export function collect (isbn, username) {
  return axios({
    method: 'post',
    url: '/user',
    data: {
      isbn,
      username
    }
  })
}

//查看图书详情
export function detail (isbn, username) {
  return axios({
    method: 'put',
    url: '/user',
    data: {
      isbn,
      username
    }
  })
}

//搜索功能
export function getAllBook () {
  return axios({
    method: 'get',
    url: '/user'
  })
}

//查看某本图书详细信息
export function search (name) {
  return axios({
    method: 'get',
    url: `/user/${name}`,
  })
}