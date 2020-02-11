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
import InterestContent from '@/components/interest/InterestContent'
import Recommendation from '@/components/interest/Recommendation'

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
      redirect: '',
      children: [{
        path: '',
        name: 'Home',
        component: Home
      },
      {
        path: '/interest',
        name: 'Interest',
        component: Interest,
        redirect: '/interest/content',
        children: [{
          path: '/interest/content',
          name: 'InterestContent',
          component: InterestContent
        },
        {
          path: '/interest/recommendation',
          name: 'Recommendation',
          component: Recommendation
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
      }
      ]
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
