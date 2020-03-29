import axios from './axios'

export function login (userInfo) {
  return axios({
    method: 'post',
    url: '/login',
    data: userInfo
  })
}

export function register (userInfo) {
  return axios({
    method: 'post',
    url: '/register',
    data: userInfo
  })
}