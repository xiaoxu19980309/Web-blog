import axios from 'axios'
import Vue from 'vue'
import qs from 'querystring'
const vm = new Vue()

axios.defaults.withCredentials = false
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.baseURL = 'http://localhost:3000/'

// POST传参序列化
axios.interceptors.request.use((config) => {
  let user = JSON.parse(sessionStorage.getItem('user'))
  if (user && user.token) {
    config.headers.token = user.token
  }
  if (config.method === 'post' && config.headers['Content-Type'] !== 'multipart/form-data') {
    config.data = qs.stringify(config.data)
  }
  return config
}, (error) => {
  return Promise.reject(error)
})

axios.interceptors.response.use(response => {
  const { status } = response.data
  if (response.status === 200) {
    const except = (status === -9 && response.config.url.indexOf('web_get_goods') > -1)
    if (status === 200 || except) {
      return response.data
    }
    if (status === 403) {
      vm.$message.error({message: '登录失效！', offset: 60})
      sessionStorage.removeItem('user')
      location.href = '/#/login'
      location.reload()
    }
  } else {
    return Promise.reject(new Error('与服务器连接失败'))
  }
}, error => {
  if (error && error.response) {
    switch (error.response.status) {
      case 401:
        error.message = '登录过期！'
        // sessionStorage.removeItem("token")
        window.location.reload()
        break
      case 403:
        error.message = '没有访问权限'
        break
      case 500:
        error.message = '服务器发生错误了'
        break
      case 502:
        error.message = '连接服务器超时'
        break
      default:
    }
  }
  vm.$message.error(error.message)
  return Promise.reject(error)
})

export default axios
