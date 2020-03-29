import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/user'
  },
  {
    path: '/login',
    component: () => import('../views/login'),
  },
  {
    path: '/register',
    component: () => import('../views/register'),
  },
  {
    path: '/admin',
    redirect: '/admin/book/bookList',
    component: () => import('../views/admin/index'),
    children: [
      {
        path: 'book/bookList',
        component: () => import('../views/admin/bookList')
      },
      {
        path: 'book/creatBook',
        component: () => import('../views/admin/creatBook')
      },
      {
        path: 'book/editBook/:id',
        component: () => import('../views/admin/editBook')
      },
      {
        path: 'user/userList',
        component: () => import('../views/admin/userList')
      },
      {
        path: 'user/editUser/:id',
        component: () => import('../views/admin/editUser')
      },
    ]
  },
  {
    path: '/user',
    component: () => import('../views/user/index')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

//路由导航守卫，判断路由跳转是否带有token，没有就跳转到登录页面
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    next()
  }
  else if (to.path === '/register') {
    next()
  } else {
    let token = localStorage.getItem('token');
    if (token === null || token === '') {
      alert('未登录')
      next('/login')
    } else {
      next()
    }
  }
})

export default router
