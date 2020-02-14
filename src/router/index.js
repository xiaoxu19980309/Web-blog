import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Layout from '@/Layout'
import Home from '@/components/Home'
import Write from '@/components/Write'
import Interest from '@/components/Interest'
import Message from '@/components/Message'
import Comments from '@/components/message/Comments'
import Follows from '@/components/message/Follows'
import LikePraise from '@/components/message/LikePraise'
import Others from '@/components/message/Others'
import Recommendation from '@/components/interest/Recommendation'
import Moments from '@/components/interest/Moments'
import User from '@/components/interest/User'
import Article from '@/components/Article'

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
      path: '/write',
      name: 'Write',
      component: Write
    },
    {
      path: '/',
      name: 'Layout',
      component: Layout,
      redirect: '/home',
      children: [{
        path: '/home',
        name: 'Home',
        component: Home
      },
      {
        path: '/user',
        name: 'UserMain',
        component: User
      },
      {
        path: '/interest',
        name: 'Interest',
        component: Interest,
        redirect: '/interest/moments',
        children: [{
          path: '/interest/recommendation',
          name: 'Recommendation',
          component: Recommendation
        },
        {
          path: '/interest/moments',
          name: 'Moments',
          component: Moments
        },
        {
          path: '/interest/user',
          name: 'User',
          component: User
        }]
      },
      {
        path: '/message',
        name: 'message',
        component: Message,
        redirect: '/message/comments',
        children: [{
          path: '/message/comments',
          name: 'Comments',
          component: Comments
        },
        {
          path: '/message/follows',
          name: 'Follows',
          component: Follows
        },
        {
          path: '/message/likepraise',
          name: 'LikePraise',
          component: LikePraise
        },
        {
          path: '/message/others',
          name: 'Others',
          component: Others
        }]
      },
      {
        path: '/article',
        name: 'Article',
        component: Article
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
