import axios from './axios'

//获取全部图书
export function getAllBook () {
  return axios({
    method: 'get',
    url: '/bookList'
  })
}

//管理员添加图书
export function addBook (book) {
  return axios({
    method: 'post',
    url: '/addBook',
    data: book
  })
}

//管理员删除图书
export function delBook (id) {
  return axios({
    method: 'delete',
    url: `/delBook/${id}`,
  })
}

//管理员查询某本图书
export function searchBook (id) {
  return axios({
    method: 'get',
    url: `/searchBook/${id}`,
  })
}

//管理员修改图书
export function editBook (id, book) {
  return axios({
    method: 'put',
    url: `/editBook/${id}`,
    data: book
  })
}

//管理员获取全部普通用户信息
export function getAllUser () {
  return axios({
    method: 'get',
    url: '/userList'
  })
}

//管理员删除用户
export function delUser (id) {
  return axios({
    method: 'delete',
    url: `/delUser/${id}`,
  })
}

//管理员查找用户
export function searchUser (id) {
  return axios({
    method: 'get',
    url: `/searchUser/${id}`,
  })
}

//管理员修改用户
export function editUser (id, user) {
  return axios({
    method: 'put',
    url: `/editUser/${id}`,
    data: user
  })
}
