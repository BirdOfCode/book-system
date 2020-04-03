import orgin from 'axios'

export default function axios (option) {
  // 1.创建axios的实例
  // baseURL等配置才只会配置在实例上，如果不使用create（），请求全都使用同一个配置（全局配置）
  const instance = orgin.create({
    baseURL: 'http://192.168.0.101:3000/api',
    timeout: 5000
  })
  //请求拦截，在请求头里加入token
  instance.interceptors.request.use(
    config => {
      if (localStorage.getItem('token')) {
        config.headers.Authorization = localStorage.getItem('token');
      }
      return config;
    },
    error => {
      return Promise.reject(error);
    })

  //响应拦截，将后端返回的token存储在localstorage
  instance.interceptors.response.use(
    config => {
      if (config.data.token) {
        window.localStorage.setItem('username', config.data.data.token);
        window.localStorage.setItem('token', config.data.token);
      }
      return config;
    },
    // error => {
    //   const errRes = error.response;
    //   if (errRes.status === 401) {
    //     window.localStorage.removeItem('token');
    //     swal('Auth Error!', `${errRes.data.error.message}, please login!`, 'error')
    //       .then(() => {
    //         history.push('/login');
    //       });
    //   }
    //   return Promise.reject(error.message);   // 返回接口返回的错误信息
    // }
  )

  return instance(option)
}

