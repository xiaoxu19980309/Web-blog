import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Layout from '@/Layout'
import Home from '@/components/Home'

Vue.use(Router)
const vm = new Vue()
const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => {
    window.location.reload()
    console.log(err)
  })
}

const router = new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/layout',
      name: 'Layout',
      component: Layout,
      children: [{
        path: 'home',
        name: 'Home',
        component: Home
      }]
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(res => res.meta.isLogin)) { // 判断是否需要登录
    if (sessionStorage.getItem('token')) {
      next()
    } else {
      vm.$message.error('登录过期！请重新登录')
      next({
        path: '/'
      })
    }
  } else {
    next()
  }
})

export default router
