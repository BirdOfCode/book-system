import axios from './axios'

//登录系统
export function login (userInfo) {
  return axios({
    method: 'post',
    url: '/login',
    data: userInfo
  })
}

//注册功能
export function register (userInfo) {
  return axios({
    method: 'post',
    url: '/register',
    data: userInfo
  })
}