import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('token') ? localStorage.getItem('token') : '',
    username: localStorage.getItem('username') ? localStorage.getItem('username') : ''
  },
  mutations: {
    changeLogin (state, token) {
      state.token =token;
      localStorage.setItem('token', token);
    },
    changeUsername (state, username) {
      state.username =username;
      localStorage.setItem('username', username);
    }
  },
  actions: {
  },
  modules: {
  }
})
